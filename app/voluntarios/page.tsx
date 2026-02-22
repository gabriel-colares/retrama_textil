'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useToast } from '@/hooks/use-toast'

export default function VoluntariosPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    area: '',
    experiencia: '',
    disponibilidade: '',
    mensagem: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: 'Inscricao enviada com sucesso!',
      description:
        'Obrigado pelo seu interesse. Entraremos em contato em breve.',
      duration: 5000,
    })

    setIsSubmitting(false)

    // Redirecionar para home após 1 segundo
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  return (
    <main>
      <Navbar />

      <div className="py-16 md:py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para home
          </Link>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Seja um Voluntario
              </h1>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Preencha o formulario abaixo e faca parte do time RETRAMA. Vamos
              juntos transformar a moda na Amazonia.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-8 rounded-2xl border border-border bg-card"
          >
            <div className="space-y-2">
              <label
                htmlFor="nome"
                className="text-sm font-medium text-foreground"
              >
                Nome completo *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Seu nome"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="telefone"
                  className="text-sm font-medium text-foreground"
                >
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  required
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="(92) 99999-9999"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="area"
                className="text-sm font-medium text-foreground"
              >
                Area de interesse *
              </label>
              <select
                id="area"
                name="area"
                required
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="">Selecione uma area</option>
                <option value="design">Design e Criacao</option>
                <option value="comunicacao">Comunicacao e Redes</option>
                <option value="operacoes">Operacoes e Logistica</option>
                <option value="educacao">Educacao e Oficinas</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="experiencia"
                className="text-sm font-medium text-foreground"
              >
                Experiencia relevante
              </label>
              <textarea
                id="experiencia"
                name="experiencia"
                value={formData.experiencia}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="Conte um pouco sobre sua experiencia na area escolhida"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="disponibilidade"
                className="text-sm font-medium text-foreground"
              >
                Disponibilidade *
              </label>
              <select
                id="disponibilidade"
                name="disponibilidade"
                required
                value={formData.disponibilidade}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="">Selecione sua disponibilidade</option>
                <option value="integral">Tempo integral</option>
                <option value="parcial">Meio periodo</option>
                <option value="final-semana">Finais de semana</option>
                <option value="pontual">Projetos pontuais</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="mensagem"
                className="text-sm font-medium text-foreground"
              >
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="Conte-nos por que quer fazer parte do RETRAMA"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 gap-2 text-base"
              >
                {isSubmitting ? (
                  'Enviando...'
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Inscricao
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  )
}
