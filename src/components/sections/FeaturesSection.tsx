"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/config"

export function FeaturesSection() {
  const data = siteConfig.sections.find((s) => s.type === "features")
  if (!data) return null

  return (
    <section id={data.id} className="relative bg-bg-secondary text-text-primary py-20 md:py-32">
      <div className="mx-auto max-w-(--max-w-content) px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="relative text-center max-w-4xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          {data.sectionLabel && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white border border-primary/10 text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-8 shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {data.sectionLabel}
            </motion.div>
          )}
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
              className="text-lg md:text-xl text-text-primary/60 max-w-2xl mx-auto font-light leading-relaxed"
            >
              {data.subheadline}
            </motion.p>
          )}
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative items-start">
          
          {/* Left Side: Sticky Visuals (Desktop) */}
          <div className="hidden lg:block lg:w-5/12 sticky top-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-[600px] w-full rounded-[3rem] overflow-hidden bg-bg-primary border border-primary/10 shadow-2xl flex items-center justify-center group relative"
            >
              {/* Glassmorphism Water Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0" />
              
              {/* Abstract fluid shapes */}
              <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[80px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
              <div className="absolute bottom-[10%] right-[10%] w-64 h-64 bg-primary/15 rounded-full blur-[60px] mix-blend-multiply animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/40 rounded-full blur-[100px] z-1" />
              
              <div className="relative z-10 p-12 text-center flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full border border-primary/20 flex items-center justify-center backdrop-blur-md bg-white/30 text-primary">
                  <div className="w-10 h-10 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side / Mobile Layout: The Cards */}
          <div className="w-full lg:w-7/12 flex flex-col gap-6 relative z-10 pb-[10vh]">
            {data.items.map((item: any, idx: number) => {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  // Parallax Stacking for mobile and desktop
                  className="sticky group relative flex flex-col justify-between p-8 md:p-12 rounded-[2.5rem] bg-white border border-primary/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-[1.5s] ease-out hover:rounded-[3rem]"
                  style={{ top: `calc(120px + ${idx * 40}px)` }}
                >
                  {/* Subtle Hover Gradient & Blur Follower */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out" />
                  <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 opacity-0 group-hover:opacity-100 blur-[80px] rounded-full transition-opacity duration-1000 pointer-events-none" />

                  {/* Title & Badges */}
                  <div className="relative z-10 mb-8 md:mb-12">
                    <h3 className="text-3xl md:text-4xl font-titles text-text-secondary font-medium leading-tight tracking-tight mb-6 mt-4">
                      {item.title}
                    </h3>

                    {/* Badges */}
                    {item.badges && (
                      <div className="flex flex-wrap gap-3 mb-2">
                        {item.badges.map((badge: string, bIdx: number) => (
                          <motion.span 
                            key={bIdx} 
                            whileHover={{ scale: 1.05 }}
                            className="relative inline-flex items-center px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-primary/10 overflow-hidden group-hover:border-primary/30 transition-colors"
                          >
                            <motion.span 
                              className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
                              initial={{ x: '-100%' }}
                              animate={{ x: '200%' }}
                              transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: bIdx * 0.2 }}
                            />
                            <span className="relative z-10">{badge}</span>
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Body Text */}
                  <div className="relative z-10 mt-auto">
                    <p className="text-lg md:text-xl text-text-primary/70 leading-relaxed font-light group-hover:text-text-primary transition-colors duration-500">
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
        </div>
      </div>
    </section>
  )
}
