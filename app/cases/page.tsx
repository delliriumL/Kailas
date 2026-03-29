'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FadeIn from '@/components/FadeIn'
import CTASection from '@/components/CTASection'
import InnerHero from '@/components/InnerHero'
import { cases } from '@/lib/data'

const filters = ['Все', 'Антикризисное', 'Налоговый консалтинг', 'Переговоры', 'Экспертизы', 'M&A', 'AI-автоматизация']

const PAGE_SIZE = 6

export default function CasesPage() {
  const [active, setActive] = useState('Все')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = active === 'Все' ? cases : cases.filter(c => c.tag === active)
  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  function handleFilter(f: string) {
    setActive(f)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div className="bg-white">
      <InnerHero
        eyebrow="Доказательная база"
        title="Кейсы и результаты"
        subtitle="Подборка завершённых проектов по налогам, банкротству, переговорам и M&A — с цифрами и контекстом. Полезно собственникам и финдиректорам, которые сравнивают подходы до созвона."
        image="/images/hero-inner-b.jpg"
      />

      {/* Stats bar */}
      <section className="bg-light border-b border-dark/10">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-dark/8">
            {[
              { num: '300+', label: 'проектов' },
              { num: '700+ млн', label: 'оспорено доначислений' },
              { num: '85%', label: 'снижение налоговых рисков' },
              { num: '15+', label: 'лет опыта' },
            ].map((s, i) => (
              <div key={i} className="py-8 px-6 text-center">
                <div className="text-3xl font-bold text-orange mb-1">{s.num}</div>
                <div className="text-dark/50 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          {/* Filters */}
          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-12">
              {filters.map((f) => (
                <button
                  key={f}
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
          </FadeIn>

          {/* Cases grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((c, i) => (
              <FadeIn key={c.id} delay={i * 0.06} className="h-full">
                <Link
                  href={`/cases/${c.id}`}
                  className="flex flex-col bg-white h-full group hover:bg-light transition-colors duration-300 border border-light-secondary hover:border-orange/20 overflow-hidden"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-dark-secondary">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                      <span className="inline-block bg-orange/95 text-white text-[10px] font-semibold px-2.5 py-1 tracking-wide">
                        {c.tag}
                      </span>
                      <span className="text-white text-xl md:text-2xl font-bold tabular-nums drop-shadow-md">
                        {c.metric}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-8">
                    <div className="flex-1">
                      <h3 className="text-dark font-bold text-lg mb-2 leading-snug">{c.title}</h3>
                      <p className="text-dark/70 text-sm leading-relaxed mb-4">{c.lead}</p>
                      <p className="text-dark/50 text-sm leading-relaxed line-clamp-3">{c.description}</p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-dark/10 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-dark/40 text-xs">{c.industry}</div>
                      <div className="text-dark/40 text-xs">{c.duration}</div>
                    </div>
                    <span className="flex items-center gap-1.5 text-orange text-xs font-semibold group-hover:gap-2.5 transition-all">
                      Читать кейс
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
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

      {/* Testimonials */}
      <section className="section-padding bg-dark-secondary">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">Что говорят клиенты</p>
            <h2 className="section-heading text-white mb-12">Доверие — результат работы</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cases.slice(0, 3).map((c, i) => (
              <FadeIn key={c.id} delay={i * 0.1}>
                <div className="bg-dark-card border border-dark-muted/30 p-8 h-full">
                  <div className="text-orange text-3xl mb-4">"</div>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 italic">{c.quote}</p>
                  <div className="pt-4 border-t border-dark-muted/30">
                    <div className="text-white font-semibold text-sm">{c.quoteCompany}</div>
                    <div className="text-white/40 text-xs mt-0.5">{c.quoteRole}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Хотите похожий результат?"
        subtitle="Обсудим вашу задачу и расскажем, как мы работаем в похожих ситуациях."
        primaryLabel="Обсудить задачу"
        primaryHref="/contacts"
        secondaryLabel="Посмотреть услуги →"
        secondaryHref="/services"
      />
    </div>
  )
}
