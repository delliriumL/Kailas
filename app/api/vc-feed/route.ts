import { NextResponse } from 'next/server'
import { decodeHtmlEntitiesLite } from '@/lib/decode-entities'

/** Профиль на vc.ru (подтягиваем посты из HTML __INITIAL_STATE__). */
const DEFAULT_PROFILE_URL =
  process.env.VC_PROFILE_URL || 'https://vc.ru/id5278219'

type VcBlock = { type?: string; data?: { text?: string } }
type VcEntryData = {
  title?: string
  url?: string
  id?: number
  date?: number
  summaryContent?: string
  blocks?: VcBlock[]
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function excerptFromEntry(data: VcEntryData): string {
  const sum = data.summaryContent?.trim()
  if (sum) return decodeHtmlEntitiesLite(sum.slice(0, 320))
  for (const block of data.blocks || []) {
    if (block.type === 'text' && block.data?.text) {
      return decodeHtmlEntitiesLite(stripHtml(block.data.text).slice(0, 320))
    }
  }
  return 'Читать на vc.ru'
}

export const revalidate = 300

export async function GET() {
  try {
    const res = await fetch(DEFAULT_PROFILE_URL, {
      headers: {
        'User-Agent': 'Kailas-lab/1.0 (blog vc.ru feed)',
        Accept: 'text/html,application/xhtml+xml',
      },
      next: { revalidate: 300 },
    })
    if (!res.ok) {
      return NextResponse.json(
        { items: [], error: `HTTP ${res.status}` },
        { status: 200 }
      )
    }
    const html = await res.text()
    const match = html.match(
      /window\.__INITIAL_STATE__\s*=\s*(\{[\s\S]*?\})\s*;\s*<\/script>/
    )
    if (!match) {
      return NextResponse.json(
        { items: [], error: 'Не удалось разобрать страницу vc.ru' },
        { status: 200 }
      )
    }
    const state = JSON.parse(match[1]) as {
      'feed@subsite'?: {
        items?: Array<{ type: string; data: VcEntryData }>
      }
    }
    const raw = state['feed@subsite']?.items ?? []
    const items = raw
      .filter((x) => x.type === 'entry' && x.data)
      .map((x) => {
        const data = x.data
        const link =
          data.url?.trim() ||
          (data.id != null ? `https://vc.ru/p/${data.id}` : '')
        const dateSec = data.date
        const dateIso =
          typeof dateSec === 'number' && dateSec > 0
            ? new Date(dateSec * 1000).toISOString()
            : ''
        return {
          title: decodeHtmlEntitiesLite(
            data.title?.trim() || 'Публикация на vc.ru'
          ),
          link,
          excerpt: excerptFromEntry(data),
          date: dateIso,
        }
      })
      .filter((x) => x.link.length > 0)
    return NextResponse.json({ items })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'vc feed error'
    return NextResponse.json({ items: [], error: message }, { status: 200 })
  }
}
