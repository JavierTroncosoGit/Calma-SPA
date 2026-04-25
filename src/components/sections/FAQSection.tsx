"use client"

import * as React from "react"
import { siteConfig } from "@/lib/config"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
  const data = siteConfig.sections.find((s) => s.type === "faq")
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
    <section id={data.id} className="py-12 lg:py-20 bg-bg-primary">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-titles text-font-size-display text-text-secondary">
            {data.headline}
          </h2>
        </div>

        <Accordion className="w-full space-y-4">
          {data.items.map((item: any, idx: number) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`}
              className="border-none bg-bg-secondary rounded-2xl px-6 overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="font-titles text-lg text-text-secondary hover:no-underline py-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-text-primary/70 pb-6 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
