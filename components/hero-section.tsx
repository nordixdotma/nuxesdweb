"use client"

import Image from "next/image"
import { ArrowRight, Code, Palette, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { getDictionary } from "@/lib/get-dictionary"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const { language } = useLanguage()
  const [dict, setDict] = useState<any>(null)

  useEffect(() => {
    const loadDictionary = async () => {
      const loadedDict = await getDictionary(language)
      setDict(loadedDict)
    }
    loadDictionary()
  }, [language])

  if (!dict) {
    return null // Or a loading spinner
  }

  return (
    <section className="relative pt-16 md:pt-20 min-h-screen flex flex-col">
      <div className="mx-auto max-w-7xl px-4 flex-1 flex flex-col">
        <div className="flex flex-col justify-center flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Left Column: Content */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="flex -space-x-2 md:-space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                      alt="Customer"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-background shadow-sm"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                      alt="Customer"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-background shadow-sm"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                      alt="Customer"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-background shadow-sm"
                    />
                  </div>
                  <div className="text-xs md:text-sm">
                    <span className="text-primary font-semibold">+250</span>
                    <span className="text-muted-foreground ml-1">{dict.hero.satisfied_business_owners}</span>
                  </div>
                </div>
              </div>
              <h1 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground">
                {dict.hero.creative_web_solutions}{" "}
                <span className="text-foreground">
                  {dict.hero.that_drive_results.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="underline decoration-2 underline-offset-4 text-primary">
                    {dict.hero.that_drive_results.split(" ").slice(-1)[0]}
                  </span>
                </span>
              </h1>
              <p className="mb-6 md:mb-8 text-lg md:text-xl text-muted-foreground">{dict.hero.description}</p>
              <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full text-white w-full sm:w-auto">
                  {dict.hero.discover_services}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:text-primary hover:bg-primary/10 bg-transparent w-full sm:w-auto"
                >
                  {dict.hero.get_a_quote}
                </Button>
              </div>
            </div>

            {/* Right Column: Image with floating elements */}
            <div className="hidden md:flex justify-center md:justify-end relative">
              {/* Floating element 1 - Top Right */}
              <div className="absolute top-0 right-10 z-10 bg-card/80 backdrop-blur-sm rounded-lg shadow-lg p-3 flex items-center gap-3 border border-border animate-float-1">
                <div className="bg-primary/20 rounded-full p-2">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{dict.hero.clean_code}</p>
                  <p className="text-xs text-muted-foreground">{dict.hero.modern_standards}</p>
                </div>
              </div>

              {/* Floating element 2 - Left Center */}
              <div className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-lg shadow-lg p-3 flex items-center gap-3 border border-border animate-float-2">
                <div className="bg-primary/20 rounded-full p-2">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{dict.hero.creative_design}</p>
                  <p className="text-xs text-muted-foreground">{dict.hero.pixel_perfect}</p>
                </div>
              </div>

              {/* Floating element 3 - Bottom */}
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 bg-card/80 backdrop-blur-sm rounded-lg shadow-lg p-3 flex items-center gap-3 border border-border animate-float-3">
                <div className="bg-primary/20 rounded-full p-2">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{dict.hero.lightning_fast}</p>
                  <p className="text-xs text-muted-foreground">{dict.hero.optimized_performance}</p>
                </div>
              </div>

              {/* Image container */}
              <div className="relative h-[250px] w-full max-w-[500px] md:h-[350px] lg:h-[400px] lg:max-w-[600px] rounded-lg overflow-hidden shadow-xl border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center"
                  alt="Web development workspace"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Row - Mobile: 2 rows, Desktop: 3 columns */}
          <div className="mt-8 md:mt-12 space-y-3 md:space-y-0 md:grid md:grid-cols-3 md:gap-4">
            {/* Mobile: First row with 2 cards */}
            <div className="grid grid-cols-2 gap-3 md:hidden">
              {/* Left Card - Sites Created */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-xl border border-border flex items-center justify-center">
                <div className="text-center text-foreground">
                  <p className="text-lg font-bold text-primary">+40,000</p>
                  <p className="text-xs leading-tight">{dict.hero.sites_created}</p>
                </div>
              </div>

              {/* Right Card - Pricing */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-xl border border-border flex items-center justify-center">
                <div className="text-center text-foreground">
                  <p className="text-xs font-medium leading-tight">{dict.hero.website_5_pages}</p>
                  <p className="text-sm font-bold text-primary leading-tight">{dict.hero.starting_from}</p>
                </div>
              </div>
            </div>

            {/* Mobile: Second row - Reviews card full width */}
            <div className="md:hidden">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-xl border border-border">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-foreground mt-1">{dict.hero.reviews}</p>
                  </div>
                  <div className="text-center text-foreground">
                    <p className="text-xs font-medium leading-tight">
                      {dict.hero.it_matters.split(" ")[0]}{" "}
                      <span className="text-primary font-semibold">{dict.hero.it_matters.split(" ")[1]}</span>{" "}
                      {dict.hero.it_matters.split(" ")[2]}{" "}
                      <span className="text-primary font-semibold">{dict.hero.it_matters.split(" ")[3]}</span>{" "}
                      {dict.hero.it_matters.split(" ")[4]}{" "}
                      <span className="text-primary font-semibold">{dict.hero.it_matters.split(" ")[5]}</span>
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-auto" viewBox="0 0 24 24">
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
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Original 3-column layout */}
            <div className="hidden md:block bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-border">
              <div className="text-center text-foreground">
                <p className="text-2xl font-bold text-primary whitespace-nowrap">+40,000</p>
                <p className="text-sm whitespace-nowrap">{dict.hero.sites_created}</p>
              </div>
            </div>

            <div className="hidden md:block bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-border">
              <div className="flex items-center justify-between gap-4 w-full">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-foreground mt-1 whitespace-nowrap">{dict.hero.reviews}</p>
                  </div>
                  <div className="text-center text-foreground">
                    <p className="text-sm font-medium whitespace-nowrap">
                      {dict.hero.it_matters.split(" ")[0]}{" "}
                      <span className="text-primary font-semibold">{dict.hero.it_matters.split(" ")[1]}</span>{" "}
                      {dict.hero.it_matters.split(" ")[2]}{" "}
                      <span className="text-primary font-semibold">{dict.hero.it_matters.split(" ")[3]}</span>{" "}
                      {dict.hero.it_matters.split(" ")[4]}{" "}
                      <span className="text-primary font-semibold">{dict.hero.it_matters.split(" ")[5]}</span>
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block flex-shrink-0">
                  <svg className="h-8 w-auto" viewBox="0 0 24 24">
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
                </div>
              </div>
            </div>

            <div className="hidden md:block bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-border">
              <div className="text-center text-foreground">
                <p className="text-sm font-medium whitespace-nowrap">{dict.hero.website_5_pages}</p>
                <p className="text-base font-bold text-primary whitespace-nowrap">{dict.hero.starting_from}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
