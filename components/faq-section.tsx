"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getDictionary } from "@/lib/get-dictionary"

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const { language } = useLanguage()
  const [dict, setDict] = useState<any>(null)

  useEffect(() => {
    const loadDictionary = async () => {
      const loadedDict = await getDictionary(language)
      setDict(loadedDict)
    }
    loadDictionary()
  }, [language])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (faqRef.current && !faqRef.current.contains(event.target as Node)) {
        setOpenIndex(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (!dict) {
    return null // Or a loading spinner
  }

  const faqItems = [
    {
      question: dict.faq.q1,
      answer: dict.faq.a1,
    },
    {
      question: dict.faq.q2,
      answer: dict.faq.a2,
    },
    {
      question: dict.faq.q3,
      answer: dict.faq.a3,
    },
    {
      question: dict.faq.q4,
      answer: dict.faq.a4,
    },
    {
      question: dict.faq.q5,
      answer: dict.faq.a5,
    },
    {
      question: dict.faq.q6,
      answer: dict.faq.a6,
    },
  ]

  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
            {dict.faq.title_part1} <span className="text-primary">{dict.faq.title_part2}</span>
          </h3>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">{dict.faq.subtitle}</p>
        </div>

        <div ref={faqRef} className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface FaqItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}

function FaqItem({ question, answer, isOpen, onClick }: FaqItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary hover:ring-1 hover:ring-primary/20 group bg-card/20 backdrop-blur-sm">
      <button onClick={onClick} className="flex w-full items-center justify-between p-5 text-left focus:outline-none">
        <h3 className="font-medium text-card-foreground group-hover:text-primary transition-colors duration-300">
          {question}
        </h3>
        <ChevronDown
          className={`h-5 w-5 text-primary transition-transform duration-300 flex-shrink-0 ml-4 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
          transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, padding 0.2s ease-in-out",
          opacity: isOpen ? 1 : 0,
          padding: isOpen ? "0 20px 28px 20px" : "0 20px",
          overflow: "hidden",
        }}
      >
        <p className="text-muted-foreground pb-2">{answer}</p>
      </div>
    </div>
  )
}
