'use client'

import { useEffect, useRef } from 'react'
import { Truck, Recycle, Scissors, ShoppingBag } from 'lucide-react'

const steps = [
  {
    icon: Truck,
    title: 'Coleta',
    description:
      'Coletamos fantasias, alegorias e materiais têxteis empresariais.',
  },
  {
    icon: Recycle,
    title: 'Curadoria',
    description:
      'Os tecidos passam por triagem, limpeza e preparação para revenda em ótimas condições.',
  },
  {
    icon: Scissors,
    title: 'Classificação',
    description:
      'Separamos por tipo de tecido, cor e composição para facilitar a escolha dos nossos clientes.',
  },
  {
    icon: ShoppingBag,
    title: 'Venda por m²',
    description:
      'Voce compra a quantidade que precisa por metro quadrado, com opção de comprar por quilo.',
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = el.querySelectorAll('[data-step]')
            cards.forEach((card, i) => {
              const htmlCard = card as HTMLElement
              setTimeout(() => {
                htmlCard.style.transition =
                  'opacity 0.6s ease, transform 0.6s ease'
                htmlCard.style.opacity = '1'
                htmlCard.style.transform = 'translateY(0)'
              }, 150 * i)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="py-24 md:py-32 px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-mono font-bold uppercase tracking-widest text-secondary mb-3">
            Processo
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            Como funciona
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Do descarte a criação, nosso processo e simples e transparente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.title}
              data-step
              className="relative flex flex-col items-start p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              <span className="text-xs font-mono text-secondary font-bold mb-4">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-5">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
