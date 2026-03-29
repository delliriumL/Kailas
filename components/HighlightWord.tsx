import type { ReactNode } from 'react'

/** Слова в заголовках: белый текст на Forest Teal (ключ `orange` в Tailwind). */
export function HighlightWord({ children }: { children: ReactNode }) {
  return (
    <span className="mx-0.5 inline-block bg-orange px-2 py-0.5 align-baseline text-white">
      {children}
    </span>
  )
}
