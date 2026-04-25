"use client"

import * as React from "react"
import { ShieldCheck, Sun, Banknote } from "lucide-react"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const iconMap: Record<string, any> = {
  "shield-check": ShieldCheck,
  sun: Sun,
  banknote: Banknote,
}

export function BenefitsGrid() {
  const data = siteConfig.sections.find((s) => s.type === "benefits-grid")
  if (!data) return null

  return (
    <section id={data.id} className="py-12 lg:py-20 bg-bg-primary">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.items.map((item: any, idx: number) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full border-none shadow-none bg-bg-secondary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-3xl">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    <CardTitle className="font-titles text-2xl text-text-secondary">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-primary/70 leading-relaxed">
                      {item.body}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
