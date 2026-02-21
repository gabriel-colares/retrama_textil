'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Weight, ArrowRight, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  products,
  categories,
  type Product,
  type Unit,
  availableByUnit,
  getUnitLabel,
  pricePerUnit,
} from '@/lib/products'
import { useUnitPreference } from '@/hooks/use-unit-preference'

const SEARCH_KEY = 'retrama_search_v1'
const SEARCH_EVENT = 'retrama:search'

export function CatalogGrid() {
  const { unit, setUnit } = useUnitPreference()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>(
    'name'
  )
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const raw =
      typeof window === 'undefined'
        ? ''
        : window.localStorage.getItem(SEARCH_KEY) || ''
    if (raw) setSearchTerm(raw)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handler = () => {
      const next = window.localStorage.getItem(SEARCH_KEY) || ''
      setSearchTerm((current) => (current === next ? current : next))
    }
    window.addEventListener('storage', handler)
    window.addEventListener(SEARCH_EVENT, handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener(SEARCH_EVENT, handler)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(SEARCH_KEY, searchTerm)
    window.dispatchEvent(new Event(SEARCH_EVENT))
  }, [searchTerm])

  const filtered = products
    .filter((p) => {
      const matchesCategory =
        activeCategory === 'all' || p.category === activeCategory
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc')
        return pricePerUnit(a, unit) - pricePerUnit(b, unit)
      if (sortBy === 'price-desc')
        return pricePerUnit(b, unit) - pricePerUnit(a, unit)
      return a.name.localeCompare(b.name)
    })

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = grid.querySelectorAll('[data-card]')
    cards.forEach((card, i) => {
      const el = card as HTMLElement
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      setTimeout(() => {
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 80 * i)
    })
  }, [activeCategory, searchTerm, sortBy])

  return (
    <div>
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tecido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm bg-card border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="name">Nome A-Z</option>
              <option value="price-asc">Menor preco</option>
              <option value="price-desc">Maior preco</option>
            </select>
          </div>
        </div>

        <Tabs
          value={unit}
          onValueChange={(v) => setUnit(v as Unit)}
          className="flex"
        >
          <TabsList>
            <TabsTrigger value="m2">m²</TabsTrigger>
            <TabsTrigger value="kg">kg</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        {filtered.length} {filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
      </p>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} unit={unit} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">
            Nenhum produto encontrado.
          </p>
          <p className="text-sm text-muted-foreground/60 mt-2">
            Tente buscar por outro termo ou categoria.
          </p>
        </div>
      )}
    </div>
  )
}

function ProductCard({ product, unit }: { product: Product; unit: Unit }) {
  return (
    <Link
      href={`/produto/${product.slug}`}
      data-card
      className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300"
      style={{ opacity: 0, transform: 'translateY(20px)' }}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm text-xs">
            {product.origin}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1 text-xs bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-foreground font-medium">
            <Weight className="w-3 h-3" />
            {availableByUnit(product, unit).toFixed(0)}
            {getUnitLabel(unit)} disponivel
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {product.colors.map((color) => (
            <span
              key={color}
              className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
            >
              {color}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-foreground">
              R$ {pricePerUnit(product, unit).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">
              por {getUnitLabel(unit)}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowRight className="w-4 h-4 text-secondary-foreground" />
          </div>
        </div>
      </div>
    </Link>
  )
}
