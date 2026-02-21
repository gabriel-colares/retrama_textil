'use client'

import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { products, getUnitLabel, pricePerUnit } from '@/lib/products'
import { useUnitPreference } from '@/hooks/use-unit-preference'

export function FeaturedProducts() {
  const { unit } = useUnitPreference()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const cards = Array.from(
      el.querySelectorAll<HTMLElement>('[data-product="true"]')
    )

    // Estado inicial (caso o style inline não aplique por algum motivo)
    cards.forEach((card) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(24px)'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          cards.forEach((card, i) => {
            window.setTimeout(() => {
              card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
              card.style.opacity = '1'
              card.style.transform = 'translateY(0)'
            }, 100 * i)
          })

          observer.disconnect()
        })
      },
      { threshold: 0.12 }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  const featured = useMemo(() => products.slice(0, 4), [])

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  return (
    <section ref={sectionRef} className="bg-muted/50 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-mono font-bold uppercase tracking-widest text-secondary">
              Destaques
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Tecidos em destaque
            </h2>
          </div>

          <Link href="/catalogo">
            <Button
              type="button"
              variant="ghost"
              className="gap-2 text-primary hover:text-primary/80"
            >
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => {
            const unitPrice = pricePerUnit(product, unit)

            return (
              <Link
                key={product.id}
                href={`/produto/${product.slug}`}
                data-product="true"
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
                style={{ opacity: 0, transform: 'translateY(24px)' }}
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <Badge className="bg-primary/90 text-xs text-primary-foreground backdrop-blur-sm">
                      {product.origin}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-background/80 text-[10px] backdrop-blur-sm"
                    >
                      {product.gsm} gsm
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-2 text-base font-bold text-foreground transition-colors group-hover:text-primary">
                    {product.name}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {product.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] capitalize"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="mb-2 flex items-end justify-between">
                      <div>
                        <p className="text-xl font-bold text-foreground">
                          {formatPrice(unitPrice)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          por {getUnitLabel(unit)}
                        </p>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary transition-transform group-hover:scale-110">
                        <ArrowRight className="h-4 w-4 text-secondary-foreground" />
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Mínimo: {product.minKg} kg
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}