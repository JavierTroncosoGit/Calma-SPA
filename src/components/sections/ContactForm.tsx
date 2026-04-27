"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { createPortal } from "react-dom"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, CheckCircle2, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import Image from "next/image"
import { DateRange } from "react-day-picker"

function DateRangePickerField({
  placeholder,
  value,
  hasError,
  onChange,
}: {
  placeholder?: string
  value?: DateRange
  hasError: boolean
  onChange: (val: any) => void
}) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const [pos, setPos] = React.useState({ top: 0, left: 0 })

  React.useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const calendarWidth = 288
      const viewportWidth = window.innerWidth
      let left = rect.left
      if (left + calendarWidth > viewportWidth - 16) {
        left = Math.max(8, rect.right - calendarWidth)
      }
      setPos({
        top: rect.bottom + window.scrollY + 8,
        left: left + window.scrollX,
      })
    }
  }, [open])

  React.useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  const dateStr = value?.from
    ? value.to
      ? `${format(value.from, "d MMM", { locale: es })} - ${format(value.to, "d MMM", { locale: es })}`
      : format(value.from, "d MMM", { locale: es })
    : placeholder || "Selecciona tus fechas"

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="outline"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full justify-start text-left font-normal text-base h-14 px-4 bg-white/50 border-gray-200 hover:bg-white transition-all duration-300 rounded-xl shadow-sm",
          !value?.from && "text-muted-foreground",
          hasError && "border-amber-400 bg-amber-50/30"
        )}
      >
        <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
        <span className="truncate">{dateStr}</span>
      </Button>
      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{ position: "absolute", top: pos.top, left: pos.left, zIndex: 9999 }}
            className="rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-2 animate-in fade-in-0 zoom-in-95"
          >
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={value?.from}
              selected={value}
              onSelect={(range) => {
                onChange(range)
              }}
              numberOfMonths={1}
              locale={es}
              className="font-body"
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
  
  if (!data) return null

  // Fixed schema for the specific fields required
  const contactSchema = z.object({
    fecha: z.object({
      from: z.date({ message: "Debes seleccionar una fecha de inicio." }),
      to: z.date({ message: "Debes seleccionar una fecha de fin." }).optional(),
    }, { message: "Por favor selecciona un rango de fechas." }),
    nombre: z.string().min(2, "Necesitamos tu nombre para la reserva."),
    telefono: z.string().min(8, "Ingresa un teléfono válido."),
    comuna: z.string().min(3, "Necesitamos tu comuna para factibilidad."),
  })

  type ContactValues = z.infer<typeof contactSchema>

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onChange"
  })

  const onSubmit = async (values: ContactValues) => {
    setIsSubmitting(true)
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()
  }

  // Animation variants
  const shakeVariant = {
    shake: { x: [-2, 2, -2, 2, 0], transition: { duration: 0.4 } }
  }

  return (
    <section id={data.id} className="relative bg-bg-secondary flex items-stretch py-12 md:py-20 lg:py-32">
      <div className="flex flex-col lg:flex-row w-full max-w-(--max-w-content) mx-auto bg-white lg:rounded-[3rem] overflow-hidden shadow-2xl">
        
        {/* Left Side: 40% Sticky Visual Content */}
        <div className="relative w-full lg:w-2/5 min-h-[40vh] lg:min-h-full">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/assets/fondo-hero.png" 
              alt="Calma SPA Experience" 
              fill 
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16 text-white">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-titles text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8"
            >
              {data.headline}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-lg font-light leading-relaxed mb-10 max-w-md"
            >
              {data.subheadline}
            </motion.p>

            <div className="space-y-4">
              {data.trustBadges?.map((badge: string, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 w-fit"
                >
                  <span className="text-white font-medium tracking-wide">{badge}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: 60% Form Canvas */}
        <div className="w-full lg:w-3/5 bg-white p-8 md:p-16 lg:p-24 flex items-center justify-center">
          <div className="w-full max-w-xl">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="font-titles text-3xl text-text-secondary mb-4">¡Reserva en Proceso!</h3>
                <p className="text-lg text-text-primary/70 mb-10">{data.successMessage}</p>
                <Button 
                  onClick={() => setIsSuccess(false)} 
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg border-primary/20 text-primary hover:bg-primary/5"
                >
                  Agendar otra fecha
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Custom DateRange Picker */}
                <motion.div 
                  variants={shakeVariant}
                  animate={errors.fecha ? "shake" : ""}
                  className="space-y-3"
                >
                  <Label className="text-sm font-medium text-text-secondary uppercase tracking-wider ml-1">Tus Fechas</Label>
                  <Controller
                    control={control}
                    name="fecha"
                    render={({ field }) => (
                      <DateRangePickerField
                        placeholder="Elige tus días de relajo"
                        value={field.value}
                        hasError={!!errors.fecha}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.fecha && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-amber-600 font-medium ml-1">
                      {errors.fecha.message as string}
                    </motion.p>
                  )}
                  {/* Feedback on selection */}
                  {!errors.fecha && dirtyFields.fecha && (
                     <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-primary font-medium ml-1">
                       Excelente elección para tu descanso.
                     </motion.p>
                  )}
                </motion.div>

                {/* Name Field */}
                <motion.div 
                  variants={shakeVariant}
                  animate={errors.nombre ? "shake" : ""}
                  className="space-y-3"
                >
                  <Label htmlFor="nombre" className="text-sm font-medium text-text-secondary uppercase tracking-wider ml-1">A nombre de quién</Label>
                  <div className="relative">
                    <Input
                      id="nombre"
                      placeholder={data.fields.find((f: any) => f.id === "nombre")?.placeholder ?? "Tu Nombre"}
                      {...register("nombre")}
                      className={cn(
                        "text-lg h-14 px-4 bg-gray-50/50 border-gray-200 rounded-xl focus-visible:ring-primary/20 focus-visible:border-primary shadow-sm transition-all",
                        errors.nombre && "border-amber-400 bg-amber-50/30 focus-visible:ring-amber-400/20"
                      )}
                    />
                    {!errors.nombre && dirtyFields.nombre && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
                        <CheckCircle2 className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                  {errors.nombre && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-amber-600 font-medium ml-1">
                      Ups, {errors.nombre.message as string}
                    </motion.p>
                  )}
                </motion.div>

                {/* Grid for Whatsapp & Comuna */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    variants={shakeVariant}
                    animate={errors.telefono ? "shake" : ""}
                    className="space-y-3"
                  >
                    <Label htmlFor="telefono" className="text-sm font-medium text-text-secondary uppercase tracking-wider ml-1">WhatsApp</Label>
                    <div className="relative">
                      <Input
                        id="telefono"
                        type="tel"
                        placeholder={data.fields.find((f: any) => f.id === "telefono")?.placeholder ?? "+56 9 ..."}
                        {...register("telefono")}
                        className={cn(
                          "text-lg h-14 px-4 bg-gray-50/50 border-gray-200 rounded-xl focus-visible:ring-primary/20 focus-visible:border-primary shadow-sm transition-all",
                          errors.telefono && "border-amber-400 bg-amber-50/30"
                        )}
                      />
                    </div>
                    {errors.telefono && (
                      <p className="text-sm text-amber-600 font-medium ml-1">{errors.telefono.message as string}</p>
                    )}
                  </motion.div>

                  <motion.div 
                    variants={shakeVariant}
                    animate={errors.comuna ? "shake" : ""}
                    className="space-y-3"
                  >
                    <Label htmlFor="comuna" className="text-sm font-medium text-text-secondary uppercase tracking-wider ml-1">Comuna</Label>
                    <div className="relative">
                      <Input
                        id="comuna"
                        placeholder={data.fields.find((f: any) => f.id === "comuna")?.placeholder ?? "Tu Comuna"}
                        {...register("comuna")}
                        className={cn(
                          "text-lg h-14 px-4 bg-gray-50/50 border-gray-200 rounded-xl focus-visible:ring-primary/20 focus-visible:border-primary shadow-sm transition-all",
                          errors.comuna && "border-amber-400 bg-amber-50/30"
                        )}
                      />
                    </div>
                    {errors.comuna && (
                      <p className="text-sm text-amber-600 font-medium ml-1">{errors.comuna.message as string}</p>
                    )}
                  </motion.div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full bg-primary text-white hover:bg-primary/90 h-16 rounded-full text-xl font-medium shadow-[0_10px_30px_rgba(0,74,69,0.2)] transition-all duration-300 relative overflow-hidden",
                        isSubmitting && "bg-primary/80"
                      )}
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div 
                            key="loading"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-3"
                          >
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span>Procesando...</span>
                          </motion.div>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            {data.submitLabel}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                  <p className="text-center text-sm text-text-primary/50 mt-4 font-light">
                    Sin compromisos. Confirmaremos disponibilidad vía WhatsApp.
                  </p>
                </div>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
