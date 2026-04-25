"use client"

import * as React from "react"
import { Users, Zap, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/config"

const iconMap: Record<string, any> = {
  users: Users,
  zap: Zap,
  "map-pin": MapPin,
}

export function StatsSection() {
  const data = siteConfig.sections.find((s) => s.type === "stats")
  if (!data) return null

  return (
    <section id={data.id} className="py-20 md:py-32 bg-bg-secondary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto max-w-(--max-w-content) px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {data.items.map((item: any, idx: number) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8,
                  delay: idx * 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="group relative"
              >
                {/* Main Card Container */}
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative p-10 rounded-[2.5rem] bg-bg-primary border border-primary/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,74,69,0.08)] transition-all duration-500 overflow-hidden flex flex-col items-center text-center gap-8"
                >
                  {/* Glassmorphism Background Layer */}
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />
                  
                  {/* Decorative Icon Glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Icon Container */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-3xl bg-bg-secondary border border-primary/5 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out z-10">
                      {Icon && <Icon className="w-10 h-10 stroke-[1.5]" />}
                    </div>
                    {/* Floating accents */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary/20 rounded-full blur-sm group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700" />
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary/10 rounded-full blur-md group-hover:-translate-x-3 group-hover:translate-y-3 transition-transform duration-700 delay-75" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-4 relative z-10">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + (idx * 0.2), duration: 0.6 }}
                      className="text-xl md:text-2xl font-titles text-text-secondary font-medium leading-tight tracking-tight px-2"
                    >
                      {item.text || item.label}
                    </motion.div>
                    
                    {/* Visual Divider */}
                    <div className="w-8 h-1 bg-primary/20 mx-auto rounded-full group-hover:w-16 transition-all duration-500 ease-in-out" />
                  </div>
                </motion.div>
                
                {/* Ambient Shadow (Bottom) */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
