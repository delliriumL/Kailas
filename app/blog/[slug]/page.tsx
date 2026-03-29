import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs'
import FadeIn from '@/components/FadeIn'
import CTASection from '@/components/CTASection'
import InnerHero from '@/components/InnerHero'
import { getBlogPost, blogPosts } from '@/lib/blogData'
import { blogPosts as blogPostsWithCovers } from '@/lib/data'

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

interface Props {
  params: { slug: string }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const related = blogPosts.filter(p => p.slug !== params.slug).slice(0, 3)

  const coverImage =
    blogPostsWithCovers.find((b) => b.slug === params.slug)?.image ?? '/images/cases/case-1.jpg'

  const heroBg =
    params.slug.length % 2 === 0 ? '/images/hero-inner-b.jpg' : '/images/hero-inner-a.jpg'

  return (
    <div className="bg-white">
      <InnerHero
        eyebrow={post.category}
        title={post.title}
        subtitle={post.excerpt}
        image={heroBg}
      >
        <div className="flex flex-wrap items-center gap-4 text-white/45 text-sm">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} чтения</span>
          <span>·</span>
          <Link href="/about" className="text-orange hover:underline">
            Мария Рудакова
          </Link>
        </div>
      </InnerHero>

      {/* Article */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main content */}
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="relative aspect-video w-full max-w-3xl mb-10 overflow-hidden rounded-sm bg-dark-secondary">
                  <Image
                    src={coverImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                </div>
                <div
                  className="prose prose-lg prose-headings:font-bold prose-headings:text-dark prose-p:text-dark/70 prose-p:leading-relaxed prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-ul:space-y-2 prose-li:text-dark/70 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .trim()
                      .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
                      .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/^- (.*?)$/gm, '<li>$1</li>')
                      .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
                      .replace(/\n\n/g, '</p><p>')
                      .replace(/^(?!<[h|u|l])(.*)/gm, (match) => 
                        match.trim() && !match.startsWith('<') ? `<p>${match}</p>` : match
                      ),
                  }}
                />
              </FadeIn>

              {/* Author block */}
              <FadeIn delay={0.2} className="mt-16 border-t border-light-secondary pt-10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-dark-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-orange font-bold text-xl">МР</span>
                  </div>
                  <div>
                    <div className="text-dark font-bold mb-1">Мария Рудакова</div>
                    <div className="text-dark/50 text-sm mb-3">Кризисный юрист, основатель Kailas-lab</div>
                    <p className="text-dark/60 text-sm leading-relaxed">
                      15+ лет в антикризисном праве, налоговом консалтинге и банкротных делах. Автор методологии «Антикризисный алгоритм».
                    </p>
                    <Link href="/about" className="inline-flex items-center gap-1.5 text-orange text-sm font-semibold mt-3 hover:gap-2.5 transition-all">
                      О практике
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* CTA card */}
                <FadeIn delay={0.1}>
                  <div className="bg-dark-secondary p-8">
                    <p className="text-orange text-xs font-bold uppercase tracking-wider mb-3">Нужна консультация?</p>
                    <h3 className="text-white font-bold text-lg mb-4">Обсудим вашу ситуацию</h3>
                    <p className="text-white/50 text-sm mb-6">Экстренная диагностика за 60–90 минут. Карта рисков, план действий.</p>
                    <Link href="/contacts" className="btn-primary w-full justify-center text-sm py-3">
                      Записаться
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </FadeIn>

                {/* Related posts */}
                <FadeIn delay={0.2}>
                  <div className="border border-light-secondary p-6">
                    <p className="text-dark/40 text-xs font-bold uppercase tracking-wider mb-4">Читайте также</p>
                    <div className="space-y-4">
                      {related.map((p) => {
                        const thumb =
                          blogPostsWithCovers.find((b) => b.slug === p.slug)?.image ??
                          '/images/cases/case-1.jpg'
                        return (
                          <Link
                            key={p.slug}
                            href={`/blog/${p.slug}`}
                            className="flex gap-3 group"
                          >
                            <div className="relative w-[72px] h-[52px] flex-shrink-0 overflow-hidden bg-dark-secondary">
                              <Image
                                src={thumb}
                                alt=""
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="72px"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="inline-block bg-orange/10 text-orange text-xs px-2 py-0.5 mb-1">
                                {p.category}
                              </div>
                              <p className="text-dark text-sm font-medium group-hover:text-orange transition-colors leading-snug">
                                {p.title}
                              </p>
                              <p className="text-dark/40 text-xs mt-1">{p.readTime} чтения</p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </FadeIn>

                {/* Calculator */}
                <FadeIn delay={0.3}>
                  <div className="bg-orange p-6">
                    <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Инструмент</p>
                    <h3 className="text-white font-bold text-lg mb-3">Оцените стоимость</h3>
                    <p className="text-white/70 text-sm mb-4">Пройдите калькулятор и получите ориентировочный бюджет.</p>
                    <Link href="/calculator" className="btn-outline text-sm py-2.5 px-5 w-full justify-center">
                      Калькулятор →
                    </Link>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Остались вопросы?"
        subtitle="Запишитесь на консультацию — разберём вашу ситуацию и дадим конкретный план."
        primaryLabel="Обсудить задачу"
        primaryHref="/contacts"
        secondaryLabel="Все статьи →"
        secondaryHref="/blog"
      />
    </div>
  )
}
