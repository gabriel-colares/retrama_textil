'use client'

import { useSyncExternalStore } from 'react'
import type { Unit } from '@/lib/products'

const UNIT_KEY = 'retrama_unit_v1'
const UNIT_EVENT = 'retrama:unit'

function safeReadUnit(): Unit {
  if (typeof window === 'undefined') return 'm2'

  const raw = window.localStorage.getItem(UNIT_KEY)
  if (raw === 'kg' || raw === 'm2') return raw

  return 'm2'
}

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => { }

  const handler: EventListener = () => callback()

  window.addEventListener('storage', handler)
  window.addEventListener(UNIT_EVENT, handler)

  return () => {
    window.removeEventListener('storage', handler)
    window.removeEventListener(UNIT_EVENT, handler)
  }
}

export function setUnitPreference(unit: Unit): void {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(UNIT_KEY, unit)
  window.dispatchEvent(new Event(UNIT_EVENT))
}

export function useUnitPreference(): { unit: Unit; setUnit: (unit: Unit) => void } {
  const unit = useSyncExternalStore<Unit>(
    subscribe,
    safeReadUnit,
    () => 'm2' as Unit
  )

  return { unit, setUnit: setUnitPreference }
}