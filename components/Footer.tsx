'use client'

import { useState } from 'react'
import Link from 'next/link'

const footerLinks = [
  {
    title: 'Услуги',
    links: [
      { label: 'Антикризисное управление', href: '/services/crisis-management' },
      { label: 'Налоговый консалтинг', href: '/services/tax-security' },
      { label: 'Переговоры и медиация', href: '/services/negotiation-mediation' },
      { label: 'Экспертизы и оценка', href: '/services/expertise-evaluation' },
      { label: 'M&A и структурирование', href: '/services/ma-structuring' },
      { label: 'AI-автоматизация', href: '/services/ai-automation' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { label: 'О нас', href: '/about' },
      { label: 'Кейсы', href: '/cases' },
      { label: 'Блог', href: '/blog' },
      { label: 'Калькулятор', href: '/calculator' },
      { label: 'Контакты', href: '/contacts' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="bg-surface-deep border-t border-ink/20">
      {/* Main footer content */}
      <div className="container-xl py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                <div className="w-2.5 h-8 bg-orange transform -skew-x-6" />
                <div className="w-2.5 h-8 bg-orange/70 transform -skew-x-6 -ml-0.5" />
                <div className="w-2.5 h-8 bg-orange/40 transform -skew-x-6 -ml-0.5" />
              </div>
              <span className="text-white font-bold text-lg tracking-wide">KAILAS-LAB</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Антикризисная юридическая практика на стыке права, налогов и технологий. Москва.
            </p>
            <div className="space-y-2">
              <a href="tel:+74950000000" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
                <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +7 (495) 000-00-00
              </a>
              <a href="mailto:info@kailas-lab.ru" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
                <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@kailas-lab.ru
              </a>
            </div>
            {/* Social links */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://t.me/kailaslab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-dark-muted hover:bg-orange flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-dark-muted hover:bg-orange flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-2">Оставайтесь в курсе</h4>
            <p className="text-slate-400 text-sm mb-5">
              Новости налогового права, банкротства и AI-технологий — на вашу почту.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                className="w-full bg-dark-muted border border-ink/25 text-white text-sm px-4 py-3 placeholder:text-white/30 focus:outline-none focus:border-orange transition-colors"
              />
              <button className="btn-primary justify-center text-sm py-3">
                Подписаться
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Locations bar */}
      <div className="border-t border-ink/15">
        <div className="container-xl py-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Москва</span>
            <span className="text-slate-500 text-xs">·</span>
            <span className="text-slate-500 text-xs">Санкт-Петербург</span>
            <span className="text-slate-500 text-xs">·</span>
            <span className="text-slate-500 text-xs">Екатеринбург</span>
            <span className="text-slate-500 text-xs">·</span>
            <span className="text-slate-500 text-xs">Новосибирск</span>
            <span className="text-slate-500 text-xs">·</span>
            <span className="text-slate-500 text-xs">Дистанционно по всей России</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink/15">
        <div className="container-xl py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs">© 2026 Kailas-lab. Все права защищены.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Политика конфиденциальности</Link>
              <Link href="/contacts" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Контакты</Link>
              <Link href="/contacts" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Поддержка</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
