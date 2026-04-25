import { siteConfig } from "@/lib/config"
import { Navbar } from "@/components/layout/Navbar"
import { HeroSection } from "@/components/sections/HeroSection"
import { StatsSection } from "@/components/sections/StatsSection"
import { BenefitsGrid } from "@/components/sections/BenefitsGrid"
import { StepsSection } from "@/components/sections/StepsSection"
import { FAQSection } from "@/components/sections/FAQSection"
import { InstagramFeed } from "@/components/sections/InstagramFeed"
import { ContactForm } from "@/components/sections/ContactForm"
import { CTABanner } from "@/components/sections/CTABanner"
import { Footer } from "@/components/layout/Footer"

export default function Home() {
  return (
    <main className="relative">
      {siteConfig.sections.map((section) => {
        switch (section.type) {
          case "navbar":
            return <Navbar key={section.id} />
          case "hero":
            return <HeroSection key={section.id} />
          case "stats":
            return <StatsSection key={section.id} />
          case "benefits-grid":
            return <BenefitsGrid key={section.id} />
          case "steps":
            return <StepsSection key={section.id} />
          case "faq":
            return <FAQSection key={section.id} />
          case "instagram-feed":
            return <InstagramFeed key={section.id} />
          case "contact-form":
            return <ContactForm key={section.id} />
          case "cta-banner":
            return <CTABanner key={section.id} />
          case "footer":
            return <Footer key={section.id} />
          default:
            return null
        }
      })}
    </main>
  )
}
