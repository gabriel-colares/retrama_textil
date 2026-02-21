'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="sobre"
      className="py-24 md:py-32 px-6"
      style={{ opacity: 0, transform: 'translateY(30px)' }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 mb-6">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-secondary">
            IA Integrada
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
          Nao sabe o que criar?{' '}
          <span className="text-secondary">Nossa IA te ajuda.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Ao visualizar qualquer tecido, nossa inteligencia artificial sugere
          projetos e cria imagens do que voce pode fazer. Transforme inspiracao
          em acao.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/catalogo">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 h-12 gap-2"
            >
              Experimentar Agora
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
