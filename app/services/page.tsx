import Link from 'next/link'
import Image from 'next/image'
import FadeIn from '@/components/FadeIn'
import CTASection from '@/components/CTASection'
import InnerHero from '@/components/InnerHero'
import { services } from '@/lib/data'

const additionalServices = [
  { label: 'GR и взаимодействие с госорганами', href: '/contacts' },
  { label: 'Комплаенс и профилактика', href: '/contacts' },
  { label: 'Цифровое и IT-право', href: '/contacts' },
  { label: 'Управленческий консалтинг', href: '/contacts' },
  { label: 'Абонентское обслуживание', href: '/contacts' },
  { label: 'Образовательные продукты', href: '/contacts' },
]

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <InnerHero
        eyebrow="Все направления"
        title="Антикризисные юридические услуги"
        subtitle="Комплексная защита бизнеса — от налоговых проверок до банкротства, от структурирования до цифровизации."
        image="/images/hero-inner-a.jpg"
      />

      {/* Main Services */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">Основные направления</p>
            <h2 className="section-heading text-dark mb-12">Шесть ключевых направлений</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-light-secondary">
            {services.map((s, i) => (
              <FadeIn key={s.slug} delay={i * 0.08}>
                <Link
                  href={`/services/${s.slug}`}
                  className="block bg-dark-secondary text-white group h-full relative overflow-hidden"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-dark/50 group-hover:bg-dark/30 transition-colors duration-300" />
                  </div>
                  <div className="p-8">
                    <div className="inline-block bg-orange/20 text-orange text-xs font-semibold px-3 py-1 mb-4 tracking-wide">
                      {s.tag}
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3">{s.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-6">{s.description}</p>
                    <div className="flex items-center gap-2 text-orange text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200">
                      Подробнее
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-light">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">Дополнительно</p>
            <h2 className="section-heading text-dark mb-12">Расширенные направления</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalServices.map((s, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <Link
                  href={s.href}
                  className="flex items-center justify-between bg-white border border-light-secondary p-6 hover:border-orange hover:bg-white transition-all duration-200 group"
                >
                  <span className="text-dark font-medium text-sm group-hover:text-orange transition-colors">{s.label}</span>
                  <svg className="w-4 h-4 text-orange group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing hint */}
      <section className="section-padding bg-dark-secondary">
        <div className="container-xl text-center">
          <FadeIn>
            <h2 className="section-heading text-white mb-4">
              Не знаете, какое направление вам нужно?
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Пройдите калькулятор — ответите на несколько вопросов и получите ориентировочную стоимость и формат работы.
            </p>
            <Link href="/calculator" className="btn-primary text-base px-10 py-4">
              Пройти калькулятор
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </section>

      <CTASection
        title="Готовы начать?"
        subtitle="Обсудим вашу задачу и подберём оптимальное направление."
        primaryLabel="Обсудить задачу"
        primaryHref="/contacts"
        secondaryLabel="Калькулятор стоимости →"
        secondaryHref="/calculator"
      />
    </div>
  )
}
