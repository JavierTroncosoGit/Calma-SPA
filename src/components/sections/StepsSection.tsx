"use client"

import * as React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { siteConfig } from "@/lib/config"

export function StepsSection() {
  const data = siteConfig.sections.find((s) => s.type === "steps")
  if (!data) return null

  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Track scroll within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  })

  // The waterline scales from 0 to 1 as the user scrolls
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id={data.id} className="py-20 md:py-32 bg-bg-primary relative overflow-hidden" ref={sectionRef}>
      {/* Decorative background blurs to mimic water reflections */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-(--max-w-content) px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="relative text-center max-w-4xl mx-auto mb-20 md:mb-32 flex flex-col items-center">
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

        {/* Vertical Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Background Line (Empty Channel) */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-1 bg-primary/10 rounded-full" />
          
          {/* Active Line (Water flowing) */}
          <motion.div 
            className="absolute top-0 left-6 md:left-1/2 md:-translate-x-1/2 w-1 bg-gradient-to-b from-primary/50 to-primary rounded-full shadow-[0_0_15px_rgba(0,74,69,0.5)] origin-top"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-16 md:gap-32">
            {data.steps.map((step: any, idx: number) => {
              const isEven = idx % 2 === 0
              
              return (
                <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Node (Water Droplet) */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0.5, borderColor: 'rgba(0, 74, 69, 0)' }}
                      whileInView={{ scale: 1, opacity: 1, borderColor: '#004a45' }}
                      viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-[3px] md:border-4 flex items-center justify-center shadow-lg relative group"
                    >
                      {/* Inner dot */}
                      <span className="font-titles font-bold text-lg md:text-xl text-primary">{step.number}</span>
                      
                      {/* Ping effect when active */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1.5 }}
                        viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border-2 border-primary/30"
                      />
                    </motion.div>
                  </div>

                  {/* Empty space for desktop alignment */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className={`w-full pl-20 md:w-1/2 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}
                  >
                    <div className="relative group">
                      {/* Hover floating effect wrapper */}
                      <div className="relative z-10 p-8 md:p-10 rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-primary/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,74,69,0.08)] transition-all duration-700 ease-out hover:-translate-y-2">
                        {/* Hover subtle background glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem] pointer-events-none" />
                        
                        <h3 className="font-titles text-2xl md:text-3xl text-text-secondary mb-4 tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-lg text-text-primary/70 leading-relaxed font-light">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
