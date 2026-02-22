'use client'

import { useEffect, useRef } from 'react'
import { Heart, Users, Paintbrush, Megaphone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const roles = [
  {
    icon: Paintbrush,
    title: 'Design e Criacao',
    description:
      'Ajude a criar novos produtos e a desenvolver padroes e combinacoes com os tecidos reaproveitados.',
  },
  {
    icon: Megaphone,
    title: 'Comunicacao e Redes',
    description:
      'Contribua com a divulgacao do projeto, producao de conteudo e gestao das redes sociais.',
  },
  {
    icon: Users,
    title: 'Operacoes e Logistica',
    description:
      'Participe da triagem, classificacao e preparacao dos materiais texteis para venda.',
  },
  {
    icon: Heart,
    title: 'Educacao e Oficinas',
    description:
      'Ensine tecnicas de costura, artesanato e reaproveitamento em oficinas comunitarias.',
  },
]

export function VolunteersSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = el.querySelectorAll('[data-role]')
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
      id="voluntarios"
      className="py-24 md:py-32 px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-mono font-bold uppercase tracking-widest text-secondary mb-3">
            Voluntariado
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            Faca parte da mudanca
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            O projeto RETRAMA e feito por pessoas. Se voce acredita na moda
            sustentavel e quer contribuir com suas habilidades, temos um lugar
            para voce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, i) => (
            <div
              key={role.title}
              data-role
              className="relative flex flex-col items-start p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              <span className="text-xs font-mono text-secondary font-bold mb-4">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-5">
                <role.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {role.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {role.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://wa.me/5592992214370?text=Olá! Tenho interesse em ser voluntário(a) no projeto RETRAMA."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 h-12 gap-2"
            >
              Quero ser Voluntario
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
          <p className="mt-4 text-xs text-muted-foreground">
            Envie uma mensagem pelo WhatsApp e junte-se ao time RETRAMA.
          </p>
        </div>
      </div>
    </section>
  )
}
