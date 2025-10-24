"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Modal,
  Spinner,
  Skeleton,
  SkeletonCard,
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui";

export default function ComponentsTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [checkboxValue, setCheckboxValue] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
            🎨 Librería de Componentes UI
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Componentes reutilizables para mi-portfolio-front-end
          </p>
        </div>

        {/* Alerts */}
        {showAlert && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
              Alerts
            </h2>
            <div className="grid gap-4">
              <Alert variant="default" onClose={() => setShowAlert(false)}>
                <AlertTitle>Información</AlertTitle>
                <AlertDescription>
                  Este es un mensaje informativo de ejemplo.
                </AlertDescription>
              </Alert>
              <Alert variant="success">
                <AlertTitle>¡Éxito!</AlertTitle>
                <AlertDescription>
                  Tu operación se completó exitosamente.
                </AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTitle>Advertencia</AlertTitle>
                <AlertDescription>Esto requiere tu atención.</AlertDescription>
              </Alert>
              <Alert variant="error">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Ocurrió un error al procesar la solicitud.
                </AlertDescription>
              </Alert>
              <Alert variant="info">
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>
                  Información adicional sobre esta operación.
                </AlertDescription>
              </Alert>
            </div>
          </section>
        )}

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
            <Button size="icon">🚀</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              isLoading={isLoading}
              onClick={() => setIsLoading(!isLoading)}
            >
              {isLoading ? "Loading" : "Toggle Loading"}
            </Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth>Full Width Button</Button>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Badges
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Cards
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Default</CardTitle>
                <CardDescription>Esta es una tarjeta básica</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Contenido de la tarjeta con información relevante.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Ver más</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated" hover>
              <CardHeader>
                <CardTitle>Card Elevada</CardTitle>
                <CardDescription>Con hover effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Esta tarjeta tiene sombra y animación hover.
                </p>
              </CardContent>
            </Card>

            <Card variant="outline" padding="lg">
              <CardHeader>
                <CardTitle>Card Outline</CardTitle>
                <CardDescription>Con borde resaltado</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Tarjeta con borde de 2px.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Forms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Form Components
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Formulario de Ejemplo</CardTitle>
              <CardDescription>
                Todos los componentes de formulario
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input
                label="Nombre"
                placeholder="Ingresa tu nombre"
                helperText="Este campo es requerido"
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="tu@email.com"
                variant="success"
              />
              <Input
                label="Campo con error"
                placeholder="Ingresa algo..."
                error="Este campo tiene un error"
              />

              <Select
                label="País"
                options={[
                  { value: "", label: "Selecciona un país" },
                  { value: "ar", label: "Argentina" },
                  { value: "br", label: "Brasil" },
                  { value: "cl", label: "Chile" },
                  { value: "mx", label: "México" },
                ]}
                helperText="Selecciona tu país de residencia"
              />

              <Textarea
                label="Descripción"
                placeholder="Escribe tu descripción..."
                helperText="Máximo 500 caracteres"
              />

              <Checkbox
                label="Acepto los términos y condiciones"
                checked={checkboxValue}
                onChange={(e) => setCheckboxValue(e.target.checked)}
              />

              <div className="flex gap-2">
                <Button variant="primary">Guardar</Button>
                <Button variant="outline">Cancelar</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Modal */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Modal
          </h2>
          <Button onClick={() => setIsModalOpen(true)}>Abrir Modal</Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Título del Modal"
            description="Esta es la descripción del modal"
            size="md"
          >
            <div className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Este es el contenido del modal. Puedes poner cualquier cosa
                aquí.
              </p>
              <Input label="Nombre" placeholder="Ingresa algo..." />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                  Confirmar
                </Button>
              </div>
            </div>
          </Modal>
        </section>

        {/* Spinners */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Spinners
          </h2>
          <div className="flex flex-wrap gap-8 items-center">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </div>
        </section>

        {/* Skeletons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Skeletons
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton variant="circular" className="h-16 w-16" />
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-500 dark:text-slate-400 pt-12 border-t border-slate-200 dark:border-slate-800">
          <p>✨ Componentes UI - Mi Portfolio Front-End</p>
        </footer>
      </div>
    </div>
  );
}
