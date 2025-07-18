"use client"

import Image from "next/image"
import Link from "next/link" // Import Link from next/link
import { ArrowRight } from "lucide-react" // Import ArrowRight icon
import { Carousel, CarouselContent, CarouselNavigation, CarouselItem } from "@/components/kaif-ui/carousel"
import { useLanguage } from "@/lib/language-context"
import { getDictionary } from "@/lib/get-dictionary"
import { useEffect, useState } from "react"

export default function OurWorkCarousel() {
  const { language } = useLanguage()
  const [dict, setDict] = useState<any>(null)

  useEffect(() => {
    const loadDictionary = async () => {
      const loadedDict = await getDictionary(language)
      setDict(loadedDict)
    }
    loadDictionary()
  }, [language])

  const carouselItems = [
    {
      id: 1,
      title_key: "ecommerce_platform_title",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      description_key: "ecommerce_platform_description",
      link: "https://example.com/ecommerce",
    },
    {
      id: 2,
      title_key: "corporate_website_title",
      imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      description_key: "corporate_website_description",
      link: "https://example.com/corporate",
    },
    {
      id: 3,
      title_key: "saas_dashboard_title",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      description_key: "saas_dashboard_description",
      link: "https://example.com/saas",
    },
    {
      id: 4,
      title_key: "restaurant_website_title",
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      description_key: "restaurant_website_description",
      link: "https://example.com/restaurant",
    },
    {
      id: 5,
      title_key: "mobile_app_landing_page_title",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      description_key: "mobile_app_landing_page_description",
      link: "https://example.com/mobileapp",
    },
    {
      id: 6,
      title_key: "portfolio_website_title",
      imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
      description_key: "portfolio_website_description",
      link: "https://example.com/portfolio",
    },
    {
      id: 7,
      title_key: "blog_platform_title",
      imageUrl: "https://images.unsplash.com/photo-1488190211105-8b0e65d806fa?w=800&h=600&fit=crop",
      description_key: "blog_platform_description",
      link: "https://example.com/blog",
    },
  ]

  if (!dict) {
    return null // Or a loading spinner
  }

  return (
    <section id="work" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
              {dict.our_work.title_part1} <span className="text-primary">{dict.our_work.title_part2}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">{dict.our_work.subtitle}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary mb-2">250+</div>
            <div className="text-muted-foreground whitespace-nowrap">{dict.our_work.projects_completed}</div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative w-full px-4 pb-[5rem]">
          <Carousel>
            <CarouselContent className="-ml-4">
              {carouselItems.map((item) => (
                <CarouselItem key={item.id} className="sm:basis-1/3 pl-4">
                  <div
                    className="relative flex shrink-0 snap-start scroll-ml-[var(--scroll-padding)] flex-col justify-end overflow-hidden rounded-3xl aspect-[4/5] w-full border border-border" // Changed aspect ratio to 4/5 for slightly more height
                    style={{ opacity: 1 }}
                  >
                    <Image
                      alt={dict.our_work[item.title_key]}
                      src={item.imageUrl || "/placeholder.svg"}
                      fill
                      className="absolute inset-x-0 top-0 aspect-square w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-3xl bg-gradient-to-t from-background from-[calc(7/16*100%)] ring-1 ring-inset ring-foreground/10 sm:from-25%"
                    />
                    <figure className="relative p-4 sm:p-6 lg:p-10">
                      <div className="relative">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">
                          {dict.our_work[item.title_key]}
                        </h3>
                        <p className="text-sm sm:text-md text-foreground/90 mb-4">
                          {dict.our_work[item.description_key]}
                        </p>
                        <Link
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all transform hover:scale-105 text-sm"
                        >
                          {dict.our_work.live_demo}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </figure>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNavigation
              className="absolute -bottom-20 left-auto top-auto w-full justify-end gap-2"
              classNameButton="bg-secondary *:stroke-secondary-foreground dark:bg-secondary *:stroke-secondary-foreground"
              alwaysShow
            />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
