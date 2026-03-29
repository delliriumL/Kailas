'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FadeIn from '@/components/FadeIn'
import CTASection from '@/components/CTASection'
import InnerHero from '@/components/InnerHero'
import { decodeHtmlEntitiesLite } from '@/lib/decode-entities'

const allPosts = [
  {
    slug: 'kak-snizit-donachisleniya-pri-vneznoy-proverke',
    title: 'Как снизить доначисления при выездной налоговой проверке',
    excerpt: 'Пошаговое руководство: что делать с первых дней ВНП, как формировать возражения и выстраивать защиту до суда.',
    category: 'Налоговый консалтинг',
    date: '24 марта 2026',
    dateIso: '2026-03-24T12:00:00.000Z',
    readTime: '8 мин',
    image: '/images/cases/case-1.jpg',
    featured: true,
  },
  {
    slug: 'nalogovaya-rekonstruktsiya-pri-droblenii',
    title: 'Налоговая реконструкция при дроблении бизнеса',
    excerpt: 'Что такое налоговая реконструкция, когда она применяется и как её использовать в спорах с ФНС.',
    category: 'Налоговый консалтинг',
    date: '19 марта 2026',
    dateIso: '2026-03-19T12:00:00.000Z',
    readTime: '6 мин',
    image: '/images/cases/case-4.jpg',
    featured: false,
  },
  {
    slug: 'zashchita-ot-subsidiarnoy-otvetstvennosti',
    title: 'Защита от субсидиарной ответственности при банкротстве',
    excerpt: 'Кто такой КДЛ, как снизить риски субсидиарки и что делать, если требование уже предъявлено.',
    category: 'Антикризисное',
    date: '13 марта 2026',
    dateIso: '2026-03-13T12:00:00.000Z',
    readTime: '10 мин',
    image: '/images/cases/case-2.jpg',
    featured: false,
  },
  {
    slug: 'sredniy-chek-nalogovoy-proverki-2025',
    title: 'Средний чек налоговой проверки 2025: что нужно знать',
    excerpt: 'Анализ статистики ВНП за 2025 год: средние суммы, отраслевые акценты, тренды 2026.',
    category: 'Аналитика',
    date: '7 марта 2026',
    dateIso: '2026-03-07T12:00:00.000Z',
    readTime: '5 мин',
    image: '/images/cases/case-5.jpg',
    featured: false,
  },
  {
    slug: 'ndv-22-protsenta-2026-optimizatsiya',
    title: 'НДС 22% с 2026 года: как оптимизировать налоговую нагрузку',
    excerpt: 'Практические инструменты легального снижения НДС-нагрузки в условиях новых ставок.',
    category: 'Налоговый консалтинг',
    date: '28 февраля 2026',
    dateIso: '2026-02-28T12:00:00.000Z',
    readTime: '7 мин',
    image: '/images/cases/case-1.jpg',
    featured: false,
  },
  {
    slug: 'ai-v-yuridicheskom-konsaltinge',
    title: 'AI в юридическом консалтинге: как технологии меняют практику',
    excerpt: 'Реальные применения AI-инструментов в налоговых спорах, комплаенсе и документообороте.',
    category: 'AI-автоматизация',
    date: '20 февраля 2026',
    dateIso: '2026-02-20T12:00:00.000Z',
    readTime: '9 мин',
    image: '/images/cases/case-5.jpg',
    featured: false,
  },
]

const PAGE_SIZE = 3

const TELEGRAM_CHANNEL_URL = 'https://t.me/pravo_ai_crypto'

const VC_PROFILE_URL = 'https://vc.ru/id5278219'

type ExternalPost = {
  title: string
  link: string
  excerpt: string
  date: string
}

type LocalPost = (typeof allPosts)[number]

type MergedRow =
  | { kind: 'local'; sortTime: number; post: LocalPost }
  | { kind: 'telegram'; sortTime: number; post: ExternalPost }
  | { kind: 'vc'; sortTime: number; post: ExternalPost }

function sortTimeMs(iso: string): number {
  const t = Date.parse(iso)
  return Number.isNaN(t) ? 0 : t
}

const blogFilters = [
  'Все',
  'Телеграм',
  'VC.ru',
  ...Array.from(new Set(allPosts.map((p) => p.category))).sort((a, b) => a.localeCompare(b, 'ru')),
]

function formatPostDate(isoOrRss: string) {
  if (!isoOrRss) return ''
  const d = new Date(isoOrRss)
  if (Number.isNaN(d.getTime())) return isoOrRss
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const [active, setActive] = useState('Все')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [telegramPosts, setTelegramPosts] = useState<ExternalPost[]>([])
  const [telegramLoading, setTelegramLoading] = useState(false)
  const [telegramError, setTelegramError] = useState<string | null>(null)

  const [vcPosts, setVcPosts] = useState<ExternalPost[]>([])
  const [vcLoading, setVcLoading] = useState(false)
  const [vcError, setVcError] = useState<string | null>(null)

  const isTelegramTab = active === 'Телеграм'
  const isVcTab = active === 'VC.ru'
  const isAllTab = active === 'Все'

  useEffect(() => {
    let cancelled = false
    setTelegramLoading(true)
    setVcLoading(true)
    setTelegramError(null)
    setVcError(null)
    Promise.all([
      fetch('/api/telegram-feed').then((r) => r.json()),
      fetch('/api/vc-feed').then((r) => r.json()),
    ])
      .then(([tg, vc]) => {
        if (cancelled) return
        setTelegramPosts(Array.isArray(tg.items) ? tg.items : [])
        setVcPosts(Array.isArray(vc.items) ? vc.items : [])
        if (tg.error && (!tg.items || tg.items.length === 0)) {
          setTelegramError('Лента канала временно недоступна. Откройте канал в Telegram.')
        }
        if (vc.error && (!vc.items || vc.items.length === 0)) {
          setVcError('Лента vc.ru временно недоступна. Откройте профиль на сайте.')
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTelegramError('Не удалось загрузить посты Telegram.')
          setVcError('Не удалось загрузить посты vc.ru.')
        }
      })
      .finally(() => {
        if (!cancelled) {
          setTelegramLoading(false)
          setVcLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  const mergedFeed = useMemo((): MergedRow[] => {
    const local: MergedRow[] = allPosts.map((post) => ({
      kind: 'local',
      sortTime: sortTimeMs(post.dateIso),
      post,
    }))
    const tg: MergedRow[] = telegramPosts.map((post) => ({
      kind: 'telegram',
      sortTime: sortTimeMs(post.date),
      post,
    }))
    const vc: MergedRow[] = vcPosts.map((post) => ({
      kind: 'vc',
      sortTime: sortTimeMs(post.date),
      post,
    }))
    return [...local, ...tg, ...vc].sort((a, b) => b.sortTime - a.sortTime)
  }, [telegramPosts, vcPosts])

  const categorySorted = useMemo(() => {
    if (active === 'Все' || active === 'Телеграм' || active === 'VC.ru') return []
    return [...allPosts]
      .filter((p) => p.category === active)
      .sort((a, b) => sortTimeMs(b.dateIso) - sortTimeMs(a.dateIso))
  }, [active])

  /** Первая карточка — блок «Последняя публикация», в сетке «Все» показываем со второй. */
  const latestMerged = mergedFeed[0]
  const mergedGrid = mergedFeed.slice(1)
  const mergedGridVisible = mergedGrid.slice(0, visibleCount)

  const telegramVisible = telegramPosts.slice(0, visibleCount)
  const vcVisible = vcPosts.slice(0, visibleCount)
  const categoryVisible = categorySorted.slice(0, visibleCount)

  const hasMore = isTelegramTab
    ? visibleCount < telegramPosts.length
    : isVcTab
      ? visibleCount < vcPosts.length
      : isAllTab
        ? visibleCount < mergedGrid.length
        : visibleCount < categorySorted.length


  function handleFilter(f: string) {
    setActive(f)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div className="bg-white">
      <InnerHero
        eyebrow="Экспертные материалы"
        title="Блог по антикризисному праву"
        subtitle="Налоги, банкротство, AI в праве — разборы ситуаций и рабочие приёмы без «воды». Для собственников и юрфункций."
        image="/images/hero-inner-b.jpg"
      />

      {isAllTab && latestMerged && (
        <section className="border-b border-light-secondary bg-white">
          <div className="container-xl py-16">
            <FadeIn>
              <p className="eyebrow mb-6">Последняя публикация</p>
              {latestMerged.kind === 'local' && (
                <Link href={`/blog/${latestMerged.post.slug}`} className="block group">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-video overflow-hidden bg-dark-secondary">
                      <Image
                        src={latestMerged.post.image || '/images/blog-tax.jpg'}
                        alt={latestMerged.post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-dark/40" />
                      <div className="absolute top-4 left-4">
                        <div className="inline-block bg-orange text-white text-xs font-bold px-3 py-1 tracking-wide">
                          {latestMerged.post.category}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="inline-block bg-orange text-white text-xs font-semibold px-3 py-1 mb-4 tracking-wide">
                        {latestMerged.post.category}
                      </div>
                      <h2 className="text-3xl font-bold text-dark mb-4 group-hover:text-orange transition-colors">
                        {latestMerged.post.title}
                      </h2>
                      <p className="text-dark/60 text-base leading-relaxed mb-6">{latestMerged.post.excerpt}</p>
                      <div className="flex items-center gap-3 text-dark/40 text-sm mb-6">
                        <span>{latestMerged.post.date}</span>
                        <span>·</span>
                        <span>{latestMerged.post.readTime} чтения</span>
                      </div>
                      <span className="flex items-center gap-2 text-orange font-semibold text-sm group-hover:gap-3 transition-all">
                        Читать статью
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              )}
              {latestMerged.kind === 'telegram' && (
                <a
                  href={latestMerged.post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#0e1615] to-dark-secondary flex items-center justify-center">
                      <svg className="w-20 h-20 text-orange/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                      </svg>
                      <div className="absolute inset-0 bg-dark/30" />
                      <div className="absolute top-4 left-4">
                        <div className="inline-block bg-dark text-white text-xs font-bold px-3 py-1 tracking-wide">
                          Телеграм
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="inline-block bg-dark text-white text-xs font-semibold px-3 py-1 mb-4 tracking-wide">
                        Телеграм
                      </div>
                      <h2 className="text-3xl font-bold text-dark mb-4 group-hover:text-orange transition-colors">
                        {decodeHtmlEntitiesLite(latestMerged.post.title)}
                      </h2>
                      <p className="text-dark/60 text-base leading-relaxed mb-6 line-clamp-5">
                        {decodeHtmlEntitiesLite(latestMerged.post.excerpt)}
                      </p>
                      <div className="flex items-center gap-3 text-dark/40 text-sm mb-6">
                        <span>{formatPostDate(latestMerged.post.date)}</span>
                        <span>·</span>
                        <span>Открыть в Telegram</span>
                      </div>
                      <span className="flex items-center gap-2 text-orange font-semibold text-sm group-hover:gap-3 transition-all">
                        Открыть пост
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              )}
              {latestMerged.kind === 'vc' && (
                <a
                  href={latestMerged.post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#1a1f26] to-[#0d1117] flex items-center justify-center">
                      <span className="text-4xl font-black tracking-tight text-white/95" aria-hidden>
                        vc<span className="text-[#ff5252]">.</span>ru
                      </span>
                      <div className="absolute inset-0 bg-dark/20" />
                      <div className="absolute top-4 left-4">
                        <div className="inline-block bg-[#1a1f26] text-white text-xs font-bold px-3 py-1 tracking-wide">
                          vc.ru
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="inline-block bg-[#1a1f26] text-white text-xs font-semibold px-3 py-1 mb-4 tracking-wide">
                        vc.ru
                      </div>
                      <h2 className="text-3xl font-bold text-dark mb-4 group-hover:text-orange transition-colors">
                        {decodeHtmlEntitiesLite(latestMerged.post.title)}
                      </h2>
                      <p className="text-dark/60 text-base leading-relaxed mb-6 line-clamp-5">
                        {decodeHtmlEntitiesLite(latestMerged.post.excerpt)}
                      </p>
                      <div className="flex items-center gap-3 text-dark/40 text-sm mb-6">
                        <span>{formatPostDate(latestMerged.post.date)}</span>
                        <span>·</span>
                        <span>Читать на vc.ru</span>
                      </div>
                      <span className="flex items-center gap-2 text-orange font-semibold text-sm group-hover:gap-3 transition-all">
                        Открыть материал
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              )}
            </FadeIn>
          </div>
        </section>
      )}

      {/* All posts */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-8">
              {blogFilters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => handleFilter(f)}
                  className={`px-5 py-2 text-sm font-medium transition-all duration-200 ${
                    active === f
                      ? 'bg-orange text-white'
                      : 'border border-dark/20 text-dark/50 hover:border-orange hover:text-orange'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-dark mb-8">Все публикации</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isAllTab &&
              mergedGridVisible.map((row, i) => {
                if (row.kind === 'local') {
                  const post = row.post
                  return (
                    <FadeIn key={post.slug} delay={i * 0.06} className="h-full">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex flex-col bg-white p-8 h-full group hover:bg-light transition-colors border border-light-secondary hover:border-orange/20"
                      >
                        <div className="relative aspect-video mb-6 overflow-hidden bg-dark-secondary flex-shrink-0">
                          <Image
                            src={post.image || '/images/blog-tax.jpg'}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/20 transition-colors duration-300" />
                        </div>
                        <div className="inline-block bg-orange text-white text-xs font-semibold px-3 py-1 mb-4 tracking-wide self-start">
                          {post.category}
                        </div>
                        <h3 className="text-dark font-bold text-lg mb-3 group-hover:text-orange transition-colors flex-1">
                          {post.title}
                        </h3>
                        <p className="text-dark/60 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-light-secondary text-dark/40 text-xs">
                          <span>{post.date}</span>
                          <span>·</span>
                          <span>{post.readTime} чтения</span>
                        </div>
                      </Link>
                    </FadeIn>
                  )
                }
                if (row.kind === 'telegram') {
                  const post = row.post
                  const title = decodeHtmlEntitiesLite(post.title)
                  const excerpt = decodeHtmlEntitiesLite(post.excerpt)
                  return (
                    <FadeIn key={post.link} delay={i * 0.06} className="h-full">
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col bg-white p-8 h-full group hover:bg-light transition-colors border border-light-secondary hover:border-orange/20"
                      >
                        <div className="relative aspect-video mb-6 overflow-hidden flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0e1615] to-dark-secondary">
                          <svg className="w-14 h-14 text-orange/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                          </svg>
                        </div>
                        <div className="inline-block bg-dark text-white text-xs font-semibold px-3 py-1 mb-4 tracking-wide self-start">
                          Телеграм
                        </div>
                        <h3 className="text-dark font-bold text-lg mb-3 group-hover:text-orange transition-colors flex-1 line-clamp-3">
                          {title}
                        </h3>
                        <p className="text-dark/60 text-sm leading-relaxed mb-4 line-clamp-4">{excerpt}</p>
                        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-light-secondary text-dark/40 text-xs">
                          <span>{formatPostDate(post.date)}</span>
                          <span>·</span>
                          <span>Открыть в Telegram</span>
                        </div>
                      </a>
                    </FadeIn>
                  )
                }
                const post = row.post
                const title = decodeHtmlEntitiesLite(post.title)
                const excerpt = decodeHtmlEntitiesLite(post.excerpt)
                return (
                  <FadeIn key={post.link} delay={i * 0.06} className="h-full">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col bg-white p-8 h-full group hover:bg-light transition-colors border border-light-secondary hover:border-orange/20"
                    >
                      <div className="relative aspect-video mb-6 overflow-hidden flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#1a1f26] to-[#0d1117]">
                        <span className="text-2xl font-black tracking-tight text-white/95" aria-hidden>
                          vc<span className="text-[#ff5252]">.</span>ru
                        </span>
                      </div>
                      <div className="inline-block bg-[#1a1f26] text-white text-xs font-semibold px-3 py-1 mb-4 tracking-wide self-start">
                        vc.ru
                      </div>
                      <h3 className="text-dark font-bold text-lg mb-3 group-hover:text-orange transition-colors flex-1 line-clamp-3">
                        {title}
                      </h3>
                      <p className="text-dark/60 text-sm leading-relaxed mb-4 line-clamp-4">{excerpt}</p>
                      <div className="mt-auto flex items-center gap-3 pt-4 border-t border-light-secondary text-dark/40 text-xs">
                        <span>{formatPostDate(post.date)}</span>
                        <span>·</span>
                        <span>Открыть на vc.ru</span>
                      </div>
                    </a>
                  </FadeIn>
                )
              })}
            {isTelegramTab && telegramLoading && (
              <FadeIn>
                <p className="text-dark/50 col-span-full">Загрузка постов канала…</p>
              </FadeIn>
            )}
            {isVcTab && vcLoading && (
              <FadeIn>
                <p className="text-dark/50 col-span-full">Загрузка публикаций с vc.ru…</p>
              </FadeIn>
            )}
            {isTelegramTab &&
              !telegramLoading &&
              telegramVisible.length === 0 &&
              (telegramError || telegramPosts.length === 0) && (
              <FadeIn>
                <div className="col-span-full text-dark/60 text-sm space-y-3">
                  <p>
                    {telegramError ||
                      'Нет записей в ленте или RSS временно недоступен. Загляните в канал напрямую.'}
                  </p>
                  <a
                    href={TELEGRAM_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-orange font-semibold hover:gap-3 transition-all"
                  >
                    Перейти в канал →
                  </a>
                </div>
              </FadeIn>
            )}
            {isVcTab &&
              !vcLoading &&
              vcVisible.length === 0 &&
              (vcError || vcPosts.length === 0) && (
              <FadeIn>
                <div className="col-span-full text-dark/60 text-sm space-y-3">
                  <p>
                    {vcError ||
                      'Не удалось получить ленту или список пуст. Откройте блог на vc.ru.'}
                  </p>
                  <a
                    href={VC_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-orange font-semibold hover:gap-3 transition-all"
                  >
                    Перейти на vc.ru →
                  </a>
                </div>
              </FadeIn>
            )}
            {isTelegramTab &&
              !telegramLoading &&
              telegramVisible.map((post, i) => (
                <FadeIn key={post.link} delay={i * 0.08} className="h-full">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col bg-white p-8 h-full group hover:bg-light transition-colors border border-light-secondary hover:border-orange/20"
                  >
                    <div className="relative aspect-video mb-6 overflow-hidden flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0e1615] to-dark-secondary">
                      <svg className="w-14 h-14 text-orange/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                      </svg>
                    </div>
                    <div className="inline-block bg-dark text-white text-xs font-semibold px-3 py-1 mb-4 tracking-wide self-start">
                      Телеграм
                    </div>
                    <h3 className="text-dark font-bold text-lg mb-3 group-hover:text-orange transition-colors flex-1 line-clamp-3">
                      {decodeHtmlEntitiesLite(post.title)}
                    </h3>
                    <p className="text-dark/60 text-sm leading-relaxed mb-4 line-clamp-4">
                      {decodeHtmlEntitiesLite(post.excerpt)}
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-4 border-t border-light-secondary text-dark/40 text-xs">
                      <span>{formatPostDate(post.date)}</span>
                      <span>·</span>
                      <span>Открыть в Telegram</span>
                    </div>
                  </a>
                </FadeIn>
              ))}
            {isVcTab &&
              !vcLoading &&
              vcVisible.map((post, i) => (
                <FadeIn key={post.link} delay={i * 0.08} className="h-full">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col bg-white p-8 h-full group hover:bg-light transition-colors border border-light-secondary hover:border-orange/20"
                  >
                    <div className="relative aspect-video mb-6 overflow-hidden flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#1a1f26] to-[#0d1117]">
                      <span className="text-2xl font-black tracking-tight text-white/95" aria-hidden>
                        vc<span className="text-[#ff5252]">.</span>ru
                      </span>
                    </div>
                    <div className="inline-block bg-[#1a1f26] text-white text-xs font-semibold px-3 py-1 mb-4 tracking-wide self-start">
                      vc.ru
                    </div>
                    <h3 className="text-dark font-bold text-lg mb-3 group-hover:text-orange transition-colors flex-1 line-clamp-3">
                      {decodeHtmlEntitiesLite(post.title)}
                    </h3>
                    <p className="text-dark/60 text-sm leading-relaxed mb-4 line-clamp-4">
                      {decodeHtmlEntitiesLite(post.excerpt)}
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-4 border-t border-light-secondary text-dark/40 text-xs">
                      <span>{formatPostDate(post.date)}</span>
                      <span>·</span>
                      <span>Открыть на vc.ru</span>
                    </div>
                  </a>
                </FadeIn>
              ))}
            {!isAllTab && !isTelegramTab && !isVcTab && categoryVisible.length === 0 && (
              <FadeIn>
                <p className="text-dark/50 col-span-full">В этой категории пока нет материалов в списке ниже.</p>
              </FadeIn>
            )}
            {!isAllTab && !isTelegramTab && !isVcTab &&
              categoryVisible.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 0.08} className="h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex flex-col bg-white p-8 h-full group hover:bg-light transition-colors border border-light-secondary hover:border-orange/20"
                  >
                    <div className="relative aspect-video mb-6 overflow-hidden bg-dark-secondary flex-shrink-0">
                      <Image
                        src={post.image || '/images/blog-tax.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/20 transition-colors duration-300" />
                    </div>
                    <div className="inline-block bg-orange text-white text-xs font-semibold px-3 py-1 mb-4 tracking-wide self-start">
                      {post.category}
                    </div>
                    <h3 className="text-dark font-bold text-lg mb-3 group-hover:text-orange transition-colors flex-1">
                      {post.title}
                    </h3>
                    <p className="text-dark/60 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="mt-auto flex items-center gap-3 pt-4 border-t border-light-secondary text-dark/40 text-xs">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime} чтения</span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
          </div>

          {/* Load more */}
          {hasMore &&
            !(isTelegramTab && telegramLoading) &&
            !(isVcTab && vcLoading) && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                className="btn-outline-light px-10 py-3 text-sm font-semibold"
              >
                Загрузить ещё
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe */}
      <section className="section-padding bg-light">
        <div className="container-xl">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <p className="eyebrow">Подписка</p>
              <h2 className="text-3xl font-bold text-dark mb-4">Получайте материалы на почту</h2>
              <p className="text-dark/60 mb-8">Новые статьи по налогам, банкротству и AI-праву — раз в 2 недели.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 bg-white border border-light-secondary text-dark text-sm px-4 py-3 placeholder:text-dark/30 focus:outline-none focus:border-orange transition-colors"
                />
                <button className="btn-primary py-3 px-6 whitespace-nowrap">
                  Подписаться
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTASection
        title="Нужна консультация эксперта?"
        subtitle="Статьи — это полезно, но каждый бизнес уникален. Обсудим вашу конкретную ситуацию."
        primaryLabel="Обсудить задачу"
        primaryHref="/contacts"
        secondaryLabel="Все услуги →"
        secondaryHref="/services"
      />
    </div>
  )
}
