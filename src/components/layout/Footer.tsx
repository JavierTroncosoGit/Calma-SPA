"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Instagram, Send, ShieldCheck, CreditCard, Award } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { CoverageMap } from "@/components/ui/CoverageMap"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Footer() {
  const data = siteConfig.sections.find((s) => s.type === "footer")
  if (!data) return null

  return (
    <footer id={data.id} className="relative bg-white pt-24 pb-12 overflow-hidden border-t border-primary/5">
      
      {/* Nivel 1: Pre-Footer (Mapa + CTA) */}
      <div className="mx-auto max-w-(--max-w-content) px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Lado Izquierdo: Mapa */}
          <div className="lg:col-span-7 relative order-2 lg:order-1">
            <div className="flex flex-col gap-4 mb-8 text-center lg:text-left">
              <h3 className="font-titles text-2xl md:text-3xl text-text-secondary tracking-tight">
                {data.coverageTitle}
              </h3>
              <p className="text-text-primary/60 text-lg font-light max-w-md mx-auto lg:mx-0">
                {data.coverageSub}
              </p>
            </div>
            <CoverageMap />
          </div>

          {/* Lado Derecho: CTA */}
          <div className="relative lg:col-span-5 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-primary p-10 md:p-14 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-1000 group-hover:scale-125" />
              
              <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
                <h2 className="font-titles text-4xl md:text-5xl leading-[1.1] tracking-tight">
                  {data.headline}
                </h2>
                <p className="text-white/80 text-lg font-light">
                  {data.subheadline}
                </p>
                <Link 
                  href="#contacto"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "secondary" }),
                    "bg-white text-primary hover:bg-white/90 px-10 py-7 text-xl rounded-2xl shadow-lg h-auto transition-all duration-300 hover:scale-105"
                  )}
                >
                  Agendar mi Spa
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Nivel 2: Cuerpo del Footer (Grid) */}
      <div className="mx-auto max-w-(--max-w-content) px-6 lg:px-8 border-t border-primary/10 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          
          {/* Columna 1: Brand & Trust */}
          <div className="flex flex-col gap-8">
            <Link href="/" className="relative h-10 w-36">
              <Image
                src={siteConfig.brand.logo.src}
                alt={siteConfig.brand.logo.alt}
                fill
                className="object-contain object-left grayscale brightness-50"
                sizes="(max-width: 768px) 144px, 144px"
              />
            </Link>
            <p className="text-text-primary/60 leading-relaxed font-light">
              {data.tagline}
            </p>
            {/* Trust Badges */}
            <div className="flex items-center gap-4 text-primary/40">
              <ShieldCheck className="w-6 h-6" />
              <CreditCard className="w-6 h-6" />
              <Award className="w-6 h-6" />
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="flex flex-col gap-8">
            <h4 className="font-titles text-lg text-text-secondary uppercase tracking-[0.2em] font-bold">Navegación</h4>
            <nav className="flex flex-col gap-4">
              {data.links.map((link: any, idx: number) => (
                <Link 
                  key={idx} 
                  href={link.href} 
                  className="group flex items-center gap-2 text-text-primary/70 hover:text-primary transition-colors duration-300 w-fit"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Columna 3: Comunidad */}
          <div className="flex flex-col gap-8">
            <h4 className="font-titles text-lg text-text-secondary uppercase tracking-[0.2em] font-bold">Comunidad</h4>
            <div className="flex flex-col gap-6">
              <p className="text-text-primary/60 font-light">Únete a nuestra burbuja de relajo en Instagram.</p>
              <Link 
                href={data.social.instagram} 
                target="_blank"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-primary/5 hover:bg-primary transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <Instagram className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-secondary group-hover:text-white transition-colors uppercase tracking-widest">{data.social.instagramHandle}</span>
                  <span className="text-xs text-text-primary/50 group-hover:text-white/60 transition-colors">Ver contenido real</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Columna 4: Contacto */}
          <div className="flex flex-col gap-8">
            <h4 className="font-titles text-lg text-text-secondary uppercase tracking-[0.2em] font-bold">Contacto</h4>
            <div className="flex flex-col gap-6">
              <a 
                href={`mailto:${siteConfig.sections.find(s => s.type === 'contact-form')?.destinationEmail || 'hola@calmaspa.cl'}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Send className="w-4 h-4" />
                </div>
                <span className="text-text-primary/70 group-hover:text-primary transition-colors">{siteConfig.sections.find(s => s.type === 'contact-form')?.destinationEmail || 'hola@calmaspa.cl'}</span>
              </a>
              <div className="pt-4 flex flex-col gap-2">
                <p className="text-xs text-text-primary/40 uppercase tracking-widest font-bold">Atención RM</p>
                <p className="text-text-primary/70">Lunes a Domingo — 09:00 a 20:00</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Nivel 3: Barra de Créditos */}
      <div className="mx-auto max-w-(--max-w-content) px-6 lg:px-8 border-t border-primary/5 py-8">
        <div className="flex flex-col md:grid md:grid-cols-3 items-center gap-8 text-[11px] text-text-primary/40 uppercase tracking-[0.15em] font-bold">
          <div className="md:text-left order-2 md:order-1">
            © {new Date().getFullYear()} {siteConfig.brand.name}.
          </div>
          <div className="md:text-center order-1 md:order-2 flex items-center gap-6">
            <Link href="/privacidad" className="hover:text-primary transition-colors">Privacidad</Link>
            <Link href="/terminos" className="hover:text-primary transition-colors">Términos</Link>
          </div>
          <div className="md:text-right order-3 flex items-center gap-2">
            Hecho con ❤️ por 
            <Link href="https://darw.cl" target="_blank" className="text-text-primary/60 hover:text-primary transition-colors">
              DARW
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
