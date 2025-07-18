"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react" // Import Check component
import { useLanguage } from "@/lib/language-context"
import { getDictionary } from "@/lib/get-dictionary"
import { useEffect, useState } from "react"

export default function OffersSection() {
  const { language } = useLanguage()
  const [dict, setDict] = useState<any>(null)

  useEffect(() => {
    const loadDictionary = async () => {
      const loadedDict = await getDictionary(language)
      setDict(loadedDict)
    }
    loadDictionary()
  }, [language])

  const offers = [
    {
      name_key: "starter_plan_name",
      price: "$999",
      period_key: "starter_plan_price_period",
      description_key: "starter_plan_description",
      features_keys: [
        "starter_plan_features.0",
        "starter_plan_features.1",
        "starter_plan_features.2",
        "starter_plan_features.3",
        "starter_plan_features.4",
        "starter_plan_features.5",
        "starter_plan_features.6",
        "starter_plan_features.7",
      ],
      buttonText_key: "button_text",
      featured: false,
    },
    {
      name_key: "pro_plan_name",
      price: "$1,999",
      period_key: "pro_plan_price_period",
      description_key: "pro_plan_description",
      features_keys: [
        "pro_plan_features.0",
        "pro_plan_features.1",
        "pro_plan_features.2",
        "pro_plan_features.3",
        "pro_plan_features.4",
        "pro_plan_features.5",
        "pro_plan_features.6",
        "pro_plan_features.7",
      ],
      buttonText_key: "button_text",
      featured: true,
    },
    {
      name_key: "elite_plan_name",
      price: "$3,999",
      period_key: "elite_plan_price_period",
      description_key: "elite_plan_description",
      features_keys: [
        "elite_plan_features.0",
        "elite_plan_features.1",
        "elite_plan_features.2",
        "elite_plan_features.3",
        "elite_plan_features.4",
        "elite_plan_features.5",
        "elite_plan_features.6",
        "elite_plan_features.7",
      ],
      buttonText_key: "button_text",
      featured: false,
    },
  ]

  if (!dict) {
    return null // Or a loading spinner
  }

  return (
    <section id="offers" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
              {dict.offers.title_part1} <span className="text-primary">{dict.offers.title_part2}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{dict.offers.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {offers.map((offer, index) => (
            <div
              key={offer.name_key}
              className={`group relative rounded-2xl p-6 transition-all duration-300 hover:scale-105 h-full flex flex-col ${
                offer.featured
                  ? "bg-primary border-2 border-primary shadow-2xl shadow-primary/20"
                  : "bg-card border-2 border-border hover:border-primary/50"
              }`}
            >
              {/* Featured badge */}
              {offer.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-white text-primary px-4 py-1 rounded-full text-sm font-semibold">
                    {dict.offers.most_popular}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${offer.featured ? "text-white" : "text-card-foreground"}`}>
                  {dict.offers[offer.name_key]}
                </h3>
                <div className="mb-3">
                  <span className={`text-4xl font-bold ${offer.featured ? "text-white" : "text-primary"}`}>
                    {offer.price}
                  </span>
                  <span className={`text-lg ${offer.featured ? "text-white/80" : "text-muted-foreground"}`}>
                    {dict.offers[offer.period_key]}
                  </span>
                </div>
                <p className={`text-sm ${offer.featured ? "text-white/90" : "text-muted-foreground"}`}>
                  {dict.offers[offer.description_key]}
                </p>
              </div>

              {/* Features list */}
              <div className="mb-6 flex-grow">
                <ul className="space-y-3">
                  {offer.features_keys.map((featureKey: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check
                        className={`w-4 h-4 mr-3 flex-shrink-0 ${offer.featured ? "text-white" : "text-primary"}`}
                      />
                      <span className={`text-sm ${offer.featured ? "text-white/90" : "text-muted-foreground"}`}>
                        {featureKey.split(".").reduce((o, i) => o[i], dict.offers)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <Button
                  className={`w-full rounded-full font-semibold transition-all duration-300 ${
                    offer.featured
                      ? "bg-background text-primary hover:bg-muted"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {dict.offers[offer.buttonText_key]}
                </Button>
              </div>

              {/* Hover border effect */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  offer.featured ? "border-2 border-white/30" : "border-2 border-primary"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">{dict.offers.custom_solution_prompt}</p>
          <Button
            variant="outline"
            className="rounded-full border-primary text-primary hover:text-primary-foreground hover:bg-primary/10 bg-transparent px-8"
          >
            {dict.offers.contact_custom_quote}
          </Button>
        </div>
      </div>
    </section>
  )
}
