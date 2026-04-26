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
  if (!data) return null

  const mediaType = data.mediaType || "reel"
  const baseUrl =
    mediaType === "reel"
      ? "https://www.instagram.com/reel"
      : "https://www.instagram.com/p"

  // Process Instagram embeds once the script is loaded
  React.useEffect(() => {
    const processEmbeds = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      }
    }

    // The script might already be loaded
    processEmbeds()

    // Also wait a bit in case the script loads after mount (lazyOnload)
    const timer = setTimeout(processEmbeds, 2000)
    const timer2 = setTimeout(processEmbeds, 4000)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <section id={data.id} className="py-12 lg:py-20 bg-bg-secondary border-t border-border/50">
      <div className="mx-auto max-w-(--max-w-content) px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-titles text-font-size-display text-text-secondary leading-tight">
            {data.headline}
          </h2>
          {data.subheadline && (
            <p className="mt-4 text-lg text-text-primary/70 leading-relaxed">
              {data.subheadline}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {data.posts.map((postId: string, idx: number) => (
            <motion.div
              key={postId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-center"
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={`${baseUrl}/${postId}/`}
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: "0",
                  borderRadius: "12px",
                  boxShadow: "none",
                  margin: "0",
                  maxWidth: "540px",
                  minWidth: "280px",
                  padding: "0",
                  width: "100%",
                }}
              >
                <a
                  href={`${baseUrl}/${postId}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary/60 text-sm hover:text-text-primary transition-colors"
                >
                  Ver en Instagram
                </a>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
