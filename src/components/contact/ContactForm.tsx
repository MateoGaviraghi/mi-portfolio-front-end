"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  ContactFormData,
} from "@/lib/validations/contact.schemas";
import { Button, Input, Textarea } from "@/components/ui";
import { Send, Mail, User, MessageSquare, Calendar, Clock } from "lucide-react";
import toast from "react-hot-toast";

type ContactMode = "schedule" | "message";

export function ContactForm() {
  const [mode, setMode] = useState<ContactMode>("schedule");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const mailtoLink = `mailto:contacto@mateogaviraghi.com?subject=${encodeURIComponent(
        data.subject
      )}&body=${encodeURIComponent(
        `Nombre: ${data.name}\nEmail: ${data.email}\n\nMensaje:\n${data.message}`
      )}`;

      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.href = mailtoLink;

      toast.success(
        "¡Mensaje enviado! Se abrirá tu cliente de email para confirmar el envío.",
        { duration: 5000 }
      );

      reset();
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      toast.error(
        "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // INSTRUCCIONES: Reemplaza esta URL con tu link de Calendly
  // Ejemplo: https://calendly.com/tu-usuario/30min
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/YOUR_USERNAME/30min";

  return (
    <section className="relative py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 mb-4">
            <Mail className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-primary-400 font-medium">
              Hablemos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Conectemos
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Agenda una entrevista para conocer más sobre mí y mis habilidades, o
            envía una consulta rápida
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-slate-900/50 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setMode("schedule")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                mode === "schedule"
                  ? "bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Agendar Entrevista</span>
            </button>
            <button
              onClick={() => setMode("message")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                mode === "message"
                  ? "bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">Enviar Consulta</span>
            </button>
          </div>
        </div>

        {/* Calendly Embed Section */}
        {mode === "schedule" && (
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 md:p-6 overflow-hidden">
            {/* Info Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Reserva tu Horario
              </h3>
              <p className="text-slate-400 mb-4">
                Selecciona el día y horario que mejor te convenga
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary-400" />
                  <span>Lun-Vie, 9 AM - 7 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>30-60 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Google Meet</span>
                </div>
              </div>
            </div>

            {/* Calendly Iframe */}
            <div className="relative w-full rounded-xl overflow-hidden border border-slate-700/50">
              <div className="bg-slate-800/30 p-4 text-center">
                <p className="text-slate-400 text-sm">
                  📅 Calendario de disponibilidad
                </p>
              </div>
              <iframe
                src={`${calendlyUrl}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0f172a&text_color=e2e8f0&primary_color=06b6d4`}
                width="100%"
                height="700"
                frameBorder="0"
                className="bg-slate-900"
                title="Agendar entrevista con Mateo Gaviraghi"
              />
            </div>

            {/* Instructions */}
            <div className="mt-4 p-4 bg-primary-500/5 border border-primary-500/20 rounded-lg">
              <p className="text-sm text-slate-400 text-center">
                Al confirmar la reserva, recibirás un email con el link de
                Google Meet y se agregará automáticamente a tu calendario
              </p>
            </div>
          </div>
        )}

        {/* Message Form Section */}
        {mode === "message" && (
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 md:p-10">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                ¿Tienes una consulta?
              </h3>
              <p className="text-slate-400">
                Envíame un mensaje y te responderé lo antes posible
              </p>
            </div>

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
                  placeholder="Cuéntame sobre tu consulta..."
                  rows={5}
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
                className="w-full bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 shadow-lg shadow-primary-500/25"
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
        )}

        {/* Alternative Contact */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 mb-3">
            También puedes escribirme directamente:
          </p>
          <a
            href="mailto:contacto@mateogaviraghi.com"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="font-medium">contacto@mateogaviraghi.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
