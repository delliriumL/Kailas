'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import FadeIn from '@/components/FadeIn'
import CTASection from '@/components/CTASection'
import { HighlightWord } from '@/components/HighlightWord'
import { services, caseSlides, blogPosts } from '@/lib/data'

const trustStats = [
  { label: '15+ лет', sub: 'опыта' },
  { label: '300+', sub: 'проектов' },
  { label: '85%', sub: 'снижение доначислений' },
]

const marketStats = [
  { num: '+40%', label: 'Банкротства в 2025 году', note: 'рост по данным ФНС' },
  { num: '94 млн ₽', label: 'Средний чек ВНП', note: 'по России в 2025' },
  { num: '22%', label: 'НДС с 2026 года', note: 'новые ставки' },
  { num: '88 млн ₽', label: 'Средняя субсидиарка', note: 'по делам 2024–2025' },
]

const manifesto = [
  {
    title: 'Структурность',
    desc: 'Каждое решение строится как алгоритм: диагностика → карта рисков → стратегия → реализация. Никаких абстрактных «мы разберёмся».',
  },
  {
    title: 'Технологичность',
    desc: 'AI применяется как инструмент: ускорение анализа, мониторинг рисков, автоматизация рутины. Но решение принимает эксперт.',
  },
  {
    title: 'Безопасность',
    desc: 'Система ориентирована на защиту бизнеса заранее, а не на тушение пожара постфактум. Превентивный подход снижает потери.',
  },
]

const whyUs = [
  {
    title: 'AI + Человеческая экспертиза',
    desc: 'AI-аналитика усиливается надзором эксперта. Скорость цифровых инструментов + точность опытного юриста.',
  },
  {
    title: 'Нет привязки к одному решению',
    desc: 'Подбираем оптимальную стратегию под вашу задачу, а не навязываем шаблонный сценарий.',
  },
  {
    title: 'Бутиковый формат',
    desc: 'Без раздутого штата. Компактная команда под задачу — арбитражные управляющие, оценщики, медиаторы, IT-архитекторы.',
  },
  {
    title: 'Полное покрытие рисков',
    desc: 'Единственная практика, охватывающая налоги, банкротство, корпоративные конфликты и технологии одновременно.',
  },
  {
    title: 'Прозрачные результаты',
    desc: 'Чёткое ценообразование, реальная аналитика, никаких сюрпризов с бюджетом.',
  },
  {
    title: 'Доверие ведущих бизнесов',
    desc: 'Практика выбирается за измеримые результаты и системную работу, а не за красивый сайт.',
  },
]

const whoComes = [
  { num: '01', title: 'Давление со стороны государства', desc: 'Налоговые претензии, ВНП, уголовные риски — когда нужно безопасно пройти через сложные точки.' },
  { num: '02', title: 'Конфликты и тупики', desc: 'Корпоративные споры, кредиторские войны, медиация — разрулить без суда или выиграть в суде.' },
  { num: '03', title: 'Структура бизнеса', desc: 'Чистая, честная структура в деньгах и праве: M&A, холдинг, ликвидация, due diligence.' },
  { num: '04', title: 'Цифровой переход', desc: 'AI-автоматизация, комплаенс-цифровизация, безопасный переход в технологии.' },
]

const SLIDE_DURATION = 6000

function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/hero-main.jpg"
          alt=""
          fill
          className="object-cover object-center blur-[5px] scale-[1.12]"
          sizes="100vw"
          priority
        />
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black/68 via-black/52 to-black/82"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-black/25 sm:bg-black/15"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 95% 85% at 50% 42%, rgba(0,0,0,0.55) 0%, transparent 58%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col justify-center px-6 sm:px-10 lg:px-16 pt-24 pb-14 text-center md:pt-28 md:pb-20">
        <div className="mx-auto w-full max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 text-[11px] font-bold uppercase tracking-[0.18em] text-orange sm:text-xs"
          >
            Kailas-lab — антикризисный юрист — Москва
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="max-w-full break-words font-bold tracking-tight text-white"
            lang="ru"
          >
            <span
              className="block leading-[1.12] sm:leading-[1.14]"
              style={{
                fontSize: 'clamp(1.55rem, 4.2vw + 0.45rem, 4rem)',
              }}
            >
              <span className="block">
                Антикризисная{' '}
                <span className="sm:whitespace-nowrap">
                  практика на стыке <HighlightWord>права,</HighlightWord>
                </span>
              </span>
              <span className="mt-1 block sm:mt-1.5">
                <HighlightWord>налогов</HighlightWord> и технологий
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mx-auto mt-5 sm:mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg"
          >
            Налоги, суды, банкротство и AI — одна команда: сначала карта рисков и сроки, затем стратегия без
            шаблонов.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-7 sm:mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
          >
            <Link href="/contacts" className="btn-primary text-sm px-6 py-3 sm:text-base sm:px-8 sm:py-4 w-full sm:w-auto justify-center">
              Экстренная диагностика
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/calculator"
              className="btn-outline text-sm px-6 py-3 sm:text-base sm:px-8 sm:py-4 border-white/70 hover:border-white w-full sm:w-auto justify-center"
            >
              Оценить стоимость →
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-7 sm:mt-10 max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm"
          >
            {trustStats.map((s) => `${s.label} ${s.sub}`).join(' · ')}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

function CasesCarousel() {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((idx: number) => {
    setCurrent(idx)
    setProgress(0)
  }, [])

  const next = useCallback(() => goTo((current + 1) % caseSlides.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + caseSlides.length) % caseSlides.length), [current, goTo])

  useEffect(() => {
    intervalRef.current = setInterval(next, SLIDE_DURATION)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [next])

  useEffect(() => {
    setProgress(0)
    const start = Date.now()
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100))
    }, 50)
    return () => { if (progressRef.current) clearInterval(progressRef.current) }
  }, [current])

  const slide = caseSlides[current]

  return (
    <section className="section-padding bg-dark-secondary">
      <div className="container-xl">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow">Доказательная база</p>
              <h2 className="section-heading text-white">Измеримый результат</h2>
            </div>
            <Link href="/cases" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors self-start">
              Все кейсы
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-0 lg:h-[460px] items-stretch">
          {/* Left: Photo + metric — скрыт на мобильных */}
          <div className="hidden lg:block lg:col-span-2 relative overflow-hidden h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.photo}
                  alt={slide.metricLabel}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-dark/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Metric badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`metric-${slide.id}`}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute top-8 left-8"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-1">{slide.metric}</div>
                <div className="text-white/60 text-sm">{slide.metricLabel}</div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom description + controls */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${slide.id}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-white/60 text-sm mb-6"
                >
                  {slide.description}
                </motion.p>
              </AnimatePresence>
              {/* Progress bar */}
              <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full progress-fire transition-none rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: Quote + фиксированные стрелки — на мобильных full width */}
          <div className="bg-dark-card p-6 sm:p-8 lg:p-10 flex flex-col lg:h-full min-h-0 overflow-hidden">
            <div className="lg:flex-1 lg:min-h-0 lg:overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`quote-${slide.id}`}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-orange text-4xl font-serif mb-4 leading-none">"</div>
                  <p className="text-white/80 text-base leading-relaxed mb-8 italic">
                    {slide.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white/20">
                      <Image
                        src={slide.photo}
                        alt={slide.company}
                        fill
                        className="object-cover object-top"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{slide.company}</div>
                      <div className="text-white/40 text-xs">{slide.role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex-shrink-0 pt-6 mt-4 border-t border-white/10">
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-2 min-w-0 flex-1">
                  {caseSlides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Слайд ${i + 1}`}
                      className={`h-0.5 shrink-0 transition-all duration-300 ${i === current ? 'w-8 progress-fire' : 'w-4 bg-dark-muted'}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Предыдущий отзыв"
                    className="w-10 h-10 border border-dark-muted/50 flex items-center justify-center text-white/50 hover:border-orange hover:text-orange transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Следующий отзыв"
                    className="w-10 h-10 border border-dark-muted/50 flex items-center justify-center text-white/50 hover:border-orange hover:text-orange transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <Link
                href={`/cases/${slide.id}`}
                className="mt-6 flex items-center gap-2 text-orange text-sm font-semibold hover:gap-3 transition-all"
              >
                Читать кейс
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'business' | 'private'>('business')

  return (
    <div className="bg-dark">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <HeroSection />

      {/* ─── SOCIAL PROOF BAR (ticker скрыт на мобильных) ─────── */}
      <section className="hidden md:block bg-dark border-y border-dark-muted/50 py-5 overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-content">
            {[...marketStats, ...marketStats].map((s, i) => (
              <div key={i} className="flex items-center gap-8 px-12 border-r border-dark-muted/50 last:border-0">
                <span className="text-orange font-bold text-lg whitespace-nowrap">{s.num}</span>
                <div>
                  <div className="text-white text-sm font-medium whitespace-nowrap">{s.label}</div>
                  <div className="text-slate-400 text-xs whitespace-nowrap">{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES CARDS ──────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">Направления практики</p>
            <h2 className="section-heading text-dark mb-4">
              Для бизнеса в точке <HighlightWord>давления</HighlightWord>
            </h2>
            <p className="text-ink text-lg max-w-2xl mb-12">
              Работаем с предпринимателями, собственниками и топ-менеджерами в ситуациях, где цена ошибки максимальна.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <FadeIn key={s.slug} delay={i * 0.07} className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="relative flex flex-col bg-[#181818] group overflow-hidden"
                  style={{ height: '340px' }}
                >
                  {/* Orange stripe – sweeps left→right across top on hover */}
                  <div className="absolute top-0 left-0 h-[3px] bg-orange z-10 w-0 group-hover:w-full transition-[width] duration-500 ease-out" />

                  {/* Content area – title + tag, always visible */}
                  <div className="p-6 flex items-start justify-between gap-3 flex-shrink-0 z-10">
                    <div className="flex-1 min-w-0">
                      <div className="inline-block bg-orange/20 text-orange text-[11px] font-bold px-2.5 py-1 mb-3 tracking-wide uppercase">
                        {s.tag}
                      </div>
                      <h3 className="text-lg font-bold text-white leading-tight">{s.title}</h3>
                    </div>
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-orange flex items-center justify-center group-hover:bg-white transition-colors duration-300 mt-1">
                      <svg className="w-4 h-4 text-white group-hover:text-orange transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Image area fills remaining height — description overlays it on hover */}
                  <div className="absolute inset-0 top-[100px]">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover object-center"
                    />
                    {/* Always-on top gradient to blend with title bg */}
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#181818] to-transparent" />
                    {/* Base overlay */}
                    <div className="absolute inset-0 bg-dark/20" />
                    {/* Hover: dark overlay sweeps up from bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/60 to-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Description slides up from below */}
                    <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <p className="text-white/90 text-sm leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO WE SERVE (TABS) ─────────────────────────────── */}
      <section className="section-padding bg-surface-light">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">Кому мы помогаем</p>
            <h2 className="section-heading text-dark mb-12">Антикризисная поддержка для бизнеса</h2>
          </FadeIn>

          {/* Tabs */}
          <div className="flex gap-1 mb-10 border-b border-ink/15">
            {[
              { id: 'business' as const, label: 'Для бизнеса' },
              { id: 'private' as const, label: 'Для собственников' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-orange text-dark'
                    : 'border-transparent text-ink/80 hover:text-dark'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="space-y-5">
                {activeTab === 'business' ? (
                  <>
                    {[
                      'Налоговые претензии и выездные проверки — снижение доначислений',
                      'Банкротство компании — защита активов и выход без потерь',
                      'Корпоративные конфликты — медиация и юридическое сопровождение',
                      'Реструктуризация долгов — переговоры с кредиторами',
                      'M&A и due diligence — юридическая безопасность сделки',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-dark text-base">{item}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {[
                      'Субсидиарная ответственность — защита личных активов',
                      'Налоговые риски учредителя — персональная безопасность',
                      'Выход из бизнеса — структурирование и защита',
                      'Семейные корпоративные конфликты — медиация',
                      'AI-автоматизация личного комплаенса',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-dark text-base">{item}</p>
                      </div>
                    ))}
                  </>
                )}
                <div className="pt-4">
                  <Link href="/services" className="btn-primary">
                    Все услуги
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Stats panel — скрыт на мобильных */}
            <FadeIn delay={0.2} direction="right" className="hidden md:block">
              <div className="bg-surface-deep p-10 rounded-sm border border-ink/10">
                <p className="text-center text-xs font-bold uppercase tracking-widest text-white/85 mb-8">
                  Доказательства в цифрах
                </p>
                <div className="grid grid-cols-2 gap-0">
                  {[
                    { num: '85%', label: 'Снижение доначислений в среднем' },
                    { num: '700+', label: 'Млн ₽ оспорено в пользу клиентов' },
                    { num: '24ч', label: 'Время реакции на экстренный запрос' },
                    { num: '300+', label: 'Успешно закрытых проектов' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`px-4 py-6 text-center sm:px-5 sm:py-7 ${
                        i % 2 === 0 ? 'border-r border-white/20' : ''
                      } ${i < 2 ? 'border-b border-white/20' : ''}`}
                    >
                      <div className="text-4xl font-bold text-orange mb-1">{item.num}</div>
                      <div className="text-white/50 text-sm leading-snug">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── MANIFESTO ───────────────────────────────────────── */}
      <section className="section-padding bg-light-secondary">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">Наш подход</p>
            <h2 className="section-heading text-dark mb-4">Мы отрицаем шаблоны</h2>
            <p className="text-ink text-lg max-w-2xl mb-16">
              Лучшая правовая помощь достигается сочетанием технологий, человеческой экспертизы и проверенной партнёрской сети.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-light-secondary">
            {manifesto.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white p-10 h-full border-l-4 border-orange">
                  <div className="text-orange font-bold text-5xl mb-6 opacity-20">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-dark font-bold text-xl mb-4">{item.title}</h3>
                  <p className="text-ink text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASES CAROUSEL ──────────────────────────────────── */}
      <CasesCarousel />

      {/* ─── WHY US ──────────────────────────────────────────── */}
      <section className="section-padding bg-light-secondary">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">Почему Kailas-lab</p>
            <h2 className="section-heading text-dark mb-4">
              Антикризисная практика, основанная на экспертизе
            </h2>
            <p className="text-ink text-lg max-w-2xl mb-16">
              Лучшие технологии, AI-мощь, экспертные люди — Kailas-lab доставляет измеримые результаты для бизнеса в любой ситуации.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-light-secondary">
            {whyUs.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white p-8 h-full group hover:bg-light transition-colors duration-200">
                  <div className="w-8 h-0.5 bg-orange mb-6" />
                  <h3 className="text-dark font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-ink text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO COMES ───────────────────────────────────────── */}
      <section className="section-padding bg-surface-deep">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">За чем к нам приходят</p>
            <h2 className="section-heading text-white mb-16">Четыре точки входа</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whoComes.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-dark-card border border-dark-muted/30 p-8 group hover:border-orange/50 transition-all duration-300">
                  <div className="text-orange/30 text-6xl font-bold mb-4 group-hover:text-orange/50 transition-colors">
                    {item.num}
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOG ────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="eyebrow">Экспертные материалы</p>
                <h2 className="section-heading text-dark">Последние материалы</h2>
              </div>
              <Link href="/blog" className="flex items-center gap-2 text-orange font-semibold text-sm hover:gap-3 transition-all self-start">
                Все материалы
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
            {/* Featured large post */}
            <FadeIn className="lg:col-span-2 h-full">
              <Link
                href={`/blog/${blogPosts[0].slug}`}
                className="flex flex-col bg-white h-full overflow-hidden border border-light-secondary transition-colors hover:border-orange/25 group"
              >
                <div className="relative aspect-[2/1] overflow-hidden bg-dark-secondary flex-shrink-0 lg:aspect-video">
                  <Image
                    src={blogPosts[0].image || '/images/cases/case-1.jpg'}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
                    <span className="inline-block bg-orange text-white text-xs font-semibold px-3 py-1 tracking-wide">
                      {blogPosts[0].category}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <h3 className="text-dark font-bold text-lg sm:text-xl lg:text-2xl mb-3 leading-tight group-hover:text-orange transition-colors max-lg:line-clamp-4">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-ink text-sm sm:text-base lg:text-[17px] lg:leading-relaxed mb-5 flex-1 max-lg:line-clamp-4 lg:line-clamp-none">
                    {blogPosts[0].featuredExcerpt ?? blogPosts[0].excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-muted text-xs border-t border-ink/15 pt-4 mt-auto">
                    <span>Статья</span>
                    <span className="text-ink-muted/50">·</span>
                    <span>{blogPosts[0].date}</span>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* Два поста справа: на lg верх ~2/3 высоты колонки, низ ~1/3 */}
            <div className="grid h-full min-h-0 gap-4 grid-rows-[auto_auto] lg:grid-rows-[minmax(0,2fr)_minmax(0,1fr)]">
              {blogPosts.slice(1, 3).map((post, i) => {
                const isBottom = i === 1
                const cardShell =
                  'flex flex-col bg-white h-full min-h-0 overflow-hidden border border-light-secondary transition-colors hover:border-orange/25 group'
                return (
                  <FadeIn key={post.slug} delay={i * 0.1} className="min-h-0 flex flex-col">
                    <Link href={`/blog/${post.slug}`} className={cardShell}>
                      {/* Нижний пост: картинка только на мобилке; верхний — как раньше */}
                      <div
                        className={`relative w-full overflow-hidden bg-dark-secondary flex-shrink-0 aspect-[2/1] ${
                          isBottom ? 'lg:hidden' : 'lg:aspect-[16/9]'
                        }`}
                      >
                        <Image
                          src={post.image || '/images/cases/case-1.jpg'}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
                          <span className="inline-block bg-orange text-white text-xs font-semibold px-3 py-1 tracking-wide">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className={`p-6 flex flex-col flex-1 min-h-0 ${isBottom ? 'lg:p-6 lg:pt-6' : 'lg:p-7'}`}>
                        {isBottom && (
                          <span className="hidden lg:inline-block self-start bg-orange text-white text-xs font-semibold px-3 py-1 tracking-wide mb-4">
                            {post.category}
                          </span>
                        )}
                        <h3
                          className={`text-dark font-bold leading-snug group-hover:text-orange transition-colors max-lg:line-clamp-3 ${
                            isBottom ? 'text-base mb-2 lg:mb-2' : 'text-lg mb-3'
                          }`}
                        >
                          {post.title}
                        </h3>
                        <p className="text-ink text-sm leading-relaxed mb-5 flex-1 min-h-0 max-lg:line-clamp-4 lg:line-clamp-none lg:text-[15px]">
                          {post.featuredExcerpt ?? post.excerpt}
                        </p>
                        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-muted text-xs border-t border-ink/15 pt-4">
                          <span>Статья</span>
                          <span className="text-ink-muted/50">·</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Готовы обсудить задачу? 60–90 минут"
        subtitle="Экстренная диагностика: карта рисков, план действий, честная оценка ситуации."
        primaryLabel="Экстренная диагностика"
        primaryHref="/contacts"
        secondaryLabel="Скачать Антикризисный гайд"
        secondaryHref="/blog"
      />
    </div>
  )
}
