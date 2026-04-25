"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Globe, ExternalLink } from "lucide-react"
import { siteConfig } from "@/lib/config"

export function Footer() {
  const data = siteConfig.sections.find((s) => s.type === "footer")
  if (!data) return null

  return (
    <footer id={data.id} className="bg-bg-primary pt-20 pb-10 border-t border-border/50">
      <div className="mx-auto max-w-(--max-w-content) px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="relative h-10 w-32">
              <Image
                src={siteConfig.brand.logo.src}
                alt={siteConfig.brand.logo.alt}
                fill
                className="object-contain"
              />
            </Link>
            <p className="text-text-primary/70 leading-relaxed max-w-xs">
              {data.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-titles text-xl text-text-secondary">Navegación</h4>
            <nav className="flex flex-col gap-4">
              <Link href="#beneficios" className="text-text-primary/70 hover:text-accent transition-colors">Beneficios</Link>
              <Link href="#como-funciona" className="text-text-primary/70 hover:text-accent transition-colors">Cómo funciona</Link>
              <Link href="#faq" className="text-text-primary/70 hover:text-accent transition-colors">Preguntas frecuentes</Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-6">
            <h4 className="font-titles text-xl text-text-secondary">Contacto</h4>
            <div className="flex flex-col gap-4 text-text-primary/70">
              <p>WhatsApp: {siteConfig.contact.whatsapp.number}</p>
              <div className="flex gap-4 pt-2">
                {data.social?.instagram && (
                  <Link href={data.social.instagram} target="_blank" className="p-3 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all min-w-[44px] min-h-[44px] flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </Link>
                )}
                {data.social?.facebook && (
                  <Link href={data.social.facebook} target="_blank" className="p-3 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all min-w-[44px] min-h-[44px] flex items-center justify-center">
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-text-primary/50">
          <p>© {new Date().getFullYear()} {siteConfig.brand.name}. Todos los derechos reservados.</p>
          <p className="flex items-center gap-2">
            Hecho con ❤️ por 
            <Link href="https://darw.cl" target="_blank" className="font-bold text-text-primary hover:text-accent transition-colors">
              DARW
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
