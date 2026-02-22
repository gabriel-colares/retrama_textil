'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Recycle, Leaf, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const children = el.querySelectorAll('[data-animate]')
    children.forEach((child, i) => {
      const htmlChild = child as HTMLElement
      htmlChild.style.opacity = '0'
      htmlChild.style.transform = 'translateY(30px)'
      setTimeout(() => {
        htmlChild.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
        htmlChild.style.opacity = '1'
        htmlChild.style.transform = 'translateY(0)'
      }, 150 * i)
    })
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden py-18"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-textiles.jpg"
          alt="Tecidos reaproveitados coloridos"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 md:py-40 w-full">
        <div className="max-w-2xl">
          <div data-animate className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm border border-secondary/30">
              <Recycle className="w-4 h-4" />
              Moda Circular e Sustentavel
            </span>
          </div>

          <h1
            data-animate
            className="text-4xl md:text-6xl font-bold tracking-tight text-primary-foreground leading-[1.1] text-balance"
          >
            Tecidos reaproveitados para criar{' '}
            <span className="text-secondary">sem limites</span>
          </h1>

          <p
            data-animate
            className="mt-6 text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-lg"
          >
            Transformamos fantasias, alegorias e materiais têxteis empresariais em
            materia-prima para artesãos, costureiras e pequenos negócios.
          </p>

          <div data-animate className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/catalogo">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base px-8 h-12 gap-2"
              >
                Explorar Catálogo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#como-funciona">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 h-12"
              >
                Como Funciona
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
