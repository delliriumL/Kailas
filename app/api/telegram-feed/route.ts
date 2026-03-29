import Parser from 'rss-parser'
import { NextResponse } from 'next/server'
import { decodeHtmlEntitiesLite } from '@/lib/decode-entities'

const CHANNEL = process.env.TELEGRAM_CHANNEL || 'pravo_ai_crypto'

/** Явный RSS (RSSHub, свой инстанс и т.д.). Если не задан — пробуем дефолтные зеркала, затем t.me/s. */
const ENV_RSS = process.env.TELEGRAM_RSS_URL

const parser = new Parser({
  timeout: 15000,
  headers: {
    'User-Agent': 'Kailas-lab/1.0 (blog telegram feed)',
  },
})

export const revalidate = 300

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function decodeDataView(view: string): number | null {
  try {
    const b64 = view.replace(/-/g, '+').replace(/_/g, '/')
    const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4))
    const raw = Buffer.from(b64 + pad, 'base64').toString('utf8')
    const j = JSON.parse(raw) as { t?: number }
    return typeof j.t === 'number' && j.t > 0 ? j.t : null
  } catch {
    return null
  }
}

function titleFromTgText(textHtml: string): string {
  const plain = stripHtml(textHtml).slice(0, 200)
  const line = plain.split('\n')[0]?.trim() || plain
  return line.slice(0, 140) || 'Пост канала'
}

/** Парсинг публичной ленты https://t.me/s/channel — работает без RSSHub. */
function parseTelegramPublicHtml(html: string, channel: string): Array<{
  title: string
  link: string
  excerpt: string
  date: string
}> {
  const items: Array<{
    title: string
    link: string
    excerpt: string
    date: string
  }> = []
  const chunks = html.split('tgme_widget_message_wrap')
  for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i]
    const post = chunk.match(/data-post="([^"]+)"/)
    const view = chunk.match(/data-view="([^"]+)"/)
    if (!post) continue
    const postId = post[1].trim()
    if (!postId.startsWith(`${channel}/`)) continue
    const link = `https://t.me/${postId}`
    /** Реальная дата поста — в <time datetime>; поле `t` в data-view — служебное (часто «сегодня»). */
    const timeMatch = chunk.match(/<time[^>]*\bdatetime="([^"]+)"/)
    let dateIso = ''
    if (timeMatch) {
      const parsed = Date.parse(timeMatch[1])
      if (!Number.isNaN(parsed)) dateIso = new Date(parsed).toISOString()
    }
    if (!dateIso) {
      const tUnix = view ? decodeDataView(view[1]) : null
      if (tUnix != null) dateIso = new Date(tUnix * 1000).toISOString()
    }
    const textMatch = chunk.match(
      /class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<div class="tgme_widget_message_footer/
    )
    const inner = textMatch ? textMatch[1] : ''
    const plain = decodeHtmlEntitiesLite(stripHtml(inner))
    const excerpt = plain.slice(0, 320)
    const title = inner
      ? decodeHtmlEntitiesLite(titleFromTgText(inner))
      : 'Пост в канале'
    items.push({
      title,
      link,
      excerpt: excerpt || 'Открыть в Telegram',
      date: dateIso,
    })
  }
  return items
}

async function fetchFromRss(url: string) {
  const feed = await parser.parseURL(url)
  return (feed.items || []).map((item) => {
    const raw =
      item.contentSnippet ||
      (typeof item.content === 'string'
        ? item.content.replace(/<[^>]+>/g, ' ')
        : '') ||
      ''
    const excerpt = decodeHtmlEntitiesLite(
      raw.replace(/\s+/g, ' ').trim().slice(0, 320)
    )
    return {
      title: decodeHtmlEntitiesLite(item.title?.trim() || 'Пост канала'),
      link: item.link?.trim() || '',
      excerpt: excerpt || 'Открыть в Telegram',
      date: item.pubDate || item.isoDate || '',
    }
  })
}

async function fetchFromPublicPreview(channel: string) {
  const url = `https://t.me/s/${channel}`
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; Kailas-lab/1.0; +https://t.me/)',
      Accept: 'text/html,application/xhtml+xml',
    },
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`t.me HTTP ${res.status}`)
  const html = await res.text()
  return parseTelegramPublicHtml(html, channel)
}

export async function GET() {
  const rssUrls = ENV_RSS
    ? [ENV_RSS]
    : [`https://rsshub.app/telegram/channel/${CHANNEL}`]

  try {
    /** Сначала публичная страница t.me/s — у постов корректные <time datetime="…">; RSS часто даёт одну дату на всё. */
    try {
      const fromTme = await fetchFromPublicPreview(CHANNEL)
      if (fromTme.length > 0) {
        return NextResponse.json({ items: fromTme })
      }
    } catch {
      /* fallback RSS */
    }

    for (const rssUrl of rssUrls) {
      try {
        const fromRss = await fetchFromRss(rssUrl)
        const ok = fromRss.filter((x) => x.link.length > 0)
        if (ok.length > 0) {
          return NextResponse.json({ items: ok })
        }
      } catch {
        /* try next */
      }
    }

    return NextResponse.json(
      {
        items: [],
        error: 'Не удалось загрузить канал (t.me и RSS).',
      },
      { status: 200 }
    )
  } catch (e) {
    const message = e instanceof Error ? e.message : 'telegram feed error'
    return NextResponse.json({ items: [], error: message }, { status: 200 })
  }
}
