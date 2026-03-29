'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full animate-fade-in-up">
      <div className="bg-dark-secondary border border-dark-muted/40 shadow-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-8 h-8 bg-orange/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <button
            onClick={decline}
            className="text-white/30 hover:text-white/60 transition-colors ml-4 flex-shrink-0"
            aria-label="Закрыть"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-white/70 text-sm leading-relaxed mb-5">
          Мы используем файлы cookie для улучшения работы сайта и анализа трафика.{' '}
          <Link href="/privacy" className="text-orange hover:underline">
            Политика конфиденциальности
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            onClick={accept}
            className="flex-1 bg-orange text-white text-sm font-semibold py-2.5 px-4 hover:bg-orange/90 transition-colors"
          >
            Принять
          </button>
          <button
            onClick={decline}
            className="flex-1 border border-dark-muted/50 text-white/50 text-sm font-medium py-2.5 px-4 hover:border-white/30 hover:text-white/70 transition-colors"
          >
            Отказаться
          </button>
        </div>
      </div>
    </div>
  )
}
