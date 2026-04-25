import siteConfigData from '../../site.config.json'

export interface SiteConfig {
  _meta: {
    project: string
    version: string
    lastUpdated: string
  }
  brand: {
    name: string
    logo: {
      src: string
      alt: string
    }
  }
  colors: {
    primary: string
    secondary: string
    accent: string
    bgPrimary: string
    bgSecondary: string
    textPrimary: string
    textSecondary: string
  }
  fonts: {
    titles: string
    body: string
  }
  seo: {
    title: string
    description: string
    keywords: string[]
    canonicalUrl?: string
  }
  contact: {
    whatsapp: {
      number: string
      message: string
    }
    social: {
      instagram?: string
      facebook?: string
    }
  }
  animations: {
    level: number
  }
  sections: any[] // We can type this more strictly later if needed
}

export const siteConfig = siteConfigData as SiteConfig
