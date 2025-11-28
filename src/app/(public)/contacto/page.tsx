"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  ContactFormData,
} from "@/lib/validations/contact.schemas";
import { Button, Input, Textarea } from "@/components/ui";
import {
  Mail,
  Calendar,
  Clock,
  Video,
  ArrowLeft,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

// Declare Calendly on Window
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: Element | null;
      }) => void;
    };
  }
}

type ContactMode = "schedule" | "message";

export default function ContactoPage() {
  const [mode, setMode] = useState<ContactMode>("schedule");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/mateogaviraghi24/30min";
  const customCalendlyUrl = `${calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=06b6d4&background_color=0f172a&text_color=f1f5f9`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const mailtoLink = `mailto:mateogaviraghi24@gmail.com?subject=${encodeURIComponent(
        `Consulta de ${data.name}: ${data.subject}`
      )}&body=${encodeURIComponent(
        `Nombre: ${data.name}\nEmail: ${data.email}\n\nMensaje:\n${data.message}`
      )}`;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.href = mailtoLink;

      toast.success("¡Mensaje enviado! Se abrirá tu cliente de email.", {
        duration: 5000,
      });
      reset();
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      toast.error("Hubo un error. Por favor, intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.id = "calendly-script";

    // Remove existing script if present
    const existingScript = document.getElementById("calendly-script");
    if (existingScript) {
      existingScript.remove();
    }

    document.body.appendChild(script);

    // Force reload when returning to page
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: customCalendlyUrl,
          parentElement: document.querySelector(".calendly-inline-widget"),
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [customCalendlyUrl, mode]);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative pt-20 sm:pt-24 pb-12 md:pb-20 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>

          <div className="text-center mb-8 md:mb-12">
            <div
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-3 sm:mb-4 ${
                mounted ? "animate-fade-in" : "opacity-0"
              }`}
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
              <span className="text-xs sm:text-sm text-secondary font-semibold">
                Estoy disponible
              </span>
            </div>

            <div className={mounted ? "animate-scale-in" : "opacity-0"}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  Contacto
                </span>
              </h1>
            </div>

            <p
              className={`text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-2 sm:px-0 ${
                mounted ? "animate-fade-in animate-delay-200" : "opacity-0"
              }`}
            >
              Elige cómo prefieres contactarme
            </p>

            {/* Mode Toggle */}
            <div
              className={`flex justify-center mb-6 md:mb-8 ${
                mounted ? "animate-slide-in-up animate-delay-300" : "opacity-0"
              }`}
            >
              <div className="inline-flex flex-col xs:flex-row bg-muted/50 border border-border rounded-xl p-1 w-full sm:w-auto max-w-md">
                <button
                  onClick={() => setMode("schedule")}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all ${
                    mode === "schedule"
                      ? "bg-secondary text-secondary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium text-sm sm:text-base">
                    Agendar Reunión
                  </span>
                </button>
                <button
                  onClick={() => setMode("message")}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all ${
                    mode === "message"
                      ? "bg-secondary text-secondary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-medium text-sm sm:text-base">
                    Enviar Mensaje
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Calendly Widget Mode */}
          {mode === "schedule" && (
            <div
              className={
                mounted ? "animate-fade-in animate-delay-400" : "opacity-0"
              }
            >
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm mb-6 md:mb-8">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-secondary/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-secondary/20">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                  <span className="text-foreground">Lun-Vie, 9 AM - 7 PM</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-green-500/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-green-500/20">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="text-foreground">30-60 minutos</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-purple-500/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-purple-500/20">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-foreground">Google Meet</span>
                </div>
              </div>

              <div
                key={`calendly-${mode}`}
                className="calendly-inline-widget w-full rounded-xl overflow-hidden border border-border"
                data-url={customCalendlyUrl}
                style={{ minWidth: "320px", height: "700px" }}
              ></div>
            </div>
          )}

          {/* Contact Form Mode */}
          {mode === "message" && (
            <div
              className={`max-w-2xl mx-auto ${
                mounted ? "animate-fade-in animate-delay-400" : "opacity-0"
              }`}
            >
              <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-4 sm:p-6 md:p-8 hover:border-secondary/50 transition-colors duration-300">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-secondary" />
                        Nombre completo
                      </div>
                    </label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Tu nombre"
                      className={`bg-background/50 border-border focus:border-secondary ${
                        errors.name ? "border-destructive" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-secondary" />
                        Email
                      </div>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="tu@email.com"
                      className={`bg-background/50 border-border focus:border-secondary ${
                        errors.email ? "border-destructive" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-secondary" />
                        Asunto
                      </div>
                    </label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder="¿En qué puedo ayudarte?"
                      className={`bg-background/50 border-border focus:border-secondary ${
                        errors.subject ? "border-destructive" : ""
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={6}
                      className={`bg-background/50 border-border focus:border-secondary ${
                        errors.message ? "border-destructive" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div
            className={`mt-8 md:mt-12 text-center ${
              mounted ? "animate-fade-in animate-delay-500" : "opacity-0"
            }`}
          >
            <p className="text-sm text-muted-foreground mb-3">
              También puedes escribirme directamente:
            </p>
            <a
              href="mailto:mateogaviraghi24@gmail.com"
              className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors font-medium"
            >
              <Mail className="w-4 h-4" />
              <span>mateogaviraghi24@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
