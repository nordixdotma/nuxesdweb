import type React from "react"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import { ThemeProvider } from "@/lib/theme-context"
import { LanguageProvider } from "@/lib/language-context"
import "./globals.css"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Nuxesdweb — Creative Web Solutions That Drive Results",
  description:
    "We design and develop fast, elegant, and responsive websites tailored to your brand. Professional web development, UI/UX design, e-commerce solutions, and SEO optimization services.",
  keywords:
    "web development, web design, UI/UX design, e-commerce, SEO optimization, responsive websites, mobile development, performance optimization, creative web solutions",
  authors: [{ name: "Nuxesdweb" }],
  creator: "Nuxesdweb",
  publisher: "Nuxesdweb",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nuxesdweb.com",
    siteName: "Nuxesdweb",
    title: "Nuxesdweb — Creative Web Solutions That Drive Results",
    description:
      "We design and develop fast, elegant, and responsive websites tailored to your brand. Professional web development services that make an impact.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nuxesdweb - Creative Web Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuxesdweb — Creative Web Solutions That Drive Results",
    description: "We design and develop fast, elegant, and responsive websites tailored to your brand.",
    images: ["/og-image.jpg"],
    creator: "@nuxesdweb",
  },
  alternates: {
    canonical: "https://nuxesdweb.com",
    languages: {
      "en-US": "https://nuxesdweb.com",
      "fr-FR": "https://nuxesdweb.com/fr",
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://nuxesdweb.com" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#226fd3" />
        <meta name="msapplication-TileColor" content="#226fd3" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Nuxesdweb",
              url: "https://nuxesdweb.com",
              logo: "https://nuxesdweb.com/favicon.png",
              description:
                "Creative web solutions that drive results. We design and develop fast, elegant, and responsive websites tailored to your brand.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "New York",
                addressRegion: "NY",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-555-123-4567",
                contactType: "customer service",
                email: "hello@nuxesdweb.com",
              },
              sameAs: [
                "https://twitter.com/nuxesdweb",
                "https://linkedin.com/company/nuxesdweb",
                "https://facebook.com/nuxesdweb",
              ],
              service: [
                {
                  "@type": "Service",
                  name: "Web Development",
                  description: "Custom websites built with modern technologies",
                },
                {
                  "@type": "Service",
                  name: "UI/UX Design",
                  description: "Beautiful and intuitive designs that engage users",
                },
                {
                  "@type": "Service",
                  name: "E-commerce Solutions",
                  description: "Complete online stores with secure payment processing",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={roboto.className} translate="no">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
