import { Navbar } from '@/components/navbar'
import { CatalogGrid } from '@/components/catalog-grid'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Catalogo | RETRAMA Amazonia',
  description:
    'Explore nosso catalogo de tecidos reciclados. Compre por m² e, se preferir, por kg.',
}

export default function CatalogoPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-16 md:pt-32 md:pb-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-mono font-bold uppercase tracking-widest text-secondary mb-3">
              Marketplace
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Catalogo de Tecidos
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Todos os tecidos sao vendidos por m², com opcao de compra por kg.
              Escolha, compre e transforme.
            </p>
          </div>
          <CatalogGrid />
        </div>
      </div>
      <Footer />
    </main>
  )
}
