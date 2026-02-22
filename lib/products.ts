export interface Product {
  id: string
  name: string
  slug: string
  description: string
  origin: string
  category: string
  pricePerKg: number
  gsm: number
  minKg: number
  availableKg: number
  image: string
  colors: string[]
  composition: string
  tags: string[]
}

export type Unit = 'm2' | 'kg'

export function getUnitLabel(unit: Unit) {
  return unit === 'm2' ? 'm²' : 'kg'
}

export function kgPerM2(product: Product) {
  return product.gsm / 1000
}

export function pricePerUnit(product: Product, unit: Unit) {
  if (unit === 'kg') return product.pricePerKg
  return product.pricePerKg * kgPerM2(product)
}

export function availableByUnit(product: Product, unit: Unit) {
  if (unit === 'kg') return product.availableKg
  return product.availableKg / kgPerM2(product)
}

export function minByUnit(product: Product, unit: Unit) {
  if (unit === 'kg') return product.minKg
  return product.minKg / kgPerM2(product)
}

export function convertQuantity(
  product: Product,
  quantity: number,
  fromUnit: Unit,
  toUnit: Unit,
) {
  if (fromUnit === toUnit) return quantity
  if (fromUnit === 'kg' && toUnit === 'm2') return quantity / kgPerM2(product)
  return quantity * kgPerM2(product)
}

export const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'industrial', label: 'Fardas Industriais' },
  { id: 'carnaval', label: 'Carnaval' },
  { id: 'eventos', label: 'Eventos Sazonais' },
  { id: 'jeans', label: 'Jeans' },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Algodão Industrial Misto',
    slug: 'algodao-industrial-misto',
    description:
      'Tecido de algodão reutilizáveis proveniente de fardas industriais. Excelente para projetos de artesanato, patchwork e confecção de bolsas e acessórios. Material resistente e de alta durabilidade.',
    origin: 'Fardas Industriais',
    category: 'industrial',
    pricePerKg: 18.9,
    gsm: 220,
    minKg: 1,
    availableKg: 250,
    image: '/images/algodao-industrial.jpg',
    colors: ['Bege', 'Caqui', 'Cinza'],
    composition: '80% Algodão, 20% Poliéster',
    tags: ['resistente', 'artesanato', 'patchwork'],
  },
  {
    id: '2',
    name: 'Paete e Brilhos Carnavalescos',
    slug: 'paete-brilhos-carnavalescos',
    description:
      'Tecidos com paetês e brilhos provenientes de fantasias de carnaval. Perfeito para customização de roupas, decoração de festas e projetos artísticos. Cores vibrantes e chamativas.',
    origin: 'Fantasias de Carnaval',
    category: 'carnaval',
    pricePerKg: 32.5,
    gsm: 260,
    minKg: 0.5,
    availableKg: 80,
    image: '/images/paete-carnaval.jpg',
    colors: ['Dourado', 'Vermelho', 'Azul', 'Verde'],
    composition: '100% Poliéster com Paetês',
    tags: ['brilhante', 'festas', 'decoração'],
  },
  {
    id: '3',
    name: 'Jeans Reutilizáveis Premium',
    slug: 'jeans-reutilizaveis-premium',
    description:
      'Denim de alta qualidade proveniente de uniformes industriais. Ideal para confecção de bolsas, aventais, capas e projetos de upcycling. Diversos tons de azul.',
    origin: 'Uniformes Industriais',
    category: 'jeans',
    pricePerKg: 22.0,
    gsm: 380,
    minKg: 1,
    availableKg: 180,
    image: '/images/jeans-reciclado.jpg',
    colors: ['Azul Claro', 'Azul Escuro', 'Indigo'],
    composition: '100% Algodão Denim',
    tags: ['denim', 'upcycling', 'bolsas'],
  },
  {
    id: '4',
    name: 'Lycra Colorida Reutilizado',
    slug: 'lycra-colorida-reutilizada',
    description:
      'Lycra elástica reutilizada de fantasias e roupas de eventos. Ótima para confecção de roupas fitness, fantasias, e projetos de costura que precisam de elasticidade.',
    origin: 'Fantasias e Eventos',
    category: 'carnaval',
    pricePerKg: 28.0,
    gsm: 240,
    minKg: 0.5,
    availableKg: 120,
    image: '/images/lycra-colorida.jpg',
    colors: ['Rosa', 'Roxo', 'Amarelo'],
    composition: '85% Poliamida, 15% Elastano',
    tags: ['elastico', 'fitness', 'fantasias'],
  },
  {
    id: '5',
    name: 'Poliester de Uniforme',
    slug: 'poliester-uniforme',
    description:
      'Poliéster liso proveniente de uniformes corporativos. Material leve, de fácil manuseio e ideal para forros, sacolas retornáveis e projetos de costura práticos.',
    origin: 'Uniformes Corporativos',
    category: 'industrial',
    pricePerKg: 15.5,
    gsm: 170,
    minKg: 1,
    availableKg: 300,
    image: '/images/poliester-uniforme.jpg',
    colors: ['Azul Marinho', 'Chumbo'],
    composition: '100% Poliéster',
    tags: ['leve', 'sacolas', 'forros'],
  },
  {
    id: '6',
    name: 'Tule de Fantasia',
    slug: 'tule-fantasia',
    description:
      'Tule leve e delicado proveniente de fantasias e decorações de eventos. Perfeito para projetos de decoração, arranjos florais, fantasias infantis e artesanato.',
    origin: 'Fantasias de Eventos',
    category: 'eventos',
    pricePerKg: 25.0,
    gsm: 55,
    minKg: 0.5,
    availableKg: 60,
    image: '/images/tule-fantasia.jpg',
    colors: ['Branco', 'Rosa Claro', 'Lilas'],
    composition: '100% Poliéster Tule',
    tags: ['delicado', 'decoração', 'infantil'],
  },
  {
    id: '7',
    name: 'Cetim de Evento',
    slug: 'cetim-evento',
    description:
      'Cetim brilhante reutilizado de decorações de eventos e festas. Excelente para forros de almofadas, projetos de decoração de interiores e confecção de acessórios elegantes.',
    origin: 'Decoração de Eventos',
    category: 'eventos',
    pricePerKg: 27.0,
    gsm: 130,
    minKg: 0.5,
    availableKg: 90,
    image: '/images/cetim-evento.jpg',
    colors: ['Esmeralda', 'Bordô', 'Dourado'],
    composition: '100% Poliéster Cetim',
    tags: ['elegante', 'decoração', 'almofadas'],
  },
  {
    id: '8',
    name: 'Mix Textil Surpresa',
    slug: 'mix-textil-surpresa',
    description:
      'Pacote surpresa com diversos tipos de tecidos reutilizados. Uma ótima opção para quem busca variedade e inspiração. Cada pacote e único e contem diferentes cores e texturas.',
    origin: 'Diversas Origens',
    category: 'industrial',
    pricePerKg: 12.0,
    gsm: 190,
    minKg: 2,
    availableKg: 500,
    image: '/images/hero-textiles.jpg',
    colors: ['Variadas'],
    composition: 'Misto',
    tags: ['surpresa', 'variedade', 'económico'],
  },
]
