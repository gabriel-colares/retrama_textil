'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useToast } from '@/hooks/use-toast'

export default function ParceirosPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    empresa: '',
    cnpj: '',
    responsavel: '',
    cargo: '',
    email: '',
    telefone: '',
    setor: '',
    volumeResiduos: '',
    tipoResiduos: '',
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
      title: 'Solicitacao enviada com sucesso!',
      description:
        'Obrigado pelo interesse em se tornar parceiro. Nossa equipe entrara em contato em breve.',
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
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Torne-se um Parceiro
              </h1>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Preencha o formulario abaixo para que sua empresa faca parte do
              projeto RETRAMA e contribua para a economia circular na Amazonia.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-8 rounded-2xl border border-border bg-card"
          >
            <div className="space-y-2">
              <label
                htmlFor="empresa"
                className="text-sm font-medium text-foreground"
              >
                Nome da empresa *
              </label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                required
                value={formData.empresa}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Nome da sua empresa"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="cnpj"
                className="text-sm font-medium text-foreground"
              >
                CNPJ *
              </label>
              <input
                type="text"
                id="cnpj"
                name="cnpj"
                required
                value={formData.cnpj}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="00.000.000/0000-00"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="responsavel"
                  className="text-sm font-medium text-foreground"
                >
                  Responsavel *
                </label>
                <input
                  type="text"
                  id="responsavel"
                  name="responsavel"
                  required
                  value={formData.responsavel}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Nome completo"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="cargo"
                  className="text-sm font-medium text-foreground"
                >
                  Cargo *
                </label>
                <input
                  type="text"
                  id="cargo"
                  name="cargo"
                  required
                  value={formData.cargo}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Seu cargo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email corporativo *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="contato@empresa.com"
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
                  placeholder="(92) 3000-0000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="setor"
                className="text-sm font-medium text-foreground"
              >
                Setor de atuacao *
              </label>
              <select
                id="setor"
                name="setor"
                required
                value={formData.setor}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="">Selecione o setor</option>
                <option value="textil">Industria Textil</option>
                <option value="confeccao">Confeccao</option>
                <option value="eventos">Eventos e Entretenimento</option>
                <option value="hospitalar">Hospitalar</option>
                <option value="hotelaria">Hotelaria</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="volumeResiduos"
                className="text-sm font-medium text-foreground"
              >
                Volume estimado de residuos (kg/mes) *
              </label>
              <select
                id="volumeResiduos"
                name="volumeResiduos"
                required
                value={formData.volumeResiduos}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                <option value="">Selecione o volume</option>
                <option value="0-50">Ate 50 kg</option>
                <option value="50-200">50 - 200 kg</option>
                <option value="200-500">200 - 500 kg</option>
                <option value="500+">Acima de 500 kg</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="tipoResiduos"
                className="text-sm font-medium text-foreground"
              >
                Tipo de residuos texteis
              </label>
              <textarea
                id="tipoResiduos"
                name="tipoResiduos"
                value={formData.tipoResiduos}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="Descreva os tipos de tecidos e materiais (ex: algodao, poliester, uniformes, retalhos, etc)"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="mensagem"
                className="text-sm font-medium text-foreground"
              >
                Mensagem adicional
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="Conte-nos mais sobre sua empresa e interesse na parceria"
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
                    Enviar Solicitacao
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
