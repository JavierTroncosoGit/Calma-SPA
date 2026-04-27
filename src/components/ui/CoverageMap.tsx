"use client"

import * as React from "react"
import { motion } from "framer-motion"

/**
 * CoverageMap — Google Maps embed de la Región Metropolitana de Santiago.
 * 
 * Muestra un mapa real de Google Maps centrado en la RM, donde Google
 * resalta automáticamente los límites de la región al buscar el nombre.
 * El componente agrega un estilo premium con bordes redondeados, sombras
 * y badges informativos flotantes.
 */
export function CoverageMap() {
  const [loaded, setLoaded] = React.useState(false)

  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      {/* Background ambient glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 0.08, scale: 1.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-primary rounded-full blur-[80px] pointer-events-none -z-10"
      />

      {/* Map container with premium styling */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden border border-primary/10 shadow-2xl shadow-primary/5 bg-white"
      >
        {/* Loading skeleton */}
        {!loaded && (
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary/5 to-primary/10 animate-pulse flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              <span className="text-[10px] text-primary/40 uppercase tracking-[0.2em] font-bold">
                Cargando mapa
              </span>
            </div>
          </div>
        )}

        {/* Google Maps iframe — La búsqueda "Región Metropolitana" 
            hace que Google Maps resalte los límites regionales automáticamente */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425867.0285985094!2d-70.99451885!3d-33.47283025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5410425af2f%3A0x8475d53c400f0931!2sRegi%C3%B3n%20Metropolitana%20de%20Santiago!5e0!3m2!1ses!2scl!4v1"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de cobertura — Región Metropolitana de Santiago"
          className="w-full aspect-[4/3] md:aspect-[16/10]"
          onLoad={() => setLoaded(true)}
        />

        {/* Top gradient overlay for visual blending */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
        
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
      </motion.div>

      {/* Floating badge — Zona Activa */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-6 -right-2 md:right--3 bg-white/95 backdrop-blur-md border border-primary/10 py-2 px-4 rounded-xl shadow-lg z-20"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.15em]">
            Servicio Activo
          </span>
        </div>
      </motion.div>

      {/* Floating badge — Comunas cubiertas */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-8 -left-2 md:left--3 bg-white/95 backdrop-blur-md border border-primary/10 py-2.5 px-4 rounded-xl shadow-lg z-20"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-primary leading-none">52</span>
          <span className="text-[9px] text-primary/60 uppercase tracking-widest font-semibold leading-tight">
            Comunas<br />cubiertas
          </span>
        </div>
      </motion.div>
    </div>
  )
}
