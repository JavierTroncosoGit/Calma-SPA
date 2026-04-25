"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/config"

export function StepsSection() {
  const data = siteConfig.sections.find((s) => s.type === "steps")
  if (!data) return null

  return (
    <section id={data.id} className="py-12 lg:py-20 bg-bg-secondary overflow-hidden">
      <div className="mx-auto max-w-(--max-w-content) px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          {data.sectionLabel && (
            <span className="text-accent font-semibold tracking-wider uppercase text-sm">
              {data.sectionLabel}
            </span>
          )}
          <h2 className="mt-4 font-titles text-font-size-display text-text-secondary leading-tight">
            {data.headline}
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-primary/10 -z-0" />

          {data.steps.map((step: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left group"
            >
              <div className="w-24 h-24 rounded-full bg-bg-primary border-8 border-bg-secondary flex items-center justify-center text-4xl font-titles font-bold text-primary shadow-xl group-hover:scale-110 transition-transform duration-300 mb-6">
                {step.number}
              </div>
              <h3 className="font-titles text-2xl text-text-secondary mb-3">
                {step.title}
              </h3>
              <p className="text-text-primary/70 leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
