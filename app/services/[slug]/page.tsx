import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs'
import FadeIn from '@/components/FadeIn'
import CTASection from '@/components/CTASection'
import InnerHero from '@/components/InnerHero'
import { getServiceDetail, serviceDetails } from '@/lib/serviceData'
import { services } from '@/lib/data'

export function generateStaticParams() {
  return serviceDetails.map(s => ({ slug: s.slug }))
}

interface Props {
  params: { slug: string }
}

export default function ServicePage({ params }: Props) {
  const detail = getServiceDetail(params.slug)
  if (!detail) notFound()

  const relatedServices = detail.related
    .map(slug => services.find(s => s.slug === slug))
    .filter(Boolean)

  const serviceMeta = services.find((s) => s.slug === params.slug)
  const heroImage = serviceMeta?.image ?? '/images/cases/case-1.jpg'

  return (
    <div className="bg-white">
      <InnerHero
        eyebrow={detail.eyebrow}
        title={detail.heroH1}
        subtitle={detail.heroSubtitle}
        image={heroImage}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/contacts" className="btn-primary text-base px-8 py-4">
            {detail.heroCTA}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/calculator" className="btn-outline text-base px-8 py-4">
            Оценить стоимость →
          </Link>
        </div>
        {detail.heroCTA === 'Экстренная диагностика' && (
          <p className="text-white/35 text-sm mt-4">60–90 минут · карта рисков · план действий</p>
        )}
      </InnerHero>

      {/* ─── URGENCY BANNER ──────────────────────────────────── */}
      <div className="bg-orange/10 border-b border-orange/20">
        <div className="container-xl py-4">
          <p className="text-orange text-sm font-medium">{detail.urgencyText}</p>
        </div>
      </div>

      {/* ─── STATS ───────────────────────────────────────────── */}
      <section className="bg-dark border-b border-dark-muted/30">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-dark-muted/30">
            {detail.stats.map((s, i) => (
              <div key={i} className="py-8 px-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange mb-1">{s.num}</div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTRO TEXT ──────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="text-dark/70 text-lg leading-relaxed">{detail.intro}</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── SERVICES MEGA-GRID ──────────────────────────────── */}
      <section className="section-padding bg-light pt-0">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">Что входит</p>
            <h2 className="section-heading text-dark mb-12">
              Направления в рамках {detail.title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-light-secondary">
            {detail.services.map((serviceGroup, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white p-8 h-full">
                  <h3 className="text-dark font-bold text-lg mb-5 orange-left-border">{serviceGroup.title}</h3>
                  <ul className="space-y-3">
                    {serviceGroup.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange mt-2 flex-shrink-0" />
                        <span className="text-dark/70 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─────────────────────────────────────────── */}
      <section className="section-padding bg-dark-secondary">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">Как работаем</p>
            <h2 className="section-heading text-white mb-16">Процесс работы</h2>
          </FadeIn>

          <div className={`grid grid-cols-1 ${detail.process.length === 3 ? 'md:grid-cols-3' : detail.process.length === 5 ? 'md:grid-cols-5' : 'md:grid-cols-4'} gap-6`}>
            {detail.process.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative">
                  {i < detail.process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-6 h-px bg-orange/30 z-10" />
                  )}
                  <div className="bg-dark-card border border-dark-muted/30 p-6 h-full">
                    <div className="text-orange font-bold text-4xl mb-4 opacity-40">{step.step}</div>
                    <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-xl max-w-4xl">
          <FadeIn>
            <p className="eyebrow">FAQ</p>
            <h2 className="section-heading text-dark mb-12">Частые вопросы</h2>
          </FadeIn>

          <div className="space-y-0 border border-light-secondary">
            {detail.faq.map((item, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <details className="group border-b border-light-secondary last:border-0">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-light transition-colors">
                    <h3 className="text-dark font-semibold text-base pr-4">{item.q}</h3>
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-orange">
                      <svg className="w-5 h-5 transition-transform duration-200 group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-dark/60 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RELATED ─────────────────────────────────────────── */}
      <section className="section-padding bg-light">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">Смежные направления</p>
            <h2 className="text-2xl font-bold text-dark mb-10">Также вам может быть нужно</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-light-secondary">
            {relatedServices.map((s, i) => s && (
              <FadeIn key={s.slug} delay={i * 0.08}>
                <Link
                  href={`/services/${s.slug}`}
                  className="block bg-white overflow-hidden border border-light-secondary transition-all duration-300 h-full group hover:border-orange/30 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="relative h-36 w-full overflow-hidden bg-dark-secondary">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-block bg-orange text-white text-[10px] font-semibold px-2.5 py-1 tracking-wide">
                        {s.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-dark font-bold text-lg mb-2">{s.title}</h3>
                    <p className="text-dark/60 text-sm line-clamp-3">{s.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-orange text-sm font-semibold">
                      Подробнее →
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={detail.heroCTA}
        subtitle="Запишитесь на первичную диагностику — карта рисков и план действий за 60–90 минут."
        primaryLabel={detail.heroCTA}
        primaryHref="/contacts"
        secondaryLabel="Оценить стоимость →"
        secondaryHref="/calculator"
      />
    </div>
  )
}
