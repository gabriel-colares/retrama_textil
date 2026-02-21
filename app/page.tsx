import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { FeaturedProducts } from '@/components/featured-products'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedProducts />
      <CTASection />
      <Footer />
    </main>
  )
}
