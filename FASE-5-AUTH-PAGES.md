# 🚀 FASE 5: PÁGINAS DE AUTENTICACIÓN - GUÍA CONCISA

Objetivo: Implementar páginas de login/register con validación completa, manejo de errores, y UX fluida usando React Hook Form + Zod.

---

## Archivos a crear/editar

- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/RegisterForm.tsx`
- `src/lib/validations/auth.schemas.ts` (Zod schemas)
- `src/hooks/useAuth.ts` (custom hook)

---

## Comandos (dependencias necesarias)

```bash
npm install react-hook-form @hookform/resolvers zod
```

---

## Código (copiar/pegar funcional)

### `src/lib/validations/auth.schemas.ts`

```ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Mínimo 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
```

---

### `src/hooks/useAuth.ts`

```ts
'use client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { LoginInput, RegisterInput } from '@/lib/validations/auth.schemas';
import { useState } from 'react';

export function useAuth() {
  const router = useRouter();
  const { login: loginStore, register: registerStore } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (data: LoginInput) => {
    setLoading(true);
    setError(null);
    try {
      await loginStore(data);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterInput) => {
    setLoading(true);
    setError(null);
    try {
      await registerStore(data);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return { login, register, error, loading };
}
```

---

### `src/components/auth/LoginForm.tsx`

```tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@/lib/validations/auth.schemas';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function LoginForm() {
  const { login, error, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(login)} className="space-y-4 w-full max-w-md">
      <h1 className="text-2xl font-bold">Iniciar Sesión</h1>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div>
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      <div>
        <Input
          label="Contraseña"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
      </div>

      <Button type="submit" isLoading={loading} fullWidth>
        Iniciar Sesión
      </Button>

      <p className="text-sm text-center">
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="underline">
          Regístrate
        </Link>
      </p>
    </form>
  );
}
```

---

### `src/components/auth/RegisterForm.tsx`

```tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from '@/lib/validations/auth.schemas';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function RegisterForm() {
  const { register: registerUser, error, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(registerUser)}
      className="space-y-4 w-full max-w-md"
    >
      <h1 className="text-2xl font-bold">Registrarse</h1>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div>
        <Input
          label="Nombre"
          {...register('name')}
          error={errors.name?.message}
        />
      </div>

      <div>
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      <div>
        <Input
          label="Contraseña"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
      </div>

      <div>
        <Input
          label="Confirmar Contraseña"
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      </div>

      <Button type="submit" isLoading={loading} fullWidth>
        Registrarse
      </Button>

      <p className="text-sm text-center">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
```

---

### `src/app/(auth)/login/page.tsx`

```tsx
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <LoginForm />
    </div>
  );
}
```

---

### `src/app/(auth)/register/page.tsx`

```tsx
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <RegisterForm />
    </div>
  );
}
```

---

## Actualizar componente Input (si no tiene prop `error`)

`src/components/ui/Input.tsx` debe aceptar:

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-1 text-sm font-medium">{label}</label>
        )}
        <input ref={ref} className={/* tus clases */} {...props} />
        {error && <span className="text-red-600 text-sm mt-1">{error}</span>}
      </div>
    );
  },
);
```

---

## Actualizar authStore (si falta método register)

`src/lib/store/authStore.ts`:

```ts
import { authAPI } from '@/lib/api/auth.api';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  login: async (data) => {
    const response = await authAPI.login(data);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    set({ user: response.user, isAuthenticated: true });
  },

  register: async (data) => {
    const response = await authAPI.register(data);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    set({ user: response.user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    try {
      const user = await authAPI.me();
      set({ user, isAuthenticated: true, isInitialized: true });
    } catch {
      set({ isInitialized: true });
    }
  },
}));
```

---

## Checklist rápida (testing)

- [ ] `/login` muestra formulario funcional
- [ ] Validación Zod funciona (errores inline)
- [ ] Login correcto redirige a `/`
- [ ] Errores del backend se muestran
- [ ] `/register` funciona con validación
- [ ] Confirmación de contraseña valida
- [ ] Tokens se guardan en localStorage
- [ ] `useAuthStore` actualiza estado correctamente

---

## Next: Fase 6 (Páginas Admin: CRUD proyectos, upload Cloudinary, gestión contenido)

Avísame cuando termines esta fase 🚀
