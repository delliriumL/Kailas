import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import FadeIn from '@/components/FadeIn'
import CTASection from '@/components/CTASection'
import { cases } from '@/lib/data'

export function generateStaticParams() {
  return cases.map(c => ({ id: String(c.id) }))
}

interface Props {
  params: { id: string }
}

const caseDetails: Record<number, {
  challenge: string
  approach: string[]
  result: string
  results: { num: string; label: string }[]
  timeline: { phase: string; action: string }[]
}> = {
  1: {
    challenge: 'Компания оказалась под выездной налоговой проверкой по дроблению бизнеса. ФНС предъявила претензии на 340 млн ₽ по НДС и налогу на прибыль. Угроза полного прекращения деятельности.',
    approach: [
      'Проведена экстренная диагностика ситуации за 72 часа — выявлены ключевые уязвимости',
      'Разработана стратегия налоговой реконструкции с формированием доказательной базы',
      'Проведена независимая экспертиза хозяйственных операций',
      'Выстроены переговоры с инспекцией и территориальным управлением ФНС',
      'Достигнуто соглашение о снижении доначислений до 47 млн ₽',
    ],
    result: 'Доначисления снижены с 340 до 47 млн ₽. Бизнес сохранён и продолжает работу в полном объёме.',
    results: [
      { num: '−86%', label: 'снижение доначислений' },
      { num: '293 млн', label: 'сэкономлено' },
      { num: '8 мес', label: 'длительность дела' },
    ],
    timeline: [
      { phase: 'Диагностика', action: 'Анализ претензий, карта рисков, стратегия защиты' },
      { phase: 'Подготовка', action: 'Сбор доказательной базы, налоговая реконструкция' },
      { phase: 'Экспертиза', action: 'Независимое заключение по хозяйственным операциям' },
      { phase: 'Переговоры', action: 'Коммуникация с ФНС, согласование позиции' },
      { phase: 'Результат', action: 'Подписание соглашения о снижении доначислений' },
    ],
  },
  2: {
    challenge: 'Руководители и владельцы производственной компании оказались под угрозой субсидиарной ответственности на 650 млн ₽ в ходе процедуры банкротства. Кредиторы активно формировали доказательную базу.',
    approach: [
      'Срочный анализ основания требований о субсидиарной ответственности',
      'Разработка стратегии защиты КДЛ (контролирующих должника лиц)',
      'Оспаривание требований кредиторов в рамках банкротного дела',
      'Формирование контраргументной базы по каждому эпизоду',
      'Представление интересов в арбитражном суде',
    ],
    result: 'Субсидиарная ответственность не наступила. Ключевые активы защищены. Кредиторские требования на 400 млн ₽ оспорены.',
    results: [
      { num: '650 млн', label: 'защита от субсидиарки' },
      { num: '400 млн', label: 'оспорено требований' },
      { num: '14 мес', label: 'длительность дела' },
    ],
    timeline: [
      { phase: 'Анализ', action: 'Оценка рисков субсидиарной ответственности' },
      { phase: 'Стратегия', action: 'Разработка позиции защиты КДЛ' },
      { phase: 'Оспаривание', action: 'Атака на требования кредиторов' },
      { phase: 'Судебный процесс', action: 'Представление позиции в суде' },
      { phase: 'Результат', action: 'Закрытие угрозы субсидиарной ответственности' },
    ],
  },
  3: {
    challenge: 'Девелоперская компания накопила долги на 1,2 млрд ₽ перед пулом кредиторов. Угроза банкротства могла привести к полной потере бизнеса и активов.',
    approach: [
      'Комплексный анализ долговой нагрузки и переговорного потенциала',
      'Разработка плана реструктуризации долгов',
      'Проведение переговоров с каждой группой кредиторов',
      'Структурирование соглашений о реструктуризации',
      'Сопровождение до финального закрытия всех договорённостей',
    ],
    result: 'Долги реструктурированы без процедуры банкротства. Бизнес сохранён, активы защищены, кредиторы получили гарантированный план выплат.',
    results: [
      { num: '1,2 млрд', label: 'реструктурировано' },
      { num: '0', label: 'банкротных процедур' },
      { num: '6 мес', label: 'длительность дела' },
    ],
    timeline: [
      { phase: 'Анализ', action: 'Карта кредиторов и долговой нагрузки' },
      { phase: 'Разработка плана', action: 'Создание плана реструктуризации' },
      { phase: 'Переговоры', action: 'Раздельные переговоры с группами кредиторов' },
      { phase: 'Соглашения', action: 'Структурирование и подписание соглашений' },
      { phase: 'Результат', action: 'Реструктуризация без банкротства' },
    ],
  },
  4: {
    challenge: 'В деле о банкротстве арбитражный управляющий настаивал на дате объективного банкротства, которая открывала широкий период для оспаривания сделок. Под угрозой оказались сделки на несколько сотен миллионов рублей.',
    approach: [
      'Детальный анализ финансовой отчётности за спорный период',
      'Подготовка экспертного заключения о дате объективного банкротства',
      'Формирование позиции с документальным обоснованием',
      'Представление заключения в арбитражный суд',
      'Защита позиции от контраргументов управляющего и кредиторов',
    ],
    result: 'Дата объективного банкротства сдвинута на 3 года. Объём сделок под угрозой оспаривания существенно снижен.',
    results: [
      { num: '−3 года', label: 'сдвиг даты банкротства' },
      { num: 'Сделки', label: 'защищены от оспаривания' },
      { num: '5 мес', label: 'длительность дела' },
    ],
    timeline: [
      { phase: 'Анализ', action: 'Изучение финансовой истории компании' },
      { phase: 'Экспертиза', action: 'Подготовка экспертного заключения' },
      { phase: 'Позиция', action: 'Документальное обоснование даты' },
      { phase: 'Суд', action: 'Защита позиции в арбитраже' },
      { phase: 'Результат', action: 'Решение о сдвиге даты банкротства' },
    ],
  },
  5: {
    challenge: 'Финтех-компания тратила значительный ресурс на ручные комплаенс-процедуры: мониторинг контрагентов, проверку договоров, комплаенс-отчётность. Задержки замедляли операционную работу.',
    approach: [
      'Аудит текущих комплаенс-процессов и выявление точек автоматизации',
      'Разработка архитектуры AI-решения под конкретные процессы',
      'Интеграция инструментов мониторинга контрагентов',
      'Автоматизация генерации договоров на основе шаблонов',
      'Создание дашборда комплаенс-рисков в реальном времени',
    ],
    result: 'Трудозатраты на комплаенс снижены на 70%. ROI на внедрение окупился за 4 месяца.',
    results: [
      { num: '−70%', label: 'трудозатрат на комплаенс' },
      { num: '4 мес', label: 'окупаемость ROI' },
      { num: '3 мес', label: 'длительность внедрения' },
    ],
    timeline: [
      { phase: 'Аудит', action: 'Анализ текущих процессов и болей' },
      { phase: 'Архитектура', action: 'Разработка технического решения' },
      { phase: 'Разработка', action: 'Создание и настройка инструментов' },
      { phase: 'Внедрение', action: 'Интеграция в рабочие процессы' },
      { phase: 'Результат', action: 'Снижение трудозатрат на 70%' },
    ],
  },
  6: {
    challenge: 'Стратегическая сделка M&A на 800 млн ₽ требовала комплексного due diligence: налоговые риски, скрытые обязательства, корпоративная структура приобретаемой компании.',
    approach: [
      'Налоговый due diligence за последние 3 года деятельности',
      'Правовой анализ корпоративной структуры и активов',
      'Выявление скрытых обязательств и условных рисков',
      'Разработка структуры сделки с учётом выявленных рисков',
      'Рекомендации по юридической защите покупателя',
    ],
    result: 'Выявлены скрытые обязательства на 120 млн ₽. Цена сделки скорректирована. Структура сделки защищает покупателя от исторических рисков.',
    results: [
      { num: '800 млн', label: 'сделка M&A' },
      { num: '120 млн', label: 'выявлено скрытых рисков' },
      { num: '2 мес', label: 'длительность due diligence' },
    ],
    timeline: [
      { phase: 'Налоговый аудит', action: 'Анализ налоговой истории за 3 года' },
      { phase: 'Правовой анализ', action: 'Корпоративная структура и активы' },
      { phase: 'Риски', action: 'Выявление скрытых обязательств' },
      { phase: 'Структурирование', action: 'Разработка защитной структуры сделки' },
      { phase: 'Результат', action: 'Закрытие сделки с защитой покупателя' },
    ],
  },
}

export default function CasePage({ params }: Props) {
  const id = parseInt(params.id, 10)
  const c = cases.find(x => x.id === id)
  if (!c) notFound()

  const detail = caseDetails[id]
  const related = cases.filter(x => x.id !== id).slice(0, 3)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[320px] md:min-h-[380px] overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src={c.image}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/78 via-black/55 to-black/82"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"
            aria-hidden
          />
        </div>
        <div className="container-xl relative z-10">
          <FadeIn>
            <div className="inline-block bg-orange text-white text-xs font-semibold px-3 py-1 mb-6 tracking-wide">
              {c.tag}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.12] mb-5 max-w-4xl">
              {c.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-8">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tabular-nums tracking-tight">
                {c.metric}
              </span>
              <span className="text-white/55 text-sm md:text-base font-medium uppercase tracking-wider">
                {c.metricLabel}
              </span>
            </div>
            <p className="text-white/75 text-lg md:text-xl max-w-3xl leading-relaxed mb-8">{c.heroSummary}</p>
            <div className="flex flex-wrap items-center gap-4 text-white/45 text-sm">
              <span>{c.industry}</span>
              <span>·</span>
              <span>{c.duration}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Key metrics */}
      <section className="bg-dark border-b border-dark-muted/30">
        <div className="container-xl">
          <div className="grid grid-cols-3 divide-x divide-dark-muted/30">
            {detail.results.map((r, i) => (
              <div key={i} className="py-10 px-6 text-center">
                <div className="text-4xl font-bold text-orange mb-2">{r.num}</div>
                <div className="text-white/50 text-sm">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-14">
              <FadeIn>
                <h2 className="text-2xl font-bold text-dark mb-5">Задача</h2>
                <p className="text-dark/70 text-base leading-relaxed">{detail.challenge}</p>
              </FadeIn>

              <FadeIn>
                <h2 className="text-2xl font-bold text-dark mb-6">Подход</h2>
                <div className="space-y-4">
                  {detail.approach.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-dark/70 text-base">{step}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn>
                <div className="bg-dark-secondary p-10 border-l-4 border-orange">
                  <p className="eyebrow mb-3">Результат</p>
                  <p className="text-white/80 text-lg leading-relaxed">{detail.result}</p>
                </div>
              </FadeIn>

              <FadeIn>
                <h2 className="text-2xl font-bold text-dark mb-8">Ход работы</h2>
                <div className="relative">
                  <div className="absolute left-3 top-0 bottom-0 w-px bg-light-secondary" />
                  <div className="space-y-6">
                    {detail.timeline.map((t, i) => (
                      <div key={i} className="flex gap-6 items-start pl-10 relative">
                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-orange flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] font-bold">{i + 1}</span>
                        </div>
                        <div>
                          <div className="text-orange text-xs font-bold uppercase tracking-wider mb-1">{t.phase}</div>
                          <p className="text-dark/70 text-sm">{t.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <FadeIn delay={0.1}>
                <div className="bg-dark-secondary p-8 sticky top-28">
                  <h3 className="text-white font-bold text-lg mb-6">Хотите похожий результат?</h3>
                  <p className="text-white/50 text-sm mb-6 leading-relaxed">
                    Обсудим вашу ситуацию и оценим реальные возможности. Без воды и абстрактных обещаний.
                  </p>
                  <Link href="/contacts" className="btn-primary w-full text-center block mb-3">
                    Обсудить задачу
                  </Link>
                  <Link href="/calculator" className="btn-outline w-full text-center block text-sm">
                    Оценить стоимость
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="bg-light p-6">
                  <p className="text-dark/40 text-xs font-bold uppercase tracking-wider mb-4">Направление</p>
                  <div className="text-dark font-medium text-sm">{c.tag}</div>
                  <div className="mt-3 pt-3 border-t border-light-secondary">
                    <p className="text-dark/40 text-xs font-bold uppercase tracking-wider mb-1">Отрасль</p>
                    <div className="text-dark/70 text-sm">{c.industry}</div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-light-secondary">
                    <p className="text-dark/40 text-xs font-bold uppercase tracking-wider mb-1">Длительность</p>
                    <div className="text-dark/70 text-sm">{c.duration}</div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Related cases */}
      <section className="section-padding bg-dark">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">Другие кейсы</p>
            <h2 className="section-heading text-white mb-12">Похожие результаты</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-dark-muted/20">
            {related.map((r, i) => (
              <FadeIn key={r.id} delay={i * 0.08}>
                <Link href={`/cases/${r.id}`} className="block bg-dark-secondary h-full overflow-hidden group hover:bg-dark-card transition-colors duration-300 border border-dark-muted/20">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={r.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                      <span className="inline-block bg-orange text-white text-[10px] font-semibold px-2.5 py-1 tracking-wide">
                        {r.tag}
                      </span>
                      <span className="text-white text-xl font-bold tabular-nums">{r.metric}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-white/90 font-medium text-base mb-4 leading-snug">{r.title}</h3>
                    <span className="flex items-center gap-1.5 text-orange text-xs font-semibold group-hover:gap-2.5 transition-all">
                      Читать кейс
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Обсудим вашу задачу?"
        subtitle="Экстренная диагностика: 60–90 минут, карта рисков, план действий. Реакция в течение 24 часов."
        primaryLabel="Получить консультацию"
        primaryHref="/contacts"
        secondaryLabel="Все кейсы →"
        secondaryHref="/cases"
      />
    </div>
  )
}
