import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import CTASection from '@/components/CTASection'
import InnerHero from '@/components/InnerHero'
import { HighlightWord } from '@/components/HighlightWord'

const notUs = [
  {
    title: 'Не бренд-агентство',
    desc: 'Мы не продаём образ успеха. Мы решаем реальные задачи с измеримым результатом. Без глянца и корпоративного пиара.',
  },
  {
    title: 'Не фабрика успешного успеха',
    desc: 'Честная коммуникация про риски, сроки и логику шагов. Если задача невозможна — скажем прямо.',
  },
  {
    title: 'Не бюрократическая большая фирма',
    desc: 'Без раздутого штата, 50 юристов на бумаге и 2 в реальности. Компактная команда под конкретную задачу.',
  },
  {
    title: 'Не сервис «закроем всё за вас»',
    desc: 'Мы работаем вместе с клиентом, объясняем логику и помогаем принимать решения — а не просто берём деньги.',
  },
]

const partners = [
  { role: 'Арбитражные управляющие', desc: 'Сертифицированные специалисты с опытом в банкротных делах' },
  { role: 'Независимые оценщики', desc: 'Лицензированные оценщики для экспертиз и судебных дел' },
  { role: 'Медиаторы', desc: 'Профессиональные медиаторы для внесудебного урегулирования' },
  { role: 'IT-архитекторы', desc: 'Технологические эксперты для AI-автоматизации и цифровизации' },
  { role: 'Налоговые эксперты', desc: 'Специалисты по ФНС, ВНП и судебным налоговым спорам' },
  { role: 'Судебные эксперты', desc: 'Аккредитованные специалисты для судебных экспертиз' },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      <InnerHero
        eyebrow="О ПРАКТИКЕ"
        title="Антикризисная практика на стыке права, налогов и технологий"
        subtitle="Мы не продаём «успех в Instagram» — работаем с реальными спорами, проверками и сделками. Бутиковый формат: собственная экспертиза, партнёрская сеть и AI-инструменты. Москва."
        image="/images/hero-inner-a.jpg"
      />

      {/* ─── FOUNDER ─────────────────────────────────────────── */}
      <section className="bg-white section-padding">
        <div className="container-xl">
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16 xl:gap-20">

            {/* Текст */}
            <FadeIn className="order-2 lg:order-1 flex flex-col flex-1 min-w-0">
              <p className="eyebrow">Об основателе</p>
              <h2 className="text-4xl md:text-5xl font-bold text-dark leading-[1.08] mb-8">
                Мария Рудакова
              </h2>
              <div className="space-y-4 text-dark/60 text-base leading-relaxed mb-10">
                <p>
                  Кризисный юрист и налоговый консультант с 15-летней практикой в сопровождении предпринимателей и собственников бизнеса через точки максимального давления.
                </p>
                <p>
                  Специализируется на защите в выездных налоговых проверках, антикризисном управлении, банкротных делах и переговорах с кредиторами.
                </p>
                <p>
                  Автор методологии «Антикризисный алгоритм» — системного подхода, сочетающего юридическую архитектуру решений с AI-инструментами.
                </p>
              </div>

              {/* Статистика — плоская полоса, без card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-dark/8 mb-10 divide-x divide-dark/8">
                {[
                  { num: '15+', label: 'лет опыта' },
                  { num: '300+', label: 'закрытых проектов' },
                  { num: '700+ млн', label: 'оспорено доначислений' },
                  { num: '24ч', label: 'реакция на запрос' },
                ].map((s, i) => (
                  <div key={i} className="py-5 px-5 min-w-0">
                    <div className="text-2xl font-bold text-orange tabular-nums mb-0.5">{s.num}</div>
                    <div className="text-dark/45 text-xs leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Специализация */}
              <div className="mb-10">
                <p className="text-dark/35 text-xs font-bold uppercase tracking-wider mb-4">Специализация</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Выездные налоговые проверки',
                    'Антикризисное управление',
                    'Банкротные дела',
                    'Субсидиарная ответственность',
                    'Налоговая реконструкция',
                    'Корпоративная медиация',
                  ].map((s, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center bg-light text-dark/70 text-xs px-3 py-1.5 border-l-2 border-orange"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://t.me/kailaslab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-dark text-white text-sm font-medium px-6 py-3 hover:bg-dark-secondary transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                  </svg>
                  Telegram
                </a>
                <a
                  href="mailto:maria@kailas-lab.ru"
                  className="inline-flex items-center gap-2 border border-dark/20 text-dark text-sm font-medium px-6 py-3 hover:border-orange hover:text-orange transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
              </div>
            </FadeIn>

            {/* Фото — компактный портрет с бирюзовой левой полосой */}
            <FadeIn
              delay={0.1}
              direction="right"
              className="order-1 lg:order-2 w-full max-w-xs sm:max-w-sm mx-auto lg:mx-0 lg:w-[300px] xl:w-[320px] flex-shrink-0"
            >
              <div className="flex">
                {/* Teal accent strip — тот же паттерн, что orange-left-border */}
                <div className="w-1 flex-shrink-0 bg-orange" />
                <div className="relative flex-1 aspect-[3/4] overflow-hidden">
                  <Image
                    src="/maria-founder.jpeg"
                    alt="Мария Рудакова — основатель Kailas-lab"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 320px"
                    priority
                  />
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ─── ABOUT PRACTICE ─────────────────────────────────── */}
      <section className="section-padding bg-dark-secondary">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="eyebrow">О практике</p>
              <h2 className="section-heading text-white mb-8">Как мы работаем</h2>
              <div className="space-y-5 text-white/60 text-base leading-relaxed">
                <p>
                  Kailas-lab — бутиковая антикризисная практика, которая работает в точках максимального давления: налоговые претензии, банкротство, корпоративные конфликты, взаимодействие с регуляторами.
                </p>
                <p>
                  Подход строится через архитектуру решения: диагностика ситуации, карта рисков, стратегия выхода, последовательность конкретных действий. Никаких абстрактных консультаций.
                </p>
                <p>
                  Для сложных задач мы собираем нужную конфигурацию партнёров — арбитражные управляющие, оценщики, медиаторы, IT-архитекторы. Без раздутого штата и фейковой «команды на 50 человек».
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 gap-0.5 bg-dark-muted/20">
                {[
                  { title: 'Диагностика', desc: 'Оцениваем реальную ситуацию — риски, сроки, возможности.' },
                  { title: 'Карта рисков', desc: 'Строим полную карту угроз и точек воздействия.' },
                  { title: 'Стратегия', desc: 'Разрабатываем конкретный план действий с измеримым результатом.' },
                  { title: 'Реализация', desc: 'Сопровождаем до финального результата — без воды и расплывчатых обещаний.' },
                ].map((step, i) => (
                  <div key={i} className="bg-dark-card p-6 flex gap-5 items-start">
                    <div className="text-orange font-bold text-sm mt-0.5 w-6 flex-shrink-0">0{i + 1}</div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{step.title}</h3>
                      <p className="text-white/50 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── NOT US ──────────────────────────────────────────── */}
      <section className="section-padding bg-light">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">Позиционирование</p>
            <h2 className="section-heading text-dark mb-4">Чем мы не являемся</h2>
            <p className="text-dark/55 text-lg max-w-2xl mb-16">
              Честное позиционирование помогает найти тех, кому подходит наш подход.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notUs.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white p-10 h-full group hover:bg-light-secondary transition-colors duration-300 border-l-4 border-orange/20 hover:border-orange">
                  <div className="w-8 h-8 rounded-full border-2 border-orange/30 flex items-center justify-center mb-6 group-hover:border-orange transition-colors">
                    <svg className="w-4 h-4 text-orange/50 group-hover:text-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-dark font-bold text-xl mb-4">{item.title}</h3>
                  <p className="text-dark/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNER NETWORK ────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <FadeIn>
            <p className="eyebrow">Как мы работаем</p>
            <h2 className="section-heading text-dark mb-4">
              Партнёрская <HighlightWord>сеть</HighlightWord>
            </h2>
            <p className="text-dark/60 text-lg max-w-2xl mb-16">
              Не раздутый штат, а нужная конфигурация специалистов под конкретную задачу. Эксперт в центре, партнёры под задачу.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-light-secondary">
            {partners.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white p-8 h-full group hover:bg-light transition-colors duration-200">
                  <div className="w-10 h-10 bg-orange/10 flex items-center justify-center mb-5 group-hover:bg-orange/20 transition-colors">
                    <div className="w-3 h-3 bg-orange" />
                  </div>
                  <h3 className="text-dark font-bold text-lg mb-2">{p.role}</h3>
                  <p className="text-dark/60 text-sm">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Network diagram visual */}
          <FadeIn delay={0.3} className="mt-16">
            <div className="bg-dark-secondary p-12 text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="text-white/30 text-sm">Арбитражные управляющие</div>
                <div className="text-white/20 hidden md:block">—</div>
                <div className="text-white/30 text-sm">Оценщики</div>
                <div className="text-white/20 hidden md:block">—</div>
                <div className="bg-orange text-white font-bold text-lg px-8 py-4">Kailas-lab</div>
                <div className="text-white/20 hidden md:block">—</div>
                <div className="text-white/30 text-sm">Медиаторы</div>
                <div className="text-white/20 hidden md:block">—</div>
                <div className="text-white/30 text-sm">IT-архитекторы</div>
              </div>
              <p className="text-white/30 text-sm mt-8 max-w-lg mx-auto">
                Центральный эксперт собирает нужную конфигурацию специалистов под каждую задачу
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection
        title="Готовы поговорить о вашей ситуации?"
        subtitle="Запишитесь на первичную диагностику — честная оценка без воды и обязательств."
        primaryLabel="Обсудить задачу"
        primaryHref="/contacts"
        secondaryLabel="Посмотреть кейсы →"
        secondaryHref="/cases"
      />
    </div>
  )
}
