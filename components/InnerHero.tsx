'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import FadeIn from '@/components/FadeIn'

interface InnerHeroProps {
  eyebrow: string
  title: string
  subtitle: string
  /** Shared pool: hero-inner-a.jpg | hero-inner-b.jpg */
  image?: string
  children?: ReactNode
}

export default function InnerHero({
  eyebrow,
  title,
  subtitle,
  image = '/images/hero-inner-a.jpg',
  children,
}: InnerHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/72 via-black/52 to-black/78"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/35 to-transparent"
          aria-hidden
        />
      </div>

      <div className="container-xl relative z-10">
        <FadeIn>
          <p className="eyebrow text-white/90">{eyebrow}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 max-w-4xl">
            {title}
          </h1>
          <p className="text-white/65 text-lg md:text-xl max-w-2xl leading-relaxed">{subtitle}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </FadeIn>
      </div>
    </section>
  )
}
