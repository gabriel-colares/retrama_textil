import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { FeaturedProducts } from '@/components/featured-products'
import { PartnersSection } from '@/components/partners-section'
import { VolunteersSection } from '@/components/volunteers-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedProducts />
      <PartnersSection />
      <VolunteersSection />
      <CTASection />
      <Footer />
    </main>
  )
}
