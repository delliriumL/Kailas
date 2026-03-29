'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import InnerHero from '@/components/InnerHero'

const steps = [
  {
    id: 0,
    question: 'Какая задача перед вами стоит?',
    options: [
      { label: 'Налоговые претензии / ВНП', value: 'tax' },
      { label: 'Банкротство или предбанкротство', value: 'bankruptcy' },
      { label: 'Корпоративный конфликт', value: 'conflict' },
      { label: 'Реструктуризация / M&A', value: 'ma' },
      { label: 'AI-автоматизация процессов', value: 'ai' },
      { label: 'Экспертиза / оценка', value: 'expertise' },
    ],
  },
  {
    id: 1,
    question: 'Насколько срочная ситуация?',
    options: [
      { label: 'Экстренно — уже предъявлены требования', value: 'emergency' },
      { label: 'Срочно — есть угрозы, нужно действовать', value: 'urgent' },
      { label: 'Планово — хочу разобраться заранее', value: 'planned' },
    ],
  },
  {
    id: 2,
    question: 'Какой масштаб задачи?',
    options: [
      { label: 'До 50 млн ₽', value: 'small' },
      { label: 'От 50 до 300 млн ₽', value: 'medium' },
      { label: 'Свыше 300 млн ₽', value: 'large' },
    ],
  },
  {
    id: 3,
    question: 'Нужна ли работа с экспертами или судом?',
    options: [
      { label: 'Только консультация и стратегия', value: 'consult' },
      { label: 'Консультация + переговоры / досудебная', value: 'presue' },
      { label: 'Полное сопровождение включая суд', value: 'full' },
    ],
  },
]

function calcResult(answers: Record<number, string>) {
  const urgency = answers[1]
  const scale = answers[2]
  const scope = answers[3]

  if (urgency === 'emergency' && scale === 'large') {
    return {
      tier: 'Стратегическое партнёрство',
      range: '300 000 – 1 500 000 ₽/мес',
      desc: 'Экстренное полное сопровождение крупного дела',
      format: 'Приоритетный доступ, команда под задачу, ежедневный контроль',
    }
  }
  if (scale === 'large' || scope === 'full') {
    return {
      tier: 'Проект',
      range: '500 000 – 3 000 000 ₽',
      desc: 'Комплексное сопровождение крупной задачи',
      format: 'Фиксированная стоимость по этапам, координация партнёров',
    }
  }
  if (urgency === 'planned' && scope === 'consult') {
    return {
      tier: 'Диагностика',
      range: '30 000 – 50 000 ₽',
      desc: 'Первичная оценка ситуации и план действий',
      format: '60–90 минут, карта рисков, письменное резюме',
    }
  }
  return {
    tier: 'Проект',
    range: '150 000 – 2 000 000 ₽',
    desc: 'Сопровождение конкретной задачи',
    format: 'Фиксированная стоимость по этапу, возможно абонентское',
  }
}

const tiers = [
  {
    name: 'Диагностика',
    price: '30 000 – 50 000 ₽',
    features: [
      'Экстренная консультация 60–90 минут',
      'Карта рисков и уязвимостей',
      'Письменное резюме ситуации',
      'Рекомендации по первым шагам',
    ],
    cta: 'Записаться на диагностику',
    highlighted: false,
  },
  {
    name: 'Проект',
    price: '150 000 – 2 000 000 ₽',
    features: [
      'Сопровождение конкретной задачи',
      'Фиксированная стоимость по этапу',
      'Координация экспертов и партнёров',
      'Представительство в переговорах',
      'Досудебная и судебная защита',
    ],
    cta: 'Обсудить проект',
    highlighted: true,
  },
  {
    name: 'Стратегическое партнёрство',
    price: '80 000 – 300 000 ₽/мес',
    features: [
      'Абонентское сопровождение',
      'Приоритетный доступ к команде',
      'Постоянный мониторинг рисков',
      'AI-дашборд контроля',
      'Ежемесячные отчёты',
    ],
    cta: 'Обсудить партнёрство',
    highlighted: false,
  },
]

const faqItems = [
  { q: 'Есть ли бесплатная консультация?', a: 'Первичный звонок — бесплатно. Платная диагностика занимает 60–90 минут и включает письменный отчёт с картой рисков.' },
  { q: 'Что входит в стоимость проекта?', a: 'Стратегия, подготовка документов, переговоры, представительство. Координация экспертов — дополнительно.' },
  { q: 'Как рассчитывается гонорар при ВНП?', a: 'Часто применяем модель: фиксированная ставка + процент от сэкономленных доначислений. Мотивирует на результат.' },
  { q: 'Можно ли начать с малого?', a: 'Да. Диагностика — это отдельная услуга. Не обязывает продолжать работу.' },
  { q: 'Как быстро можно начать работу?', a: 'По экстренным запросам подключаемся в течение 24 часов. Стандартный старт — 2–3 рабочих дня.' },
]

export default function CalculatorPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [done, setDone] = useState(false)

  const total = steps.length
  const progress = ((step) / total) * 100

  function select(value: string) {
    const newAnswers = { ...answers, [step]: value }
    setAnswers(newAnswers)
    if (step < total - 1) {
      setTimeout(() => setStep(step + 1), 200)
    } else {
      setTimeout(() => setDone(true), 200)
    }
  }

  function reset() {
    setStep(0)
    setAnswers({})
    setDone(false)
  }

  const result = calcResult(answers)

  return (
    <div className="bg-white">
      <InnerHero
        eyebrow="Калькулятор стоимости"
        title="Оцените стоимость решения вашей задачи"
        subtitle="Ответьте на 4 вопроса — получите ориентировочный бюджет и формат работы. Без обязательств: это ориентир, а не оферта."
        image="/images/hero-inner-b.jpg"
      />

      {/* Wizard */}
      <section className="section-padding bg-light">
        <div className="container-xl max-w-4xl">
          {!done ? (
            <div>
              {/* Progress bar */}
              <FadeIn>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-dark/50 text-sm">Шаг {step + 1} из {total}</span>
                  <span className="text-dark/50 text-sm">{Math.round((step / total) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-light-secondary rounded-full overflow-hidden mb-10">
                  <motion.div
                    className="h-full bg-orange"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </FadeIn>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-dark mb-8">
                    {steps[step].question}
                  </h2>
                  <div className={`grid gap-3 ${steps[step].options.length > 3 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
                    {steps[step].options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => select(opt.value)}
                        className={`flex items-center gap-4 p-6 bg-white border-2 transition-all duration-200 text-left hover:border-orange hover:shadow-md group ${
                          answers[step] === opt.value ? 'border-orange bg-orange/5' : 'border-light-secondary'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${answers[step] === opt.value ? 'bg-orange' : 'bg-dark/20 group-hover:bg-orange'}`} />
                        <span className="text-dark font-medium group-hover:text-orange transition-colors">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-8 text-dark/40 hover:text-dark text-sm flex items-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  Назад
                </button>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Result */}
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-orange/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-orange text-sm font-bold uppercase tracking-wider mb-2">Ориентировочная оценка</p>
                <h2 className="text-3xl md:text-4xl font-bold text-dark mb-2">{result.range}</h2>
                <p className="text-dark/60 text-lg">{result.tier} — {result.desc}</p>
              </div>

              <div className="bg-white border border-light-secondary p-8 mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-8 h-8 bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-dark font-semibold mb-1">Формат работы</p>
                    <p className="text-dark/60 text-sm">{result.format}</p>
                  </div>
                </div>
                <p className="text-dark/50 text-xs border-t border-light-secondary pt-4">
                  Это ориентировочная оценка. Точная стоимость определяется после диагностики — зависит от масштаба, сроков и привлечения партнёров.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contacts" className="btn-primary flex-1 justify-center text-base py-4">
                  Обсудить задачу
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <button onClick={reset} className="btn-outline-orange flex-1 justify-center text-base py-4">
                  Пересчитать
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Pricing philosophy */}
      <section className="section-padding bg-dark-secondary overflow-hidden">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: heading + text */}
            <FadeIn>
              <p className="eyebrow">Ценообразование</p>
              <h2 className="section-heading text-white mb-6">Почему нет фиксированного прайса</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Антикризисная практика — не типовая юридическая услуга. Стоимость формируется индивидуально: зависит от масштаба задачи, суммы на кону, сроков, необходимости привлечения отраслевых экспертов и характера судебной перспективы.
              </p>
              <p className="text-white/40 text-sm leading-relaxed">
                Цифры в калькуляторе — только ориентир. Точная стоимость определяется после 60-минутной диагностики, которая сама по себе является ценным продуктом: вы получаете карту рисков и план действий.
              </p>
            </FadeIn>

            {/* Right: factors */}
            <FadeIn delay={0.15} direction="right">
              <div className="space-y-0 border border-dark-muted/40">
                {[
                  { factor: 'Масштаб задачи', desc: 'Сумма доначислений, размер долга, стоимость активов под угрозой' },
                  { factor: 'Срочность', desc: 'Экстренный режим требует приоритизации и мобилизации ресурсов' },
                  { factor: 'Охват работ', desc: 'Только стратегия, или полное сопровождение включая суд' },
                  { factor: 'Привлечение экспертов', desc: 'Отраслевые эксперты, налоговые консультанты, оценщики' },
                  { factor: 'Партнёрская сеть', desc: 'Региональное сопровождение и специализированные адвокаты' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 border-b border-dark-muted/40 last:border-0 group hover:bg-dark-card transition-colors">
                    <div className="w-1.5 bg-orange flex-shrink-0 self-stretch" />
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">{item.factor}</div>
                      <div className="text-white/40 text-xs leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">Форматы работы</p>
            <h2 className="section-heading text-dark mb-12">Три уровня вовлечённости</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-light-secondary">
            {tiers.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 0.1}>
                <div className={`p-10 h-full flex flex-col ${tier.highlighted ? 'bg-dark-secondary' : 'bg-white'}`}>
                  {tier.highlighted && (
                    <div className="inline-block bg-orange text-white text-xs font-bold px-3 py-1 mb-4 self-start tracking-wide">
                      Популярный
                    </div>
                  )}
                  <h3 className={`font-bold text-xl mb-2 ${tier.highlighted ? 'text-white' : 'text-dark'}`}>
                    {tier.name}
                  </h3>
                  <div className={`text-2xl font-bold mb-6 ${tier.highlighted ? 'text-orange' : 'text-dark'}`}>
                    {tier.price}
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className={`text-sm ${tier.highlighted ? 'text-white/70' : 'text-dark/70'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contacts"
                    className={tier.highlighted ? 'btn-primary justify-center' : 'btn-outline-orange justify-center'}
                  >
                    {tier.cta}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-light">
        <div className="container-xl max-w-3xl">
          <FadeIn>
            <p className="eyebrow">FAQ о стоимости</p>
            <h2 className="section-heading text-dark mb-12">Частые вопросы</h2>
          </FadeIn>

          <div className="border border-light-secondary">
            {faqItems.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <details className="group border-b border-light-secondary last:border-0">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-white transition-colors">
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
    </div>
  )
}
