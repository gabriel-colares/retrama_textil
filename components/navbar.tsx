'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, X, ShoppingBag, Search, Plus, Minus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { products, getUnitLabel, pricePerUnit } from '@/lib/products'
import { useCart } from '@/hooks/use-cart'

const SEARCH_KEY = 'retrama_search_v1'
const SEARCH_EVENT = 'retrama:search'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { cart, itemCount, setItemQuantity, removeItem, clear } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const items = useMemo(() => {
    return cart.items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId)
        if (!product) return null
        const unitPrice = pricePerUnit(product, item.unit)
        const total = unitPrice * item.quantity
        return { item, product, unitPrice, total }
      })
      .filter((x) => x !== null)
  }, [cart.items])

  const cartTotal = useMemo(() => {
    return items.reduce((sum, x) => sum + x.total, 0)
  }, [items])

  function openSearch() {
    if (typeof window !== 'undefined') {
      setSearchValue(window.localStorage.getItem(SEARCH_KEY) || '')
    }
    setIsSearchOpen(true)
  }

  function openCart() {
    setIsCartOpen(true)
  }

  function submitSearch() {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SEARCH_KEY, searchValue)
      window.dispatchEvent(new Event(SEARCH_EVENT))
    }
    router.push('/catalogo')
    setIsSearchOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-retrama.png"
            alt="Retrama Amazonia"
            width={56}
            height={56}
            className="w-14 h-14 object-contain"
          />
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              RETRAMA
            </span>
            <span className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Amazonia
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Início
          </Link>
          <Link
            href="/catalogo"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href="/#como-funciona"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Como Funciona
          </Link>
          <Link
            href="/#empresas"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Empresas
          </Link>
          <Link
            href="/#voluntarios"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Voluntarios
          </Link>
          <Link
            href="/quem-somos"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Quem Somos
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Buscar"
            onClick={openSearch}
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Carrinho"
            onClick={openCart}
            className="relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
          <Link href="/catalogo">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Comprar Agora
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-card border-b border-border animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col px-6 py-4 gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/catalogo"
              className="text-sm font-medium text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              Catálogo
            </Link>
            <Link
              href="#como-funciona"
              className="text-sm font-medium text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              href="#empresas"
              className="text-sm font-medium text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              Empresas
            </Link>
            <Link
              href="#voluntarios"
              className="text-sm font-medium text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              Voluntarios
            </Link>
            <Link
              href="/quem-somos"
              className="text-sm font-medium text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              Quem Somos
            </Link>
            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Buscar"
                onClick={() => {
                  setIsOpen(false)
                  openSearch()
                }}
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Carrinho"
                onClick={() => {
                  setIsOpen(false)
                  openCart()
                }}
                className="relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
              <Link href="/catalogo" className="flex-1">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Comprar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buscar tecidos</DialogTitle>
            <DialogDescription>
              Busque por nome, descrição ou tags.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Ex: jeans, tule, brilho..."
              autoFocus
            />
            <Button onClick={submitSearch}>Buscar</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Carrinho</SheetTitle>
            <SheetDescription>
              Itens salvos no seu navegador.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-4">
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Seu carrinho esta vazio.
              </p>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  {items.map(({ item, product, unitPrice, total }) => (
                    <div
                      key={`${item.productId}:${item.unit}`}
                      className="flex items-start gap-4 rounded-xl border border-border bg-card p-4"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          R$ {unitPrice.toFixed(2)} por {getUnitLabel(item.unit)}
                        </p>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                setItemQuantity(
                                  item.productId,
                                  item.unit,
                                  Math.max(0, item.quantity - 0.5),
                                )
                              }
                              className="w-9 h-9 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                              aria-label="Diminuir quantidade"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-16 text-center text-sm font-bold text-foreground">
                              {item.quantity.toFixed(1)}
                            </span>
                            <button
                              onClick={() =>
                                setItemQuantity(
                                  item.productId,
                                  item.unit,
                                  item.quantity + 0.5,
                                )
                              }
                              className="w-9 h-9 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                              aria-label="Aumentar quantidade"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <p className="text-sm font-bold text-foreground">
                              R$ {total.toFixed(2)}
                            </p>
                            <button
                              onClick={() =>
                                removeItem(item.productId, item.unit)
                              }
                              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                              aria-label="Remover item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between rounded-xl bg-muted/50 border border-border p-4">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-lg font-bold text-foreground">
                    R$ {cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clear}
                  >
                    Limpar carrinho
                  </Button>
                  <Link
                    href="/catalogo"
                    className="flex-1"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <Button className="w-full">Continuar comprando</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
