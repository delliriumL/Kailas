import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-2 mb-8">
      <Link href="/" className="breadcrumb-link">Главная</Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="text-white/20">/</span>
          {crumb.href ? (
            <Link href={crumb.href} className="breadcrumb-link">{crumb.label}</Link>
          ) : (
            <span className="text-white/70 text-sm">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
