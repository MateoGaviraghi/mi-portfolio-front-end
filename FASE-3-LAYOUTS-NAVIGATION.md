# 🚀 FASE 3: LAYOUTS & NAVEGACIÓN - GUÍA CONCISA

Objetivo: Implementar header responsive, mobile menu, footer, sub-layouts (public/auth/admin) y protección de rutas.

---

## Archivos a crear/editar (rápido)

- `src/components/layout/Header.tsx`
- `src/components/layout/MobileMenu.tsx`
- `src/components/layout/Footer.tsx`
- `src/lib/auth/RequireAuth.tsx` (client-side guard)
- `src/app/(public)/layout.tsx` (public layout)
- `src/app/(auth)/layout.tsx` (auth layout)
- `src/app/(admin)/layout.tsx` (admin layout)
- `src/app/(public)/page.tsx` (home skeleton)
- `src/app/(auth)/login/page.tsx` (login minimal)
- `src/app/(admin)/dashboard/page.tsx` (admin skeleton)

---

## Comandos (crea carpetas + dependencias necesarias)

```bash
mkdir -p src/components/layout src/lib/auth src/app/(public) src/app/(auth) src/app/(admin)
# Headless UI ya usado en fase 2; si falta:
npm install @headlessui/react
```

---

## Código (copiar/pegar minimal y funcional)

### `src/components/layout/Header.tsx`

```tsx
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/lib/store/authStore';
import { MobileMenu } from './MobileMenu';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();

  return (
    <header className="w-full border-b bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          MiPortfolio
        </Link>

        <nav className="hidden md:flex gap-4 items-center">
          <Link href="/projects">Proyectos</Link>
          <Link href="/skills">Skills</Link>
          <Link href="/ai-insights">AI</Link>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline">{user?.name}</span>
              <Button variant="outline" onClick={logout}>
                Salir
              </Button>
            </>
          ) : (
            <div className="hidden sm:flex gap-2">
              <Link href="/login">
                <Button variant="ghost">Iniciar</Button>
              </Link>
              <Link href="/register">
                <Button>Registrarse</Button>
              </Link>
            </div>
          )}

          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu isOpen={open} onClose={() => setOpen(false)} />
    </header>
  );
}
```

---

### `src/components/layout/MobileMenu.tsx`

```tsx
'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';

export function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isAuthenticated, logout, user } = useAuthStore();

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Menu</h3>
            <button onClick={onClose} aria-label="Cerrar">
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-3">
            <Link href="/" onClick={onClose}>
              Inicio
            </Link>
            <Link href="/projects" onClick={onClose}>
              Proyectos
            </Link>
            <Link href="/skills" onClick={onClose}>
              Skills
            </Link>
            <Link href="/ai-insights" onClick={onClose}>
              AI
            </Link>

            {isAuthenticated ? (
              <>
                <span className="pt-4">{user?.name}</span>
                <button
                  className="text-left text-red-600"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={onClose}>
                  Iniciar sesión
                </Link>
                <Link href="/register" onClick={onClose}>
                  Registrarse
                </Link>
              </>
            )}
          </nav>
        </div>
      </Dialog>
    </Transition>
  );
}
```

---

### `src/components/layout/Footer.tsx`

```tsx
export default function Footer() {
  return (
    <footer className="w-full border-t bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} Tu Nombre</div>
        <div className="flex gap-4">
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
```

---

### `src/lib/auth/RequireAuth.tsx` (client guard)

```tsx
'use client';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuthStore();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isInitialized, isAuthenticated, router]);

  if (!isInitialized || !isAuthenticated) {
    return null; // o spinner
  }

  return <>{children}</>;
}
```

---

### Layout examples (Next.js App Router)

`src/app/(public)/layout.tsx`

```tsx
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

`src/app/(auth)/layout.tsx` (minimal)

```tsx
import './globals.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <main className="min-h-screen flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
```

`src/app/(admin)/layout.tsx` (use guard)

```tsx
'use client';
import RequireAuth from '@/lib/auth/RequireAuth';
import Header from '@/components/layout/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="min-h-screen">
        <Header />
        <div className="p-6">{children}</div>
      </div>
    </RequireAuth>
  );
}
```

---

### Minimal pages to test

`src/app/(public)/page.tsx`

```tsx
export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Home Public</h1>
      <p>Bienvenido al portfolio.</p>
    </div>
  );
}
```

`src/app/(auth)/login/page.tsx` (usa auth store)

```tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password: pass });
      router.push('/');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <Button type="submit" isLoading={loading}>
        Iniciar
      </Button>
    </form>
  );
}
```

`src/app/(admin)/dashboard/page.tsx`

```tsx
export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Contenido protegido</p>
    </div>
  );
}
```

---

## Checklist rápida (testing)

- [ ] `npm run dev` sin errores
- [ ] Header visible en desktop
- [ ] Mobile menu abre y cierra
- [ ] Footer presente
- [ ] Admin route redirige a login si no autenticado
- [ ] Login funciona usando `useAuthStore`

---

¿Procedo a crear estos archivos en tu repo? (puedo aplicarlos directamente).
