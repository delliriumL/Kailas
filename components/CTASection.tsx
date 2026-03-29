import Link from 'next/link'
import type { ReactNode } from 'react'
import FadeIn from './FadeIn'

interface CTASectionProps {
  title?: ReactNode
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CTASection({
  title = 'Готовы обсудить вашу задачу?',
  subtitle = 'Запишитесь на экстренную диагностику — 60–90 минут, карта рисков, план действий.',
  primaryLabel = 'Обсудить задачу',
  primaryHref = '/contacts',
  secondaryLabel = 'Оценить стоимость →',
  secondaryHref = '/calculator',
}: CTASectionProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/cta-bg.jpg)' }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-dark/85" />
      {/* Forest Teal accent glow */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #1A8F7D 0%, transparent 60%)',
        }}
      />
      <div className="absolute bottom-0 left-0 w-full h-px bg-dark-muted/30" />

      <div className="container-xl relative z-10 text-center">
        <FadeIn>
          <h2 className="section-heading text-white mb-6">{title}</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">{subtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={primaryHref} className="btn-primary text-base px-8 py-4">
              {primaryLabel}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href={secondaryHref} className="btn-outline text-base px-8 py-4">
              {secondaryLabel}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
