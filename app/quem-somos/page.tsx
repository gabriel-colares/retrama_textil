import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Quem Somos | RETRAMA Amazonia',
  description:
    'Conheça a RETRAMA Amazonia: nossa historia, proposito e compromisso com a economia circular.',
}

export default function QuemSomosPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-16 md:pt-32 md:pb-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-mono font-bold uppercase tracking-widest text-secondary mb-3">
              Quem Somos
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              RETRAMA Amazonia
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Transformamos resíduos têxteis em materia-prima criativa, conectando
              industria e artesanato com impacto real para o planeta.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border">
              <Image
                src="/nos.jpeg"
                alt="Equipe RETRAMA Amazonia"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Nosso proposito
                </h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Acreditamos que o futuro da moda e da criatividade passa pela
                  economia circular. Por isso, damos um novo destino a tecidos que
                  seriam descartados, colocando em circulação materiais com historia
                  e qualidade.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-card border border-border p-6">
                  <p className="text-sm font-mono font-bold uppercase tracking-widest text-secondary">
                    O que fazemos
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Triagem, preparação e venda de tecidos reciclados por quilo para
                    artesas, costureiras e pequenos negócios.
                  </p>
                </div>
                <div className="rounded-2xl bg-card border border-border p-6">
                  <p className="text-sm font-mono font-bold uppercase tracking-widest text-secondary">
                    Por que importa
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Menos descarte, mais criatividade. Cada compra ajuda a reduzir
                    resíduos e incentivar produções mais conscientes.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-muted/50 border border-border p-6">
                <p className="text-sm font-mono font-bold uppercase tracking-widest text-secondary">
                  Nosso compromisso
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Transparência no processo, respeito aos materiais e foco em
                  acessibilidade para quem cria. Queremos que voce encontre o tecido
                  certo e transforme ideias em produtos com identidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

