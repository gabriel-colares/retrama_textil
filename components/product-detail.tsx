'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ShoppingBag,
  Minus,
  Plus,
  Tag,
  Layers,
  Palette,
  Package,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AIInspiration } from '@/components/ai-inspiration'
import {
  availableByUnit,
  convertQuantity,
  getUnitLabel,
  minByUnit,
  pricePerUnit,
  type Product,
  type Unit,
} from '@/lib/products'
import { useUnitPreference } from '@/hooks/use-unit-preference'
import { useCart } from '@/hooks/use-cart'

export function ProductDetail({ product }: { product: Product }) {
  const { unit, setUnit } = useUnitPreference()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(() => minByUnit(product, unit))
  const [addedToCart, setAddedToCart] = useState(false)
  const detailRef = useRef<HTMLDivElement>(null)
  const prevUnitRef = useRef<Unit>(unit)

  useEffect(() => {
    const el = detailRef.current
    if (!el) return
    const children = el.querySelectorAll('[data-fade]')
    children.forEach((child, i) => {
      const htmlChild = child as HTMLElement
      htmlChild.style.opacity = '0'
      htmlChild.style.transform = 'translateY(20px)'
      setTimeout(() => {
        htmlChild.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        htmlChild.style.opacity = '1'
        htmlChild.style.transform = 'translateY(0)'
      }, 120 * i)
    })
  }, [])

  useEffect(() => {
    const prev = prevUnitRef.current
    if (prev === unit) return
    prevUnitRef.current = unit
    setQuantity((current) => {
      const next = convertQuantity(product, current, prev, unit)
      const min = minByUnit(product, unit)
      const max = availableByUnit(product, unit)
      return Math.min(max, Math.max(min, next))
    })
  }, [product, unit])

  function handleAddToCart() {
    addItem(product.id, unit, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const min = minByUnit(product, unit)
  const available = availableByUnit(product, unit)
  const step = 0.5
  const otherUnit: Unit = unit === 'kg' ? 'm2' : 'kg'

  return (
    <div ref={detailRef} className="mx-auto max-w-7xl">
      <div data-fade>
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao catalogo
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div data-fade className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
              {product.origin}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col">
          <div data-fade>
            <p className="text-sm font-mono font-bold uppercase tracking-widest text-secondary mb-2">
              {product.category === 'industrial'
                ? 'Fardas Industriais'
                : product.category === 'carnaval'
                  ? 'Carnaval'
                  : product.category === 'eventos'
                    ? 'Eventos Sazonais'
                    : 'Jeans'}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {product.name}
            </h1>
          </div>

          <div data-fade className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">
                R$ {pricePerUnit(product, unit).toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">
                por {getUnitLabel(unit)}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              ou R$ {pricePerUnit(product, otherUnit).toFixed(2)} por{' '}
              {getUnitLabel(otherUnit)}
            </p>
          </div>

          <Separator className="my-6" />

          <div data-fade className="flex">
            <Tabs value={unit} onValueChange={(v) => setUnit(v as Unit)}>
              <TabsList>
                <TabsTrigger value="m2">m²</TabsTrigger>
                <TabsTrigger value="kg">kg</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div data-fade>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div data-fade className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
              <Layers className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Composicao</p>
                <p className="text-sm font-medium text-foreground">
                  {product.composition}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
              <Palette className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Cores</p>
                <p className="text-sm font-medium text-foreground">
                  {product.colors.join(', ')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
              <Package className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Disponivel</p>
                <p className="text-sm font-medium text-foreground">
                  {available.toFixed(0)} {getUnitLabel(unit)} em estoque
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
              <Tag className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Minimo</p>
                <p className="text-sm font-medium text-foreground">
                  {min.toFixed(1)} {getUnitLabel(unit)}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div data-fade className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium text-foreground">
                Quantidade ({getUnitLabel(unit)}):
              </p>
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() =>
                    setQuantity(Math.max(min, quantity - step))
                  }
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-16 text-center text-sm font-bold text-foreground">
                  {quantity.toFixed(1)}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(available, quantity + step))
                  }
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5">
              <span className="text-sm text-muted-foreground">Total estimado:</span>
              <span className="text-2xl font-bold text-foreground">
                R$ {(pricePerUnit(product, unit) * quantity).toFixed(2)}
              </span>
            </div>

            <Button
              size="lg"
              className={`h-12 gap-2 text-base transition-all duration-300 ${addedToCart
                  ? 'bg-green-600 text-white hover:bg-green-600'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              onClick={handleAddToCart}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  Adicionado ao Carrinho
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Adicionar ao Carrinho
                </>
              )}
            </Button>
          </div>

          <div data-fade className="mt-6 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div data-fade>
        <AIInspiration product={product} />
      </div>
    </div>
  )
}
