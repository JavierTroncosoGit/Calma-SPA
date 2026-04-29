"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { siteConfig } from "@/lib/config"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const data = siteConfig.sections.find((s) => s.type === "hero")
  const containerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!containerRef.current || siteConfig.animations.level < 3) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } })

      // Animación de entrada para el contenido centrado
      tl.from(contentRef.current?.children || [], {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        delay: 0.2
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  if (!data) return null

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Background Image (Pantalla Completa) */}
      <div className="absolute inset-0 z-0">
        {data.media?.src ? (
          <Image
            src={data.media.src}
            alt={data.headline}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-primary/20" />
        )}
        
        {/* Overlay / Filtro negro al 40% para resaltar textos */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none z-2" />
      </div>

      {/* Content (Centrado y Moderno) */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 flex flex-col items-center text-center mt-16">
        
        <div ref={contentRef} className="flex flex-col items-center gap-6">
          {data.badge && (
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-widest uppercase mb-4">
              {data.badge}
            </span>
          )}
          
          <h1 className="font-titles text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] text-white font-bold tracking-tight">
            {data.headline}
          </h1>
          
          {data.subheadline && (
            <p className="text-lg md:text-2xl text-white max-w-3xl leading-relaxed font-medium mt-2 mb-6 drop-shadow-md">
              {data.subheadline}
            </p>
          )}
          
          <div className="flex flex-wrap justify-center gap-4">
            {data.ctas.map((cta: any, idx: number) => (
              <Link
                key={idx}
                href={cta.href}
                className={cn(
                  buttonVariants({ 
                    size: "lg", 
                    variant: cta.variant === "primary" ? "default" : "outline" 
                  }),
                  "px-10 py-7 text-lg rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105",
                  cta.variant === "primary" 
                    ? "bg-accent text-white font-bold border-2 border-accent hover:bg-transparent hover:text-white" 
                    : "border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
                )}
              >
                {cta.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
