import Hero from '@/components/home/Hero'
import CategoryShortcuts from '@/components/home/CategoryShortcuts'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import HowItWorks from '@/components/home/HowItWorks'
import PromoBanners from '@/components/home/PromoBanners'
import DeliveryInfo from '@/components/home/DeliveryInfo'
import Testimonials from '@/components/home/Testimonials'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="page-enter">
      <Hero />
      <CategoryShortcuts />
      <FeaturedProducts />
      <HowItWorks />
      <PromoBanners />
      <DeliveryInfo />
      <Testimonials />
      <Footer />
    </div>
  )
}
