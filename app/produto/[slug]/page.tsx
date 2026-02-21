import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductDetail } from '@/components/product-detail'
import { products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return { title: 'Produto nao encontrado' }
  return {
    title: `${product.name} | RETRAMA Amazonia`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-16 md:pt-32 md:pb-24 px-6">
        <ProductDetail product={product} />
      </div>
      <Footer />
    </main>
  )
}
