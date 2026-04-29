"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { siteConfig } from "@/lib/config"

function FAQItem({ 
  item, 
  isOpen, 
  onClick 
}: { 
  item: any; 
  isOpen: boolean; 
  onClick: () => void 
}) {
  return (
    <motion.div
      initial={false}
      className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,74,69,0.06)] transition-all duration-500 ease-out hover:shadow-[0_20px_50px_rgba(0,74,69,0.12)] cursor-pointer group"
      onClick={onClick}
    >
      <div className="px-8 md:px-12 py-8 flex items-center justify-between gap-6">
        <h3 className="font-titles text-xl md:text-2xl text-text-primary leading-tight font-medium tracking-tight group-hover:text-accent transition-colors duration-300">
          {item.question}
        </h3>
        
        {/* Animated Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center text-accent relative group-hover:bg-accent/10 transition-colors duration-300">
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="minus"
                initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute"
              >
                <Minus className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute"
              >
                <Plus className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Animated Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              height: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2, delay: 0.1 }
            }}
          >
            <div className="px-8 md:px-12 pb-10 pt-2 text-lg md:text-xl text-text-secondary leading-relaxed font-normal">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const data = siteConfig.sections.find((s) => s.type === "faq")
  // UX Golden Rule: First question open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!data) return null

  // Generate JSON-LD schema if required
  const faqSchema = data.schema ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.items.map((item: any) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null

  return (
    <section id={data.id} className="py-20 md:py-32 bg-bg-secondary relative">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        <div className="relative text-center mb-16 md:mb-24 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white border border-primary/10 text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-8 shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Transparencia Total
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-titles text-font-size-display text-text-secondary leading-[1.1] tracking-tight mb-8"
          >
            {data.headline}
          </motion.h2>

          {data.subheadline && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl text-text-primary/60 font-light max-w-2xl leading-relaxed"
            >
              {data.subheadline}
            </motion.p>
          )}
        </div>

        <div className="space-y-6">
          {data.items.map((item: any, idx: number) => (
            <FAQItem
              key={idx}
              item={item}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
