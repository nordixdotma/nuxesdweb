"use client"

import { useRef, useState, useEffect } from "react"
import { Code, Palette, Smartphone, Search, ShoppingCart, Zap } from "lucide-react"
import "swiper/css"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { useLanguage } from "@/lib/language-context"
import { getDictionary } from "@/lib/get-dictionary"
import { Star, Check } from "lucide-react" // Import Check icon

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const { language } = useLanguage()
  const [dict, setDict] = useState<any>(null)

  useEffect(() => {
    const loadDictionary = async () => {
      const loadedDict = await getDictionary(language)
      setDict(loadedDict)
    }
    loadDictionary()
  }, [language])

  const services = [
    {
      icon: Code,
      title_key: "web_development_title",
      description_key: "web_development_description",
      features_keys: [
        "web_development_features.0",
        "web_development_features.1",
        "web_development_features.2",
        "web_development_features.3",
      ],
      color: "#3B82F6", // Blue
      glowColor: "59, 130, 246", // RGB for blue
      featureIconType: "check", // Use check for this service
    },
    {
      icon: Palette,
      title_key: "ui_ux_design_title",
      description_key: "ui_ux_design_description",
      features_keys: [
        "ui_ux_design_features.0",
        "ui_ux_design_features.1",
        "ui_ux_design_features.2",
        "ui_ux_design_features.3",
      ],
      color: "#EC4899", // Pink
      glowColor: "236, 72, 153", // RGB for pink
      featureIconType: "check", // Use check for this service
    },
    {
      icon: ShoppingCart,
      title_key: "ecommerce_solutions_title",
      description_key: "ecommerce_solutions_description",
      features_keys: [
        "ecommerce_solutions_features.0",
        "ecommerce_solutions_features.1",
        "ecommerce_solutions_features.2",
        "ecommerce_solutions_features.3",
      ],
      color: "#10B981", // Green
      glowColor: "16, 185, 129", // RGB for green
      featureIconType: "check", // Use check for this service
    },
    {
      icon: Search,
      title_key: "seo_optimization_title",
      description_key: "seo_optimization_description",
      features_keys: [
        "seo_optimization_features.0",
        "seo_optimization_features.1",
        "seo_optimization_features.2",
        "seo_optimization_features.3",
      ],
      color: "#F59E0B", // Amber
      glowColor: "245, 158, 11", // RGB for amber
      featureIconType: "check", // Use check for this service
    },
    {
      icon: Smartphone,
      title_key: "mobile_development_title",
      description_key: "mobile_development_description",
      features_keys: [
        "mobile_development_features.0",
        "mobile_development_features.1",
        "mobile_development_features.2",
        "mobile_development_features.3",
      ],
      color: "#8B5CF6", // Purple
      glowColor: "139, 92, 246", // RGB for purple
      featureIconType: "check", // Use check for this service
    },
    {
      icon: Zap,
      title_key: "performance_optimization_title",
      description_key: "performance_optimization_description",
      features_keys: [
        "performance_optimization_features.0",
        "performance_optimization_features.1",
        "performance_optimization_features.2",
        "performance_optimization_features.3",
      ],
      color: "#EF4444", // Red
      glowColor: "239, 68, 68", // RGB for red
      featureIconType: "star", // Use star for this service
    },
  ]

  if (!dict) {
    return null // Or a loading spinner
  }

  return (
    <section id="services" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 md:px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
            {dict.services.title.split(" ")[0]}{" "}
            <span className="text-primary">{dict.services.title.split(" ")[1]}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{dict.services.subtitle}</p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={12}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            loop={true}
            speed={800}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex)
            }}
            className="services-swiper"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <ServiceCard service={service} isActive={index === activeIndex} dict={dict} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
      .services-swiper .swiper-slide {
        transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        transform: scale(0.95);
        height: auto;
        padding: 20px 0;
      }
      
      .services-swiper .swiper-slide-active {
        transform: scale(1);
        z-index: 2;
      }
      
      @media (max-width: 767px) {
        .services-swiper .swiper-slide {
          opacity: 1 !important;
        }
      }
      
      @media (min-width: 768px) {
        .services-swiper .swiper-slide {
          opacity: 0.4;
          transform: scale(0.85);
        }
        
        .services-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }
        
        .services-swiper .swiper-slide-prev,
        .services-swiper .swiper-slide-next {
          opacity: 0.7;
          transform: scale(0.9);
        }
        
        .services-swiper .swiper-slide:hover {
          opacity: 1;
        }
      }
    `}</style>
    </section>
  )
}

const ServiceCard = ({ service, isActive, dict }: { service: any; isActive: boolean; dict: any }) => {
  const { icon: IconComponent, title_key, description_key, features_keys, color, glowColor, featureIconType } = service
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative px-2 py-1 flex flex-col h-full">
      <div
        className="group relative rounded-2xl bg-card border border-border p-8 shadow-lg w-full h-full flex flex-col transition-all duration-500 ease-out hover:scale-[1.02] cursor-pointer overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          borderColor: isHovered ? color : undefined,
          boxShadow: isHovered
            ? `0 0 30px rgba(${glowColor}, 0.3), 0 0 60px rgba(${glowColor}, 0.1), 0 10px 30px rgba(0, 0, 0, 0.1)`
            : undefined,
        }}
      >
        {/* Animated background blur effect */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out rounded-2xl"
          style={{
            background: isHovered
              ? `radial-gradient(circle at center, rgba(${glowColor}, 0.08) 0%, rgba(${glowColor}, 0.03) 50%, transparent 100%)`
              : "transparent",
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon and Title - top left, side-by-side */}
          <div className="flex items-center mb-4">
            <IconComponent className="w-6 h-6 mr-3" style={{ color: color }} />
            <h3 className="font-bold text-card-foreground text-xl">{dict.services[title_key]}</h3>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{dict.services[description_key]}</p>

          {/* Features */}
          <div className="mt-auto">
            <ul className="space-y-3">
              {features_keys.map((featureKey: string, index: number) => (
                <li key={index} className="flex items-center text-sm text-muted-foreground">
                  {featureIconType === "star" ? (
                    <Star className="w-4 h-4 mr-3 text-primary fill-primary" />
                  ) : (
                    <Check className="w-4 h-4 mr-3 text-primary" />
                  )}
                  <span className="transition-colors duration-300">
                    {featureKey.split(".").reduce((o, i) => o[i], dict.services)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hover border glow effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ease-out"
          style={{
            border: `1px solid rgba(${glowColor}, ${isHovered ? "0.5" : "0"})`,
            boxShadow: isHovered ? `inset 0 0 20px rgba(${glowColor}, 0.1), 0 0 20px rgba(${glowColor}, 0.2)` : "none",
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>
    </div>
  )
}
