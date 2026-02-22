'use client'

import { useMemo, useSyncExternalStore } from 'react'
import type { Unit } from '@/lib/products'

export type CartItem = {
  productId: string
  unit: Unit
  quantity: number
}

type CartState = {
  items: CartItem[]
}

const CART_KEY = 'retrama_cart_v1'
const CART_EVENT = 'retrama:cart'

// ✅ snapshot estável para SSR / hydration
const EMPTY_CART: CartState = { items: [] }

let lastRawCart: string | null = null
let lastParsedCart: CartState = EMPTY_CART

function safeParseCart(raw: string | null): CartState {
  if (!raw) return EMPTY_CART

  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return EMPTY_CART

    const items = (parsed as { items?: unknown }).items
    if (!Array.isArray(items)) return EMPTY_CART

    const normalized: CartItem[] = []

    for (const item of items) {
      if (!item || typeof item !== 'object') continue

      const productId = (item as { productId?: unknown }).productId
      const unit = (item as { unit?: unknown }).unit
      const quantity = (item as { quantity?: unknown }).quantity

      if (typeof productId !== 'string') continue
      if (unit !== 'kg' && unit !== 'm2') continue
      if (typeof quantity !== 'number' || !Number.isFinite(quantity)) continue
      if (quantity <= 0) continue

      normalized.push({ productId, unit, quantity })
    }

    return { items: normalized }
  } catch {
    return EMPTY_CART
  }
}

function safeReadCart(): CartState {
  if (typeof window === 'undefined') return EMPTY_CART

  const raw = window.localStorage.getItem(CART_KEY)
  if (raw === lastRawCart) return lastParsedCart

  lastRawCart = raw
  lastParsedCart = safeParseCart(raw)
  return lastParsedCart
}

function getServerCartSnapshot(): CartState {
  return EMPTY_CART
}

function writeCart(state: CartState): void {
  if (typeof window === 'undefined') return

  const raw = JSON.stringify(state)
  window.localStorage.setItem(CART_KEY, raw)
  lastRawCart = raw
  lastParsedCart = state
  window.dispatchEvent(new Event(CART_EVENT))
}

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => { }

  const handler: EventListener = () => callback()

  window.addEventListener('storage', handler)
  window.addEventListener(CART_EVENT, handler)

  return () => {
    window.removeEventListener('storage', handler)
    window.removeEventListener(CART_EVENT, handler)
  }
}

function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 0
  return Math.max(0, Number(quantity.toFixed(2)))
}

export function useCart(): {
  cart: CartState
  itemCount: number
  addItem: (productId: string, unit: Unit, quantity: number) => void
  setItemQuantity: (productId: string, unit: Unit, quantity: number) => void
  removeItem: (productId: string, unit: Unit) => void
  clear: () => void
} {
  const cart = useSyncExternalStore<CartState>(
    subscribe,
    safeReadCart,
    getServerCartSnapshot
  )

  const actions = useMemo(() => {
    return {
      addItem(productId: string, unit: Unit, quantity: number) {
        const q = clampQuantity(quantity)
        if (q <= 0) return

        const current = safeReadCart()
        const nextItems = [...current.items]

        const existingIndex = nextItems.findIndex(
          (i) => i.productId === productId && i.unit === unit
        )

        if (existingIndex >= 0) {
          nextItems[existingIndex] = {
            ...nextItems[existingIndex],
            quantity: clampQuantity(nextItems[existingIndex].quantity + q),
          }
        } else {
          nextItems.push({ productId, unit, quantity: q })
        }

        writeCart({ items: nextItems })
      },

      setItemQuantity(productId: string, unit: Unit, quantity: number) {
        const q = clampQuantity(quantity)
        const current = safeReadCart()

        const nextItems = current.items
          .map((i) => {
            if (i.productId !== productId || i.unit !== unit) return i
            return { ...i, quantity: q }
          })
          .filter((i) => i.quantity > 0)

        writeCart({ items: nextItems })
      },

      removeItem(productId: string, unit: Unit) {
        const current = safeReadCart()

        writeCart({
          items: current.items.filter(
            (i) => i.productId !== productId || i.unit !== unit
          ),
        })
      },

      clear() {
        writeCart(EMPTY_CART)
      },
    }
  }, [])

  const itemCount = cart.items.length

  return { cart, itemCount, ...actions }
}
