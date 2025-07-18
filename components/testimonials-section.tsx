"use client"

import { useRef, useState, useEffect } from "react"
import { Star } from "lucide-react"
import "swiper/css"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { useLanguage } from "@/lib/language-context"
import { getDictionary } from "@/lib/get-dictionary"

export default function TestimonialsSection() {
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

  const testimonials = [
    {
      quote_key: "quote_1",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      name: "John Smith",
      position_key: "ceo_techstart",
      rating: 5,
    },
    {
      quote_key: "quote_2",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      name: "Sarah Johnson",
      position_key: "marketing_director_growthco",
      rating: 5,
    },
    {
      quote_key: "quote_3",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Mike Davis",
      position_key: "founder_creativestudio",
      rating: 5,
    },
    {
      quote_key: "quote_4",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      name: "Lisa Wilson",
      position_key: "ecommerce_manager",
      rating: 5,
    },
    {
      quote_key: "quote_5",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      name: "Robert Brown",
      position_key: "product_manager_innovatelab",
      rating: 5,
    },
    {
      quote_key: "quote_6",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      name: "Jennifer Taylor",
      position_key: "brand_manager_stylecorp",
      rating: 5,
    },
  ]

  if (!dict) {
    return null // Or a loading spinner
  }

  return (
    <section id="testimonials" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 md:px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
            {dict.testimonials.title_part1} <span className="text-primary">{dict.testimonials.title_part2}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{dict.testimonials.subtitle}</p>
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
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard testimonial={testimonial} isActive={index === activeIndex} dict={dict} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .testimonial-swiper .swiper-slide {
          transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform: scale(0.95);
          height: auto;
          padding: 20px 0;
        }
        
        .testimonial-swiper .swiper-slide-active {
          transform: scale(1);
          z-index: 2;
        }
        
        @media (max-width: 767px) {
          .testimonial-swiper .swiper-slide {
            opacity: 1 !important;
          }
        }
        
        @media (min-width: 768px) {
          .testimonial-swiper .swiper-slide {
            opacity: 0.4;
            transform: scale(0.85);
          }
          
          .testimonial-swiper .swiper-slide-active {
            opacity: 1;
            transform: scale(1);
          }
          
          .testimonial-swiper .swiper-slide-prev,
          .testimonial-swiper .swiper-slide-next {
            opacity: 0.7;
            transform: scale(0.9);
          }
          
          .testimonial-swiper .swiper-slide:hover {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}

const TestimonialCard = ({ testimonial, isActive, dict }: { testimonial: any; isActive: boolean; dict: any }) => {
  const { quote_key, image, name, position_key, rating } = testimonial

  return (
    <div className="relative px-2 py-1 flex flex-col h-full">
      <div className="rounded-2xl bg-card text-card-foreground p-6 shadow-lg relative w-full border border-border h-full flex flex-col">
        {/* Google-style header */}
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden mr-3">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=150&width=150"
              }}
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold text-card-foreground text-sm">{name}</h3>
            <p className="text-muted-foreground text-xs">{dict.testimonials[position_key]}</p>
          </div>
          <div className="text-right">
            <div className="flex mb-1">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {dict.testimonials.google}
            </div>
          </div>
        </div>

        {/* Review content */}
        <div className="relative flex-grow">
          <p className="text-sm leading-relaxed text-muted-foreground">{dict.testimonials[quote_key]}</p>
        </div>
      </div>
    </div>
  )
}
