"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { siteConfig } from "@/lib/config"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createPortal } from "react-dom"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

function DatePickerField({
  fieldId,
  placeholder,
  value,
  hasError,
  onChange,
}: {
  fieldId: string
  placeholder?: string
  value?: string
  hasError: boolean
  onChange: (val: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const [pos, setPos] = React.useState({ top: 0, left: 0 })

  // Calculate position relative to trigger
  React.useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const calendarWidth = 288 // approximate calendar width
      const viewportWidth = window.innerWidth

      let left = rect.left
      // If the calendar would overflow the right edge, align to right edge of trigger
      if (left + calendarWidth > viewportWidth - 16) {
        left = Math.max(8, rect.right - calendarWidth)
      }
      // If still overflows left, center it
      if (left < 8) {
        left = Math.max(8, (viewportWidth - calendarWidth) / 2)
      }

      setPos({
        top: rect.bottom + window.scrollY + 4,
        left: left + window.scrollX,
      })
    }
  }, [open])

  // Close on outside click
  React.useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    function handleScroll() {
      // Recalculate position on scroll
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        const calendarWidth = 288
        const viewportWidth = window.innerWidth
        let left = rect.left
        if (left + calendarWidth > viewportWidth - 16) {
          left = Math.max(8, rect.right - calendarWidth)
        }
        if (left < 8) {
          left = Math.max(8, (viewportWidth - calendarWidth) / 2)
        }
        setPos({
          top: rect.bottom + window.scrollY + 4,
          left: left + window.scrollX,
        })
      }
    }
    document.addEventListener("mousedown", handleClick)
    window.addEventListener("scroll", handleScroll, true)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      window.removeEventListener("scroll", handleScroll, true)
    }
  }, [open])

  // Close on Escape
  React.useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open])

  const selectedDate = value ? new Date(value) : undefined

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="outline"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full justify-start text-left font-normal text-base h-10 px-3 bg-transparent border-input",
          !value && "text-muted-foreground",
          hasError && "border-destructive"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
        {selectedDate
          ? format(selectedDate, "PPP", { locale: es })
          : <span>{placeholder || "Selecciona una fecha"}</span>}
      </Button>
      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              zIndex: 9999,
            }}
            className="rounded-xl bg-white shadow-2xl border border-gray-200 animate-in fade-in-0 zoom-in-95 max-w-[calc(100vw-2rem)]"
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                onChange(date ? date.toISOString() : "")
                setOpen(false)
              }}
              locale={es}
            />
          </div>,
          document.body
        )}
    </>
  )
}

export function ContactForm() {
  const data = siteConfig.sections.find((s) => s.type === "contact-form")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  if (!data) return null

  // Dynamic Schema Generation
  const schemaShape: any = {}
  data.fields.forEach((field: any) => {
    let fieldSchema: any = z.string()

    if (field.type === "email") {
      fieldSchema = fieldSchema.email("Email inválido")
    }

    if (field.required) {
      fieldSchema = fieldSchema.min(1, `${field.label} es requerido`)
    } else {
      fieldSchema = fieldSchema.optional().or(z.literal(""))
    }

    schemaShape[field.id] = fieldSchema
  })

  const contactSchema = z.object(schemaShape)
  type ContactValues = z.infer<typeof contactSchema>

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (values: ContactValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        setIsSuccess(true)
        reset()
      } else {
        setError(data.errorMessage)
      }
    } catch (e) {
      setError(data.errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id={data.id} className="py-20 bg-bg-primary">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <div>
            <h2 className="font-titles text-font-size-display text-text-secondary mb-6">
              {data.headline}
            </h2>
            {data.subheadline && (
              <p className="text-lg text-text-primary/70 leading-relaxed mb-8">
                {data.subheadline}
              </p>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-primary">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">1</div>
                <p className="font-medium">Atención rápida en RM</p>
              </div>
              <div className="flex items-center gap-4 text-primary">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">2</div>
                <p className="font-medium">Instalación el día previo</p>
              </div>
              <div className="flex items-center gap-4 text-primary">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">3</div>
                <p className="font-medium">Higiene clínica garantizada</p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-bg-secondary p-8 rounded-[2rem] shadow-xl border border-border/50"
          >
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-titles text-2xl text-text-secondary mb-4">¡Enviado con éxito!</h3>
                <p className="text-text-primary/70 mb-8">{data.successMessage}</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline">Enviar otro mensaje</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {data.fields.map((field: any) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id}>{field.label} {field.required && "*"}</Label>

                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        {...register(field.id)}
                        className={cn("text-base", errors[field.id] && "border-destructive")}
                      />
                    ) : field.type === "select" ? (
                      <Select onValueChange={(val) => setValue(field.id, val)}>
                        <SelectTrigger className={cn("text-base", errors[field.id] && "border-destructive")}>
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options.map((opt: string) => (
                            <SelectItem key={opt} value={opt} className="text-base">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "date" ? (
                      <DatePickerField
                        fieldId={field.id}
                        placeholder={field.placeholder}
                        value={watch(field.id) as string | undefined}
                        hasError={!!errors[field.id]}
                        onChange={(val) => setValue(field.id, val)}
                      />
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.id)}
                        className={cn("text-base", errors[field.id] && "border-destructive")}
                      />
                    )}

                    {errors[field.id] && (
                      <p className="text-xs text-destructive">{errors[field.id]?.message as string}</p>
                    )}
                  </div>
                ))}

                {error && (
                  <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-xl">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary/90 py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : data.submitLabel}
                </Button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
