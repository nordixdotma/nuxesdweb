"use client"

import Link from "next/link"
import Image from "next/image" // Import Image component
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getDictionary } from "@/lib/get-dictionary"
import { useEffect, useState } from "react"

export default function Footer() {
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
    <footer id="contact" className="relative mt-20 text-white overflow-hidden rounded-t-[50px]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1640330273669-44d7c582471c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Placeholder image for the footer background
          alt="Footer Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Footer content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-4">
          <div className="flex flex-col">
            {/* Logo */}
            <div className="flex items-center mb-6">
              <div className="h-12 w-auto">
                <Image
                  src="/whitelogo.png"
                  alt="Nuxesdweb"
                  width={150}
                  height={48}
                  className="h-full w-auto object-contain"
                  priority
                />
              </div>
            </div>
            <p className="text-base opacity-80 mt-2 leading-relaxed mb-6">{dict.footer.description}</p>

            {/* Social Links */}
            <div className="flex space-x-5">
              <Link href="#" className="opacity-80 hover:opacity-100 hover:text-[#226fd3] transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="opacity-80 hover:opacity-100 hover:text-[#226fd3] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" className="opacity-80 hover:opacity-100 hover:text-[#226fd3] transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="opacity-80 hover:opacity-100 hover:text-[#226fd3] transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links and Company in one row on mobile, stacked on larger screens */}
          <div className="grid grid-cols-2 gap-10 md:col-span-2 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-xl font-bold">{dict.footer.quick_links}</h3>
              <ul className="space-y-4">
                {" "}
                {/* Reverted to space-y-4 */}
                <li>
                  <Link
                    href="/#work"
                    className="footer-link opacity-80 hover:opacity-100 hover:text-[#226fd3] transition-colors relative"
                  >
                    {dict.footer.our_work}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="footer-link opacity-80 hover:opacity-100 hover:text-[#226fd3] transition-colors relative"
                  >
                    {dict.footer.services}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#testimonials"
                    className="footer-link opacity-80 hover:opacity-100 hover:text-[#226fd3] transition-colors relative"
                  >
                    {dict.footer.testimonials}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="footer-link opacity-80 hover:opacity-100 hover:text-[#226fd3] transition-colors relative"
                  >
                    {dict.footer.faq}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-xl font-bold">{dict.footer.company}</h3>
              <ul className="space-y-4">
                {" "}
                {/* Reverted to space-y-4 */}
                <li>
                  <Link
                    href="/#about"
                    className="footer-link opacity-80 hover:opacity-100 hover:text-[#226fd3] transition-colors relative"
                  >
                    {dict.footer.about_us}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="footer-link opacity-80 hover:opacity-100 hover:text-[#226fd3] transition-colors relative"
                  >
                    {dict.footer.contact}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-link opacity-80 hover:opacity-100 hover:text-[#226fd3] transition-colors relative"
                  >
                    {dict.footer.privacy_policy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-link opacity-80 hover:opacity-100 hover:text-[#226fd3] transition-colors relative"
                  >
                    {dict.footer.terms_of_service}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 md:mt-0">
            {" "}
            {/* Added margin top for mobile stacking */}
            <h3 className="mb-6 text-xl font-bold">{dict.footer.get_in_touch}</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#226fd3]" />
                <span className="text-sm opacity-80">{dict.footer.email_us}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#226fd3]" />
                <span className="text-sm opacity-80">{dict.footer.call_us}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#226fd3]" />
                <span className="text-sm opacity-80">{dict.footer.visit_us}</span>
              </div>
            </div>
            <div>
              <p className="text-sm opacity-80 mb-4">{dict.footer.newsletter_prompt}</p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder={dict.footer.email_placeholder}
                  className="w-full px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#226fd3] focus:border-transparent backdrop-blur-sm"
                />
                <Button className="w-full bg-[#226fd3] text-white hover:bg-[#226fd3]/90 rounded-full">
                  {dict.footer.subscribe}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-10 text-center">
          <p className="text-base opacity-80">
            &copy; {new Date().getFullYear()} Nuxesdweb. {dict.footer.copyright}
          </p>
        </div>
      </div>

      <style jsx>{`
      .footer-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #226fd3;
        transition: width 0.3s ease;
      }
      .footer-link:hover::after {
        width: 100%;
      }
    `}</style>
    </footer>
  )
}
