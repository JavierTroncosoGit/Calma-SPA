"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/config"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CTABanner() {
  const data = siteConfig.sections.find((s) => s.type === "cta-banner")
  if (!data) return null

  return (
    <section id={data.id} className="py-12 lg:py-20 bg-bg-secondary">
      <div className="mx-auto max-w-(--max-w-content) px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] bg-linear-to-r from-primary to-accent py-16 px-8 md:px-16 text-center text-white shadow-2xl"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-8">
            <h2 className="font-titles text-4xl md:text-5xl leading-tight">
              {data.headline}
            </h2>
            {data.subheadline && (
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                {data.subheadline}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              {data.ctas.map((cta: any, idx: number) => (
                <Link
                  key={idx}
                  href={cta.href}
                  className={cn(
                    buttonVariants({ size: "lg", variant: "secondary" }),
                    "bg-white text-primary hover:bg-white/90 px-10 py-7 text-xl rounded-2xl shadow-lg h-auto"
                  )}
                >
                  {cta.text}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
