'use client'

import { useEffect, useRef } from 'react'
import { Building2, Handshake, Leaf, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = [
  {
    icon: Leaf,
    title: 'Responsabilidade Ambiental',
    description:
      'Destine seus residuos texteis de forma sustentavel e reduza o impacto ambiental da sua empresa.',
  },
  {
    icon: Handshake,
    title: 'Impacto Social',
    description:
      'Contribua para a geracao de renda de artesaos e costureiras da regiao amazonica.',
  },
  {
    icon: Building2,
    title: 'Selo de Parceiro',
    description:
      'Receba o selo RETRAMA de parceiro sustentavel e fortaleça a imagem da sua marca.',
  },
]

export function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = el.querySelectorAll('[data-partner]')
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
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="empresas"
      className="py-24 md:py-32 px-6 bg-primary"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-mono font-bold uppercase tracking-widest text-secondary mb-3">
            Parcerias
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary-foreground text-balance">
            Sua empresa pode fazer parte
          </h2>
          <p className="mt-4 text-primary-foreground/70 text-lg leading-relaxed">
            Empresas que geram residuos texteis podem doar materiais e se tornar
            parceiras do projeto RETRAMA, contribuindo para a economia circular
            na Amazonia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              data-partner
              className="relative flex flex-col items-start p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/20 mb-5">
                <benefit.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-primary-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-primary-foreground/60 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/parceiros">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base px-8 h-12 gap-2"
            >
              Quero ser Parceiro
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
          <p className="mt-4 text-xs text-primary-foreground/40">
            Preencha o formulario e torne-se um parceiro RETRAMA.
          </p>
        </div>
      </div>
    </section>
  )
}
