"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Sun, Moon, ChevronDown } from "lucide-react"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import { getDictionary } from "@/lib/get-dictionary" // Import the dictionary loader

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [dict, setDict] = useState<any>(null) // State to hold the dictionary

  useEffect(() => {
    const loadDictionary = async () => {
      const loadedDict = await getDictionary(language)
      setDict(loadedDict)
    }
    loadDictionary()
  }, [language]) // Reload dictionary when language changes

  const navItems = [
    { name: dict?.header.our_work || "Our Work", href: "/#work" },
    { name: dict?.header.offers || "Offers", href: "/#offers" },
    { name: dict?.header.services || "Services", href: "/#services" },
    { name: dict?.header.testimonials || "Testimonials", href: "/#testimonials" },
    { name: dict?.header.faq || "FAQ", href: "/#faq" },
    { name: dict?.header.contact || "Contact", href: "/contact" },
  ]

  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)

  const languages = [
    {
      code: "fr",
      name: "Français",
      flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
    },
    {
      code: "en",
      name: "English",
      flag: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  if (!dict) {
    return null // Or a loading spinner
  }

  return (
    <motion.header ref={headerRef} className="fixed top-0 left-0 right-0 z-40 w-full">
      <motion.div
        animate={{
          backdropFilter: visible ? "blur(10px)" : "none",
          boxShadow: visible ? "0 0 24px rgba(34, 111, 211, 0.1), 0 1px 1px rgba(0, 0, 0, 0.05)" : "none",
          width: visible ? "85%" : "100%",
          y: visible ? 20 : 0,
          backgroundColor: visible ? "var(--card)" : "transparent", // Use theme-aware background
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        style={{
          minWidth: "800px",
          borderRadius: visible ? "9999px" : "9999px",
        }}
        className={`relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start px-4 py-2 lg:flex ${
          visible ? "bg-card" : "bg-transparent" // Use theme-aware background
        }`}
      >
        <Link href="/" className="relative z-20 mr-4 flex items-center px-2 py-1">
          <div className="h-12 w-auto">
            <Image
              src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
              alt="Nuxesdweb"
              width={120}
              height={48}
              className="h-full w-auto object-contain"
              priority
            />
          </div>
        </Link>

        <motion.div
          onMouseLeave={() => setHovered(null)}
          className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium lg:flex"
        >
          {navItems.map((item, idx) => (
            <div key={`nav-item-${idx}`} className="relative">
              <Link
                onMouseEnter={() => setHovered(idx)}
                className={`relative px-4 py-2 text-foreground ${
                  // Use theme-aware text
                  pathname && pathname === item.href ? "font-semibold" : ""
                } hover:text-primary transition-colors`}
                href={item.href}
              >
                {hovered === idx && (
                  <motion.div layoutId="hovered" className="absolute inset-0 h-full w-full rounded-full" />
                )}
                <span className="relative z-20 after:absolute after:bottom-[-4px] after:left-1/2 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:-translate-x-1/2 hover:after:w-full">
                  {item.name}
                </span>
              </Link>
            </div>
          ))}
        </motion.div>

        <div className="hidden md:flex items-center justify-end space-x-4 relative z-30">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-foreground hover:bg-muted/10 transition-colors" // Use theme-aware text and background
            title={theme === "dark" ? dict.header.switch_to_light_mode : dict.header.switch_to_dark_mode}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded-full text-foreground hover:bg-muted/10 transition-colors" // Use theme-aware text and background
            >
              <div className="w-5 h-5 rounded-full overflow-hidden">
                <Image
                  src={currentLanguage.flag || "/placeholder.svg"}
                  alt={currentLanguage.name}
                  width={20}
                  height={20}
                  className="object-cover w-full h-full"
                />
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {languageDropdownOpen && (
              <div className="absolute right-0 top-12 bg-popover/90 backdrop-blur-sm rounded-lg shadow-lg border border-border py-2 min-w-[120px]">
                {" "}
                {/* Use theme-aware background and border */}
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as "en" | "fr")
                      setLanguageDropdownOpen(false)
                    }}
                    className={`flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-primary/20 transition-colors ${
                      lang.code === language ? "bg-primary/10" : ""
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full overflow-hidden">
                      <Image
                        src={lang.flag || "/placeholder.svg"}
                        alt={lang.name}
                        width={16}
                        height={16}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="text-popover-foreground text-sm">{lang.name}</span> {/* Use theme-aware text */}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/contact">
            <Button className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 rounded-full">
              {dict.header.get_a_quote}
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        animate={{
          backdropFilter: visible ? "blur(10px)" : "none",
          boxShadow: visible ? "0 0 24px rgba(34, 111, 211, 0.1), 0 1px 1px rgba(0, 0, 0, 0.05)" : "none",
          width: visible ? "90%" : "100%",
          paddingRight: visible ? "12px" : "16px",
          paddingLeft: visible ? "12px" : "16px",
          y: visible ? 20 : 0,
          backgroundColor: visible ? "var(--card)" : "transparent", // Use theme-aware background
        }}
        style={{
          borderRadius: visible ? "9999px" : "2rem",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        className={`relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-0 py-2 lg:hidden ${
          visible ? "bg-card" : "bg-transparent" // Use theme-aware background
        }`}
      >
        <div className="flex w-full flex-row items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="h-10 w-auto">
              <Image
                src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
                alt="Nuxesdweb"
                width={100}
                height={40}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </Link>

          <button className="p-2 rounded-full text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {" "}
            {/* Use theme-aware text */}
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40" // Use theme-aware background
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />

              <motion.div
                ref={menuRef}
                className="absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-card/90 backdrop-blur-md px-4 py-8 shadow-lg border border-border" // Use theme-aware background and border
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="w-full space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                      className="w-full"
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center py-3 px-4 rounded-lg font-medium text-base transition-all ${
                          pathname && pathname === item.href
                            ? "bg-primary/20 text-primary"
                            : "text-foreground hover:bg-primary/10" // Use theme-aware text
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="w-full flex items-center justify-between pt-4 border-t border-border">
                  {" "}
                  {/* Use theme-aware border */}
                  <div className="flex items-center space-x-4">
                    {/* Theme Toggle */}
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-full text-foreground hover:bg-muted/10 transition-colors" // Use theme-aware text and background
                      title={theme === "dark" ? dict.header.switch_to_light_mode : dict.header.switch_to_dark_mode}
                    >
                      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    {/* Language Switcher */}
                    <div className="flex items-center space-x-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as "en" | "fr")
                            setMobileMenuOpen(false)
                          }}
                          className={`p-1 rounded-full ${lang.code === language ? "ring-2 ring-primary" : ""}`}
                        >
                          <div className="w-6 h-6 rounded-full overflow-hidden">
                            <Image
                              src={lang.flag || "/placeholder.svg"}
                              alt={lang.name}
                              width={24}
                              height={24}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full mt-4">
                  <Link href="/contact" className="w-full">
                    <Button
                      className="w-full bg-primary text-white hover:bg-primary/90 rounded-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {dict.header.get_a_quote}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  )
}
