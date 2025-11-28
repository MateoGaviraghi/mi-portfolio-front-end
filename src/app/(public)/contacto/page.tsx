"use client";

import { useState } from "react";
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
import { useEffect } from "react";
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
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative pt-20 sm:pt-24 pb-12 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>

          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-purple-600/20 border border-primary-500/30 mb-3 sm:mb-4">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-primary-400" />
              <span className="text-xs sm:text-sm bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                Estoy disponible
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-white via-primary-200 to-purple-200 bg-clip-text text-transparent">
                Contacto
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-6 md:mb-8 px-2 sm:px-0">
              Elige cómo prefieres contactarme
            </p>

            {/* Mode Toggle */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="inline-flex flex-col xs:flex-row bg-slate-900/50 border border-slate-800 rounded-xl p-1 w-full sm:w-auto max-w-md">
                <button
                  onClick={() => setMode("schedule")}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all ${
                    mode === "schedule"
                      ? "bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg"
                      : "text-slate-400 hover:text-white"
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
                      ? "bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg"
                      : "text-slate-400 hover:text-white"
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
            <div>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm mb-6 md:mb-8">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-br from-primary-500/10 to-purple-600/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-primary-500/30">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
                  <span className="text-slate-200">Lun-Vie, 9 AM - 7 PM</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-br from-green-500/10 to-emerald-600/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-green-500/30">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span className="text-slate-200">30-60 minutos</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-br from-purple-500/10 to-pink-600/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-purple-500/30">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-200">Google Meet</span>
                </div>
              </div>

              <div
                key={`calendly-${mode}`}
                className="calendly-inline-widget w-full rounded-xl overflow-hidden"
                data-url={customCalendlyUrl}
                style={{ minWidth: "320px", height: "700px" }}
              ></div>
            </div>
          )}

          {/* Contact Form Mode */}
          {mode === "message" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 sm:p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Nombre completo
                      </div>
                    </label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Tu nombre"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </div>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="tu@email.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Asunto
                      </div>
                    </label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder="¿En qué puedo ayudarte?"
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={6}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 shadow-lg"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
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
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-sm text-slate-500 mb-3">
              También puedes escribirme directamente:
            </p>
            <a
              href="mailto:mateogaviraghi24@gmail.com"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors font-medium"
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
