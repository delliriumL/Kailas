'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FadeIn from '@/components/FadeIn'
import CTASection from '@/components/CTASection'
import InnerHero from '@/components/InnerHero'

const allPosts = [
  {
    slug: 'kak-snizit-donachisleniya-pri-vneznoy-proverke',
    title: 'Как снизить доначисления при выездной налоговой проверке',
    excerpt: 'Пошаговое руководство: что делать с первых дней ВНП, как формировать возражения и выстраивать защиту до суда.',
    category: 'Налоговый консалтинг',
    date: '24 марта 2026',
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
    readTime: '9 мин',
    image: '/images/cases/case-5.jpg',
    featured: false,
  },
]

const PAGE_SIZE = 3

const blogFilters = [
  'Все',
  ...Array.from(new Set(allPosts.map((p) => p.category))).sort((a, b) => a.localeCompare(b, 'ru')),
]

export default function BlogPage() {
  const [active, setActive] = useState('Все')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const featured = allPosts.find((p) => p.featured)
  const rest = allPosts.filter((p) => !p.featured)
  const restFiltered = active === 'Все' ? rest : rest.filter((p) => p.category === active)
  const visiblePosts = restFiltered.slice(0, visibleCount)
  const hasMore = visibleCount < restFiltered.length

  const showFeatured =
    featured != null && (active === 'Все' || featured.category === active)

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

      {/* Featured post */}
      {showFeatured && featured && (
        <section className="border-b border-light-secondary bg-white">
          <div className="container-xl py-16">
            <FadeIn>
              <p className="eyebrow mb-6">Последняя публикация</p>
              <Link href={`/blog/${featured.slug}`} className="block group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-video overflow-hidden bg-dark-secondary">
                    <Image
                      src={featured.image || '/images/blog-tax.jpg'}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-dark/40" />
                    <div className="absolute top-4 left-4">
                      <div className="inline-block bg-orange text-white text-xs font-bold px-3 py-1 tracking-wide">
                        {featured.category}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="inline-block bg-orange text-white text-xs font-semibold px-3 py-1 mb-4 tracking-wide">
                      {featured.category}
                    </div>
                    <h2 className="text-3xl font-bold text-dark mb-4 group-hover:text-orange transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-dark/60 text-base leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex items-center gap-3 text-dark/40 text-sm mb-6">
                      <span>{featured.date}</span>
                      <span>·</span>
                      <span>{featured.readTime} чтения</span>
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
            {visiblePosts.length === 0 ? (
              <FadeIn>
                <p className="text-dark/50 col-span-full">В этой категории пока нет материалов в списке ниже.</p>
              </FadeIn>
            ) : (
            visiblePosts.map((post, i) => (
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
            ))
            )}
          </div>

          {/* Load more */}
          {hasMore && (
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
