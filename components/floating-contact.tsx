"use client"

import { useState, useRef, useEffect } from "react"
import { Phone, Mail, Headphones, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { getDictionary } from "@/lib/get-dictionary"

// WhatsApp SVG Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
  </svg>
)

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { language } = useLanguage()
  const [dict, setDict] = useState<any>(null)

  useEffect(() => {
    const loadDictionary = async () => {
      const loadedDict = await getDictionary(language)
      setDict(loadedDict)
    }
    loadDictionary()
  }, [language])

  const contactOptions = [
    {
      icon: WhatsAppIcon,
      label_key: "whatsapp",
      href: "https://wa.me/11234567890",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: Mail,
      label_key: "email",
      href: "mailto:hello@nuxesdweb.com",
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      icon: Phone,
      label_key: "call_now",
      href: "tel:+15551234567",
      color: "bg-primary hover:bg-primary/80",
    },
  ]

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    // Only add event listener when the menu is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen])

  if (!dict) {
    return null // Or a loading spinner
  }

  return (
    <div ref={containerRef} className="fixed bottom-4 left-4 z-50">
      {/* Contact Options */}
      <div
        className={cn(
          "flex flex-col space-y-3 mb-4 transition-all duration-300 transform",
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none",
        )}
      >
        {contactOptions.map((option, index) => {
          const IconComponent = option.icon
          return (
            <a
              key={option.label_key}
              href={option.href}
              target={option.href.startsWith("http") ? "_blank" : "_self"}
              rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={cn(
                "group flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg transition-all duration-300 transform hover:scale-110",
                option.color,
              )}
              title={dict.floating_contact[option.label_key]}
              onClick={() => setIsOpen(false)} // Close when clicking a contact option
            >
              <IconComponent className="w-6 h-6" />

              {/* Tooltip */}
              <span className="absolute left-16 px-3 py-1 bg-popover text-popover-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {dict.floating_contact[option.label_key]}
                <span className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-popover"></span>
              </span>
            </a>
          )
        })}
      </div>

      {/* Main Contact Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative flex items-center justify-center w-14 h-14 bg-primary hover:bg-primary/80 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none",
          isOpen ? "rotate-45" : "",
        )}
        aria-label="Contact"
      >
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></div>
        <div className="absolute inset-0 rounded-full bg-primary animate-pulse opacity-50"></div>

        {/* Icon */}
        <div className="relative z-10">
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-300" />
          ) : (
            <Headphones className="w-6 h-6 transition-transform duration-300" />
          )}
        </div>
      </button>
    </div>
  )
}
