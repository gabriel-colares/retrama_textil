'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  Sparkles,
  Loader2,
  ImageIcon,
  ChevronDown,
  ChevronUp,
  Gauge,
  Weight,
  Wand2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { Product } from '@/lib/products'

interface Suggestion {
  title: string
  description: string
  difficulty: string
  estimatedFabric: string
  imagePrompt: string
}

type LoadingStage =
  | 'uploading'
  | 'analyzing'
  | 'composing'
  | 'rendering'
  | 'finishing'

export function AIInspiration({ product }: { product: Product }) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({})
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({})
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [hasGenerated, setHasGenerated] = useState(false)

  // ✅ preview temporário durante geração (mostra tecido com blur/shimmer)
  const [workingPreview, setWorkingPreview] = useState<Record<number, string>>({})
  const [loadingStage, setLoadingStage] = useState<Record<number, LoadingStage>>({})
  const [progress, setProgress] = useState<Record<number, number>>({})

  async function handleGenerateSuggestions() {
    setLoading(true)
    setHasGenerated(true)

    try {
      const res = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fabricName: product.name,
          fabricDescription: product.description,
          fabricComposition: product.composition,
          fabricColors: product.colors.join(', '),
        }),
      })

      const data = await res.json()
      setSuggestions(data.suggestions || [])
    } catch {
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }

  async function handleGenerateImage(index: number, prompt: string) {
    setLoadingImages((prev) => ({ ...prev, [index]: true }))
    setLoadingStage((prev) => ({ ...prev, [index]: 'uploading' }))
    setProgress((prev) => ({ ...prev, [index]: 5 }))

    let stageTimer: ReturnType<typeof setInterval> | null = null
    let progressTimer: ReturnType<typeof setInterval> | null = null
    let objectUrlToRevoke: string | null = null

    try {
      /**
       * 1) Baixa a foto do tecido/produto exibida no card
       * 2) Converte para File
       * 3) Envia via FormData para /api/ai-image
       */
      const imageRes = await fetch(product.image)
      if (!imageRes.ok) throw new Error('Falha ao baixar imagem do produto')

      const blob = await imageRes.blob()

      // ✅ cria preview local para efeito "IA trabalhando"
      objectUrlToRevoke = URL.createObjectURL(blob)
      setWorkingPreview((prev) => ({ ...prev, [index]: objectUrlToRevoke! }))

      const extension =
        blob.type === 'image/png'
          ? 'png'
          : blob.type === 'image/webp'
            ? 'webp'
            : 'jpg'

      const file = new File([blob], `fabric.${extension}`, {
        type: blob.type || 'image/jpeg',
      })

      // ✅ anima estágio/status (fake progress estilo Gemini/ChatGPT)
      const stages: LoadingStage[] = [
        'uploading',
        'analyzing',
        'composing',
        'rendering',
        'finishing',
      ]
      let stageIndex = 0

      stageTimer = setInterval(() => {
        stageIndex = Math.min(stageIndex + 1, stages.length - 1)
        setLoadingStage((prev) => ({ ...prev, [index]: stages[stageIndex] }))
      }, 1200)

      progressTimer = setInterval(() => {
        setProgress((prev) => {
          const current = prev[index] ?? 0
          // sobe devagar até 92%, e fecha em 100% quando resposta chega
          const next = current < 70 ? current + 8 : current < 92 ? current + 2 : current
          return { ...prev, [index]: Math.min(next, 92) }
        })
      }, 450)

      const formData = new FormData()
      formData.append('fabricImage', file)
      formData.append('productPrompt', prompt)

      const res = await fetch('/api/ai-image', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Erro ao gerar imagem')
      }

      if (data.imageUrl) {
        setProgress((prev) => ({ ...prev, [index]: 100 }))
        setLoadingStage((prev) => ({ ...prev, [index]: 'finishing' }))

        // pequeno delay para dar sensação de finalização
        await new Promise((resolve) => setTimeout(resolve, 450))

        setGeneratedImages((prev) => ({
          ...prev,
          [index]: data.imageUrl, // ✅ já vem em data:image/png;base64,...
        }))
      }
    } catch (err) {
      console.error(err)
    } finally {
      if (stageTimer) clearInterval(stageTimer)
      if (progressTimer) clearInterval(progressTimer)

      setLoadingImages((prev) => ({ ...prev, [index]: false }))
      setLoadingStage((prev) => {
        const next = { ...prev }
        delete next[index]
        return next
      })
      setProgress((prev) => {
        const next = { ...prev }
        delete next[index]
        return next
      })

      // mantém preview por mais um instante para transição suave
      setTimeout(() => {
        setWorkingPreview((prev) => {
          const next = { ...prev }
          const url = next[index]
          delete next[index]
          if (url && url.startsWith('blob:')) {
            URL.revokeObjectURL(url)
          }
          return next
        })
      }, 700)

      // fallback caso a URL local esteja guardada
      if (objectUrlToRevoke) {
        // revogação real é feita acima, depois da transição
      }
    }
  }

  const difficultyColor = (d: string) => {
    if (d.toLowerCase().includes('facil')) return 'bg-green-100 text-green-800'
    if (d.toLowerCase().includes('medio')) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const stageLabel = (stage?: LoadingStage) => {
    switch (stage) {
      case 'uploading':
        return 'Enviando referencia'
      case 'analyzing':
        return 'Analisando textura e padrao'
      case 'composing':
        return 'Compondo produto com o tecido'
      case 'rendering':
        return 'Renderizando detalhes'
      case 'finishing':
        return 'Finalizando imagem'
      default:
        return 'Gerando imagem com IA'
    }
  }

  return (
    <div className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10">
          <Sparkles className="h-5 w-5 text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">
            O que posso criar com esse tecido?
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Nossa IA analisa o tecido e sugere projetos criativos com imagens
            geradas.
          </p>
        </div>
      </div>

      {!hasGenerated && (
        <Button
          onClick={handleGenerateSuggestions}
          disabled={loading}
          className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          Gerar Sugestoes com IA
        </Button>
      )}

      {loading && (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border border-border p-5">
              <Skeleton className="mb-3 h-5 w-3/4" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-4 h-4 w-2/3" />
              <Skeleton className="h-8 w-32" />
            </div>
          ))}
        </div>
      )}

      {!loading && suggestions.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {suggestions.map((s, i) => {
            const isGenerating = !!loadingImages[i]
            const hasFinalImage = !!generatedImages[i]
            const hasWorkingPreview = !!workingPreview[i]
            const pct = progress[i] ?? 0
            const currentStage = loadingStage[i]

            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-md"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h4 className="text-base font-bold text-foreground">{s.title}</h4>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${difficultyColor(
                      s.difficulty
                    )}`}
                  >
                    {s.difficulty}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Weight className="h-3 w-3" />
                    {s.estimatedFabric}
                  </span>
                  <span className="flex items-center gap-1">
                    <Gauge className="h-3 w-3" />
                    {s.difficulty}
                  </span>
                </div>

                <div className="mt-4">
                  {!hasFinalImage && !isGenerating && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleGenerateImage(i, s.imagePrompt)}
                      className="gap-2 text-xs"
                    >
                      <ImageIcon className="h-3.5 w-3.5" />
                      Gerar Imagem
                    </Button>
                  )}

                  {/* ✅ Efeito IA trabalhando */}
                  {isGenerating && (
                    <div className="mt-2 overflow-hidden rounded-lg border border-border">
                      <div className="relative aspect-square w-full bg-muted">
                        {/* preview base (tecido) */}
                        {hasWorkingPreview ? (
                          <Image
                            src={workingPreview[i]}
                            alt={`Gerando ${s.title}`}
                            fill
                            unoptimized
                            className="object-cover scale-105 blur-md opacity-80"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                          </div>
                        )}

                        {/* camada de escurecimento */}
                        <div className="absolute inset-0 bg-background/35" />

                        {/* grid sutil (cara de processamento) */}
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage:
                              'linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)',
                            backgroundSize: '22px 22px',
                          }}
                        />

                        {/* shimmer animado */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute inset-y-0 -left-1/2 w-1/2 animate-[ai-scan_1.8s_linear_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-xl" />
                        </div>

                        {/* glow pulsante */}
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-tr from-secondary/10 via-transparent to-primary/10" />

                        {/* conteúdo central */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-black/30 backdrop-blur-md">
                            <Wand2 className="h-5 w-5 animate-pulse text-white" />
                          </div>

                          <p className="text-sm font-semibold text-white drop-shadow">
                            IA criando imagem
                          </p>
                          <p className="mt-1 text-xs text-white/85">
                            {stageLabel(currentStage)}
                          </p>

                          <div className="mt-4 w-full max-w-[220px]">
                            <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                              <div
                                className="h-full rounded-full bg-white transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <p className="mt-1 text-[10px] text-white/80">
                              {Math.round(pct)}%
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 border-t border-border/70 bg-background px-3 py-2 text-xs text-muted-foreground">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Processando textura e gerando composicao...
                      </div>
                    </div>
                  )}

                  {/* ✅ imagem final com transição suave */}
                  {hasFinalImage && (
                    <div className="mt-2 overflow-hidden rounded-lg border border-border">
                      <div className="relative">
                        <Image
                          src={generatedImages[i]}
                          alt={s.title}
                          width={400}
                          height={400}
                          className="aspect-square w-full object-cover animate-in fade-in duration-500"
                          unoptimized
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                  className="mt-3 flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                >
                  {expandedCard === i ? (
                    <>
                      Menos detalhes <ChevronUp className="h-3 w-3" />
                    </>
                  ) : (
                    <>
                      Mais detalhes <ChevronDown className="h-3 w-3" />
                    </>
                  )}
                </button>

                {expandedCard === i && (
                  <div className="animate-in slide-in-from-top-1 mt-3 border-t border-border pt-3 text-xs text-muted-foreground duration-200">
                    <p>
                      <strong className="text-foreground">Tecido ideal:</strong>{' '}
                      {product.name}
                    </p>
                    <p className="mt-1">
                      <strong className="text-foreground">Composicao:</strong>{' '}
                      {product.composition}
                    </p>
                    <p className="mt-1">
                      <strong className="text-foreground">Cores disponiveis:</strong>{' '}
                      {product.colors.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {hasGenerated && !loading && suggestions.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Button
            variant="ghost"
            onClick={handleGenerateSuggestions}
            className="gap-2 text-primary"
          >
            <Sparkles className="h-4 w-4" />
            Gerar novas sugestoes
          </Button>
        </div>
      )}

      {/* ✅ keyframes locais (sem mexer no tailwind.config) */}
      <style jsx>{`
        @keyframes ai-scan {
          0% {
            transform: translateX(-20%);
          }
          100% {
            transform: translateX(260%);
          }
        }
      `}</style>
    </div>
  )
}