'use client'

import { useState } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import FadeIn from '@/components/FadeIn'
import InnerHero from '@/components/InnerHero'

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', desc: '', service: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="bg-white">
      <InnerHero
        eyebrow="Контакты"
        title="Запишитесь на консультацию"
        subtitle="Экстренная диагностика: 60–90 минут, карта рисков, план действий. Ответим в течение рабочего дня."
        image="/images/hero-inner-a.jpg"
      />

      {/* Main content */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <FadeIn>
                <h2 className="text-2xl font-bold text-dark mb-8">Форма обратной связи</h2>
                {!sent ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-dark text-sm font-medium mb-2">Ваше имя *</label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="Иван Иванов"
                          className="w-full bg-light border border-light-secondary text-dark text-sm px-4 py-3 placeholder:text-dark/30 focus:outline-none focus:border-orange transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-dark text-sm font-medium mb-2">Телефон *</label>
                        <input
                          required
                          type="tel"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          placeholder="+7 (495) 000-00-00"
                          className="w-full bg-light border border-light-secondary text-dark text-sm px-4 py-3 placeholder:text-dark/30 focus:outline-none focus:border-orange transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-dark text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="ivan@company.ru"
                        className="w-full bg-light border border-light-secondary text-dark text-sm px-4 py-3 placeholder:text-dark/30 focus:outline-none focus:border-orange transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-dark text-sm font-medium mb-2">Направление</label>
                      <select
                        value={form.service}
                        onChange={e => setForm({ ...form, service: e.target.value })}
                        className="w-full bg-light border border-light-secondary text-dark text-sm px-4 py-3 focus:outline-none focus:border-orange transition-colors appearance-none"
                      >
                        <option value="">Выберите направление</option>
                        <option value="crisis">Антикризисное управление</option>
                        <option value="tax">Налоговый консалтинг</option>
                        <option value="negotiation">Переговоры и медиация</option>
                        <option value="expertise">Экспертизы и оценка</option>
                        <option value="ma">M&A и структурирование</option>
                        <option value="ai">AI-автоматизация</option>
                        <option value="other">Другое</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-dark text-sm font-medium mb-2">Опишите задачу</label>
                      <textarea
                        rows={5}
                        value={form.desc}
                        onChange={e => setForm({ ...form, desc: e.target.value })}
                        placeholder="Кратко опишите вашу ситуацию — что происходит, что беспокоит, что нужно решить..."
                        className="w-full bg-light border border-light-secondary text-dark text-sm px-4 py-3 placeholder:text-dark/30 focus:outline-none focus:border-orange transition-colors resize-none"
                      />
                    </div>
                    <p className="text-dark/40 text-xs">
                      Отправляя форму, вы соглашаетесь с{' '}
                      <span className="text-orange cursor-pointer hover:underline">политикой конфиденциальности</span>.
                    </p>
                    <button type="submit" className="btn-primary w-full justify-center text-base py-4">
                      Отправить заявку
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </form>
                ) : (
                  <div className="bg-light border border-light-secondary p-10 text-center">
                    <div className="w-16 h-16 bg-orange/10 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-dark font-bold text-xl mb-3">Заявка отправлена!</h3>
                    <p className="text-dark/60 text-sm">
                      Мы свяжемся с вами в течение 24 часов. Если задача экстренная — позвоните напрямую.
                    </p>
                    <a href="tel:+74950000000" className="btn-primary mt-6 inline-flex">
                      +7 (495) 000-00-00
                    </a>
                  </div>
                )}
              </FadeIn>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.15}>
                <h2 className="text-2xl font-bold text-dark mb-8">Контакты</h2>

                <div className="space-y-6 mb-10">
                  {[
                    {
                      icon: (
                        <svg className="w-5 h-5 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      ),
                      label: 'Телефон',
                      value: '+7 (495) 000-00-00',
                      href: 'tel:+74950000000',
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ),
                      label: 'Email',
                      value: 'info@kailas-lab.ru',
                      href: 'mailto:info@kailas-lab.ru',
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ),
                      label: 'Адрес',
                      value: 'Москва, ул. Тверская, 1',
                      href: '#map',
                    },
                  ].map((item, i) => (
                    <a key={i} href={item.href} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 bg-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange/20 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-dark/40 text-xs mb-0.5">{item.label}</div>
                        <div className="text-dark font-medium group-hover:text-orange transition-colors">{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Working hours */}
                <div className="bg-light border border-light-secondary p-6 mb-6">
                  <p className="text-dark/40 text-xs font-bold uppercase tracking-wider mb-4">Часы работы</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-dark/70">Пн — Пт</span>
                      <span className="text-dark font-medium">9:00 — 20:00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-dark/70">Сб — Вс</span>
                      <span className="text-dark font-medium">По договорённости</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-dark/70">Экстренные запросы</span>
                      <span className="text-orange font-medium">24/7</span>
                    </div>
                  </div>
                </div>

                {/* Messengers */}
                <div>
                  <p className="text-dark/40 text-xs font-bold uppercase tracking-wider mb-4">Мессенджеры</p>
                  <div className="flex gap-3">
                    <a href="https://t.me/kailaslab" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-dark-secondary text-white text-sm font-medium px-5 py-3 hover:bg-dark-card transition-colors">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                      </svg>
                      Telegram
                    </a>
                    <a href="https://wa.me/74950000000" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-dark-secondary text-white text-sm font-medium px-5 py-3 hover:bg-dark-card transition-colors">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="relative">
        {/* Address bar over the map */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-dark-secondary/90 backdrop-blur-sm border-b border-dark-muted/30">
          <div className="container-xl py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white/40 text-xs">Адрес офиса</p>
                <p className="text-white text-sm font-medium">Москва, ул. Тверская, 1</p>
              </div>
            </div>
            <a
              href="https://yandex.ru/maps/?text=Москва+Тверская+1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-orange text-xs font-semibold hover:text-orange/80 transition-colors whitespace-nowrap"
            >
              Открыть в Яндекс.Картах
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Yandex Maps iframe */}
        <div className="w-full h-[480px] relative overflow-hidden">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=37.608699%2C55.763565&z=15&pt=37.608699%2C55.763565%2Cpm2rdm&lang=ru_RU"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title="Kailas-lab на карте"
            className="absolute inset-0"
            style={{ filter: 'saturate(0.7) brightness(0.85)' }}
          />
          {/* Orange pin accent overlay at top */}
          <div className="absolute inset-x-0 top-0 h-14 pointer-events-none" />
        </div>
      </section>
    </div>
  )
}
