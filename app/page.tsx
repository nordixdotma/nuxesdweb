"use client" // This component needs to be a client component to use hooks like useEffect and useRouter

import { useEffect } from "react" // Import useEffect
import { useSearchParams } from "next/navigation" // Import useSearchParams to get URL hash

import { Roboto } from "next/font/google"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import OffersSection from "@/components/offers-section"
import ServicesSection from "@/components/services-section"
import TestimonialsSection from "@/components/testimonials-section"
import FaqSection from "@/components/faq-section"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import CustomCursor from "@/components/custom-cursor"
import OurWorkCarousel from "@/components/our-work-carousel"
import PartnersSection from "@/components/partners-section"
import Head from "next/head"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
})

export default function Home() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Remove the '#' from the hash to get the ID
      const elementId = hash.substring(1)
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [searchParams]) // Re-run this effect when the URL's search parameters (including hash) change

  return (
    <>
      <Head>
        <title>Nuxesdweb — Creative Web Solutions That Drive Results</title>
        <meta
          name="description"
          content="We design and develop fast, elegant, and responsive websites tailored to your brand. Professional web development, UI/UX design, e-commerce solutions, and SEO optimization services."
        />
        <meta
          name="keywords"
          content="web development, web design, UI/UX design, e-commerce, SEO optimization, responsive websites, mobile development, performance optimization"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://nuxesdweb.com" />
        <meta property="og:title" content="Nuxesdweb — Creative Web Solutions That Drive Results" />
        <meta
          property="og:description"
          content="We design and develop fast, elegant, and responsive websites tailored to your brand."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nuxesdweb.com" />
        <meta property="og:image" content="https://nuxesdweb.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nuxesdweb — Creative Web Solutions That Drive Results" />
        <meta
          name="twitter:description"
          content="We design and develop fast, elegant, and responsive websites tailored to your brand."
        />
        <meta name="twitter:image" content="https://nuxesdweb.com/og-image.jpg" />
      </Head>

      <div
        className={`min-h-screen bg-background text-foreground overflow-x-hidden ${roboto.className}`}
        translate="no"
      >
        <CustomCursor />

        {/* Blurry glowing background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-[300px] h-[300px] rounded-full bg-[#226fd3]/20 blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-[400px] h-[400px] rounded-full bg-[#226fd3]/15 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-[#226fd3]/10 blur-3xl"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <Header />
          <HeroSection />
          <OurWorkCarousel />
          <OffersSection />
          <ServicesSection />
          <PartnersSection />
          <TestimonialsSection />
          <FaqSection />
          <Footer />
          <FloatingContact />
        </div>
      </div>
    </>
  )
}
