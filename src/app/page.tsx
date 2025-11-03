import Hero from '@/features/home/hero'
import Introduction from '@/features/home/Introduction'
import Product from '@/features/home/Product'
import Features from '@/features/home/Features'
import Stats from '@/features/home/Stats'
import Testimonials from '@/features/home/Testimonials'
import CallToAction from '@/features/home/CallToAction'

export default function HomePage() {
  return (
    <main>
      <Hero 
        imageSrc="/banner/banner-about.jpeg" 
        title="Welcome to NovaTech Solutions"
        subtitle="Empowering businesses with innovative technology solutions"
        showCTA={true}
      />
      <Introduction />
      {/* <Features /> */}
      <Stats />
      <Product />
      <Testimonials />
      <CallToAction />
    </main>
  )
}
