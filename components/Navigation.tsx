'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const menuData = {
  services: {
    main: [
      { label: 'Антикризисное управление', href: '/services/crisis-management', desc: 'Банкротство, субсидиарка, долги' },
      { label: 'Налоговый консалтинг', href: '/services/tax-security', desc: 'ВНП, доначисления, ФНС' },
      { label: 'Переговоры и медиация', href: '/services/negotiation-mediation', desc: 'Урегулирование конфликтов' },
    ],
    special: [
      { label: 'Экспертизы и оценка', href: '/services/expertise-evaluation', desc: 'Судебные и досудебные экспертизы' },
      { label: 'M&A и структурирование', href: '/services/ma-structuring', desc: 'Сделки, due diligence, реструктуризация' },
      { label: 'AI-автоматизация', href: '/services/ai-automation', desc: 'Цифровизация юридических процессов' },
    ],
    company: [
      { label: 'О нас', href: '/about' },
      { label: 'Кейсы', href: '/cases' },
      { label: 'Блог', href: '/blog' },
      { label: 'Калькулятор', href: '/calculator' },
      { label: 'Контакты', href: '/contacts' },
    ],
  },
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-surface-deep/95 backdrop-blur-sm shadow-lg border-b border-white/5' : 'bg-surface-deep'
      }`}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex gap-0.5">
              <div className="w-2.5 h-8 bg-orange transform -skew-x-6" />
              <div className="w-2.5 h-8 bg-orange/70 transform -skew-x-6 -ml-0.5" />
              <div className="w-2.5 h-8 bg-orange/40 transform -skew-x-6 -ml-0.5" />
            </div>
            <span className="text-white font-bold text-lg tracking-wide">KAILAS-LAB</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Services mega-menu trigger */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current)
                setMegaOpen(true)
              }}
              onMouseLeave={() => {
                leaveTimeoutRef.current = setTimeout(() => setMegaOpen(false), 200)
              }}
            >
              <button
                className={`nav-link flex items-center gap-1 ${megaOpen ? 'text-white' : ''}`}
              >
                Услуги
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {megaOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[780px] bg-surface-deep border border-dark-muted shadow-2xl">
                  <div className="grid grid-cols-3 gap-0">
                    {/* Column 1 */}
                    <div className="p-8 border-r border-dark-muted/50">
                      <p className="text-orange text-xs font-bold tracking-widest uppercase mb-5">Основные направления</p>
                      {menuData.services.main.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block group mb-4"
                          onClick={() => setMegaOpen(false)}
                        >
                          <div className="text-white font-medium text-sm group-hover:text-orange transition-colors">{item.label}</div>
                          <div className="text-slate-400 text-xs mt-0.5">{item.desc}</div>
                        </Link>
                      ))}
                    </div>

                    {/* Column 2 */}
                    <div className="p-8 border-r border-dark-muted/50">
                      <p className="text-orange text-xs font-bold tracking-widest uppercase mb-5">Специализация</p>
                      {menuData.services.special.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block group mb-4"
                          onClick={() => setMegaOpen(false)}
                        >
                          <div className="text-white font-medium text-sm group-hover:text-orange transition-colors">{item.label}</div>
                          <div className="text-slate-400 text-xs mt-0.5">{item.desc}</div>
                        </Link>
                      ))}
                    </div>

                    {/* Column 3 */}
                    <div className="p-8">
                      <p className="text-orange text-xs font-bold tracking-widest uppercase mb-5">Компания</p>
                      {menuData.services.company.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block text-white/70 hover:text-white text-sm font-medium mb-3 transition-colors"
                          onClick={() => setMegaOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div className="mt-6 pt-6 border-t border-dark-muted/50">
                        <p className="text-slate-400 text-xs mb-1">Москва, ул. Тверская, 1</p>
                        <p className="text-slate-400 text-xs mb-1">+7 (495) 000-00-00</p>
                        <Link
                          href="/contacts"
                          className="inline-flex items-center gap-1.5 text-orange text-sm font-semibold mt-3 hover:gap-2.5 transition-all"
                          onClick={() => setMegaOpen(false)}
                        >
                          Обсудить задачу
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/cases" className="nav-link">Кейсы</Link>
            <Link href="/blog" className="nav-link">Блог</Link>
            <Link href="/about" className="nav-link">О нас</Link>
            <Link href="/contacts" className="nav-link">Контакты</Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/calculator" className="btn-outline-orange py-2.5 px-5 text-sm">
              Калькулятор
            </Link>
            <Link href="/contacts" className="btn-primary py-2.5 px-5 text-sm">
              Обсудить задачу
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-deep border-t border-dark-muted/50">
          <div className="px-6 py-6 space-y-4">
            {/* Services accordion */}
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex w-full items-center justify-between text-orange text-xs font-bold tracking-widest uppercase"
            >
              Услуги
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileServicesOpen && (
              <div className="pl-3 space-y-2 border-l border-dark-muted/50">
                {[...menuData.services.main, ...menuData.services.special].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-white/70 hover:text-white py-1 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            <div className="border-t border-dark-muted/50 pt-4 space-y-3">
              <Link href="/cases" className="block text-white/80 hover:text-white py-1.5 text-sm" onClick={() => setMobileOpen(false)}>Кейсы</Link>
              <Link href="/blog" className="block text-white/80 hover:text-white py-1.5 text-sm" onClick={() => setMobileOpen(false)}>Блог</Link>
              <Link href="/about" className="block text-white/80 hover:text-white py-1.5 text-sm" onClick={() => setMobileOpen(false)}>О нас</Link>
              <Link href="/contacts" className="block text-white/80 hover:text-white py-1.5 text-sm" onClick={() => setMobileOpen(false)}>Контакты</Link>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <Link href="/calculator" className="btn-outline-orange text-center justify-center" onClick={() => setMobileOpen(false)}>Калькулятор</Link>
              <Link href="/contacts" className="btn-primary justify-center" onClick={() => setMobileOpen(false)}>
                Обсудить задачу
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
