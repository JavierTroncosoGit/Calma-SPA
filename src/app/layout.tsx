import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import Script from "next/script"
import { siteConfig } from "@/lib/config"
import { SmoothScroll } from "@/components/layout/SmoothScroll"
import { WhatsAppButton } from "@/components/layout/WhatsAppButton"
import "./globals.css"

const robotoTitles = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-titles",
})

const robotoBody = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
})

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  metadataBase: new URL(siteConfig.seo.canonicalUrl || "https://calmaspa.cl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: "/",
    siteName: siteConfig.brand.name,
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.brand.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.brand.name,
    "url": siteConfig.seo.canonicalUrl,
    "logo": siteConfig.seo.canonicalUrl + siteConfig.brand.logo.src,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.contact.whatsapp.number,
      "contactType": "customer service",
      "areaServed": "CL",
      "availableLanguage": "Spanish"
    },
    "sameAs": [
      siteConfig.sections.find(s => s.type === 'footer')?.social?.instagram,
      siteConfig.sections.find(s => s.type === 'footer')?.social?.facebook
    ].filter(Boolean)
  }

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${robotoTitles.variable} ${robotoBody.variable} font-body min-h-screen antialiased`}
      >
        <SmoothScroll>
          {children}
          <WhatsAppButton />
        </SmoothScroll>
        <Script
          src="https://platform.instagram.com/en_US/embeds.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
