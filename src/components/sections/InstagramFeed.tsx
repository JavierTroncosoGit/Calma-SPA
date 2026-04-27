"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/config"

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

export function InstagramFeed() {
  const data = siteConfig.sections.find((s) => s.type === "instagram-feed")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Process Instagram embeds once the script is loaded
  React.useEffect(() => {
    if (!mounted) return

    const processEmbeds = () => {
      if (typeof window !== "undefined" && window.instgrm) {
        window.instgrm.Embeds.process()
      }
    }

    processEmbeds()
    const timer1 = setTimeout(processEmbeds, 1000)
    const timer2 = setTimeout(processEmbeds, 3000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [mounted])

  if (!data) return null

  // Usar /p/ como ruta base asegura que todos los videos (sean Reels o Posts de video normales)
  // rendericen el reproductor interactivo correctamente.
  const baseUrl = "https://www.instagram.com/p"

  return (
    <section id={data.id} className="py-12 lg:py-20 bg-bg-secondary border-t border-border/50">
      <div className="mx-auto max-w-(--max-w-content) px-6 lg:px-8">
        <div className="relative text-center max-w-4xl mx-auto mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white border border-primary/10 text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-8 shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Social Proof
          </motion.div>
          
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
              className="text-lg md:text-xl text-text-primary/60 font-light max-w-2xl leading-relaxed"
            >
              {data.subheadline}
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {mounted && data.posts.map((postId: string, idx: number) => (
            <motion.div
              key={postId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-center w-full"
            >
              <div 
                className="w-full flex justify-center"
                dangerouslySetInnerHTML={{
                  __html: `
                    <blockquote
                      class="instagram-media"
                      data-instgrm-permalink="${baseUrl}/${postId}/?utm_source=ig_embed&amp;utm_campaign=loading"
                      data-instgrm-version="14"
                      style="background:#FFF; border:0; border-radius:12px; box-shadow:none; margin:0; max-width:540px; min-width:280px; padding:0; width:100%;"
                    >
                      <a href="${baseUrl}/${postId}/" target="_blank" rel="noopener noreferrer" style="color:#004a45; font-family:sans-serif; font-size:14px; text-decoration:none;">
                        Ver en Instagram
                      </a>
                    </blockquote>
                  `
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
