"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/config"

export function InstagramFeed() {
  const data = siteConfig.sections.find((s) => s.type === "instagram-feed")
  if (!data) return null

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
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-bg-primary rounded-3xl overflow-hidden shadow-lg h-[500px] relative flex items-center justify-center border border-border"
            >
              <iframe
                src={`https://www.instagram.com/p/${postId}/embed`}
                width="100%"
                height="100%"
                loading="lazy"
                scrolling="no"
                allowTransparency={true}
                allow="encrypted-media; picture-in-picture"
                className="absolute inset-0 w-full h-full border-none"
                title={`Instagram Post ${postId}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
