/** Декодирует типичные HTML-сущности в обычный текст (браузер и Node). */
const NAMED: Record<string, string> = {
  amp: '&',
  apos: "'",
  lt: '<',
  gt: '>',
  quot: '"',
  nbsp: '\u00a0',
  hellip: '…',
  mdash: '—',
  ndash: '–',
}

export function decodeHtmlEntitiesLite(str: string): string {
  if (!str) return ''
  return str.replace(/&(#(?:x[\da-fA-F]+|\d+)|\w+);/g, (full, inner: string) => {
    if (inner[0] === '#') {
      const cp =
        inner[1] === 'x'
          ? parseInt(inner.slice(2), 16)
          : parseInt(inner.slice(1), 10)
      if (!Number.isFinite(cp) || cp < 0) return full
      try {
        return String.fromCodePoint(cp)
      } catch {
        return full
      }
    }
    const dec = NAMED[inner.toLowerCase()]
    return dec !== undefined ? dec : full
  })
}
