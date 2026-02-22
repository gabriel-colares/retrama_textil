import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo-retrama.png"
                alt="RETRAMA Amazonia"
                width={36}
                height={36}
                className="w-9 h-9 object-contain brightness-0 invert"
              />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-primary-foreground">
                  RETRAMA
                </span>
                <span className="text-[9px] font-medium tracking-[0.2em] text-primary-foreground/60 uppercase">
                  Amazonia
                </span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Transformando resíduos têxteis em materia-prima criativa e sustentavel.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/80">
              Navegacao
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="#como-funciona" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/#empresas" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Empresas Parceiras
                </Link>
              </li>
              <li>
                <Link href="/#voluntarios" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Voluntarios
                </Link>
              </li>
              <li>
                <Link href="/quem-somos" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Quem Somos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/80">
              Categorias
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/catalogo?cat=industrial" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Fardas Industriais
                </Link>
              </li>
              <li>
                <Link href="/catalogo?cat=carnaval" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Carnaval
                </Link>
              </li>
              <li>
                <Link href="/catalogo?cat=eventos" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Eventos Sazonais
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-primary-foreground/80">
              Contato
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="text-sm text-primary-foreground/60">
                contato@retrama.shop
              </li>
              <li className="text-sm text-primary-foreground/60">
                (92) 99221-4370
              </li>
              <li className="text-sm text-primary-foreground/60">
                Manaus, AM
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            2026 RETRAMA Amazonia. Todos os direitos reservados.
          </p>
          <p className="text-xs text-primary-foreground/40">
            Feito com cuidado pelo planeta.
          </p>
        </div>
      </div>
    </footer>
  )
}
