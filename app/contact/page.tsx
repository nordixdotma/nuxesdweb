"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import { getDictionary } from "@/lib/get-dictionary"
import Head from "next/head"

export default function ContactPage() {
  const { language } = useLanguage()
  const [dict, setDict] = useState<any>(null)

  useEffect(() => {
    const loadDictionary = async () => {
      const loadedDict = await getDictionary(language)
      setDict(loadedDict)
    }
    loadDictionary()
  }, [language])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!dict) {
    return null // Or a loading spinner
  }

  return (
    <>
      <Head>
        <title>Contact Us - Nuxesdweb | Get Your Web Project Started</title>
        <meta
          name="description"
          content="Ready to start your web project? Contact Nuxesdweb for professional web development, design, and digital solutions. Get a free quote today."
        />
        <meta
          name="keywords"
          content="contact web developer, web development quote, web design consultation, Nuxesdweb contact"
        />
        <link rel="canonical" href="https://nuxesdweb.com/contact" />
        <meta property="og:title" content="Contact Us - Nuxesdweb | Get Your Web Project Started" />
        <meta
          property="og:description"
          content="Ready to start your web project? Contact Nuxesdweb for professional web development and design services."
        />
        <meta property="og:url" content="https://nuxesdweb.com/contact" />
      </Head>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden" translate="no">
        {/* Blurry glowing background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-[300px] h-[300px] rounded-full bg-[#226fd3]/20 blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-[400px] h-[400px] rounded-full bg-[#226fd3]/15 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-[#226fd3]/10 blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <Header />

          {/* Hero Section */}
          <section className="pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  {dict.contact_page.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-[#226fd3]">{dict.contact_page.title.split(" ").slice(-1)[0]}</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{dict.contact_page.subtitle}</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">{dict.contact_page.conversation_title}</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {dict.contact_page.conversation_description}
                    </p>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{dict.contact_page.email_us}</h3>
                        <p className="text-muted-foreground">hello@nuxesdweb.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{dict.contact_page.call_us}</h3>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{dict.contact_page.visit_us}</h3>
                        <p className="text-muted-foreground">New York, NY</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{dict.contact_page.business_hours}</h3>
                        <p className="text-muted-foreground">{dict.contact_page.mon_fri}</p>
                      </div>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="bg-muted/10 rounded-lg p-6 border border-border">
                    <div className="flex items-center space-x-3 mb-3">
                      <Globe className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">{dict.contact_page.quick_response_title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{dict.contact_page.quick_response_description}</p>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-8 border border-border">
                  <h3 className="text-2xl font-bold mb-6">{dict.contact_page.send_message_title}</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          {dict.contact_page.full_name}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder={dict.contact_page.full_name}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          {dict.contact_page.email_address}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                          {dict.contact_page.company}
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder={dict.contact_page.company}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          {dict.contact_page.phone_number}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder={dict.contact_page.phone_number}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                        {dict.contact_page.service_interested_in}
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">{dict.contact_page.select_service}</option>
                        <option value="web-development">{dict.contact_page.web_development}</option>
                        <option value="ui-ux-design">{dict.contact_page.ui_ux_design}</option>
                        <option value="ecommerce">{dict.contact_page.ecommerce_solutions}</option>
                        <option value="seo">{dict.contact_page.seo_optimization}</option>
                        <option value="mobile-development">{dict.contact_page.mobile_development}</option>
                        <option value="other">{dict.contact_page.other}</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        {dict.contact_page.message}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        placeholder={dict.contact_page.message_placeholder}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
                    >
                      {dict.contact_page.send_message_button}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </>
  )
}
