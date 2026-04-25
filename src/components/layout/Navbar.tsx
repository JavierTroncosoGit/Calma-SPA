"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const data = siteConfig.sections.find((s) => s.type === "navbar")

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!data) return null

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 bg-primary",
        isScrolled ? "py-3 shadow-md" : "py-5 shadow-sm"
      )}
    >
      <div className="mx-auto flex max-w-(--max-w-content) items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative h-10 w-32 shrink-0">
          <Image
            src={siteConfig.brand.logo.src}
            alt={siteConfig.brand.logo.alt}
            fill
            className="object-contain transition-all duration-300 brightness-0 invert"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {data.links.map((link: any) => (
            <Link
              key={link.text}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors text-white/80 hover:text-white"
              )}
            >
              {link.text}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          {data.cta && (
            <Link
              href={data.cta.href}
              className={cn(
                buttonVariants({ size: "sm" }), 
                "bg-white text-primary font-bold border-2 border-white transition-all duration-300 shadow-sm",
                "hover:bg-transparent hover:text-white hover:shadow-none"
              )}
            >
              {data.cta.text}
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px] text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              }
            />
            <SheetContent side="right" className="bg-bg-primary pt-12">
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <nav className="flex flex-col gap-6">
                {data.links.map((link: any) => (
                  <SheetClose key={link.text} render={
                    <Link
                      href={link.href}
                      className="text-lg font-medium text-text-primary hover:text-accent transition-colors"
                    >
                      {link.text}
                    </Link>
                  } />
                ))}
                {data.cta && (
                  <SheetClose render={
                    <Link
                      href={data.cta.href}
                      className={cn(buttonVariants(), "mt-4 bg-primary text-white")}
                    >
                      {data.cta.text}
                    </Link>
                  } />
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
