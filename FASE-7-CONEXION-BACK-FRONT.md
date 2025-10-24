# 🚀 FASE 7: CONEXIÓN FRONT-BACK - GUÍA CONCISA

Objetivo: Conectar frontend con backend real, configurar CORS, variables de entorno y verificar comunicación básica.

---

## Archivos a crear/editar

- `.env.local` (variables de entorno)
- `src/lib/api/client.ts` (configuración axios)
- `src/lib/store/authStore.ts` (ajustes finales)
- `src/app/layout.tsx` (agregar checkAuth al inicio)
- `next.config.js` (configurar imágenes Cloudinary)

---

## 1. Configurar Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto frontend:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Para producción (cuando deploys):
# NEXT_PUBLIC_API_URL=https://mi-portfolio-back-end.vercel.app/api

# Cloudinary (opcional para transformaciones del lado del cliente)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
```

---

## 2. Actualizar Axios Client

`src/lib/api/client.ts`:

```ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Para cookies (si usas httpOnly)
});

// Interceptor para agregar token a cada request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor para manejar errores y refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si es 401 y no es el endpoint de refresh, intentar refrescar token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken },
        );

        localStorage.setItem('accessToken', data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }

        // Reintentar request original con nuevo token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, limpiar tokens y redirigir a login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
```

---

## 3. Verificar authStore

`src/lib/store/authStore.ts` debe incluir:

```ts
import { create } from 'zustand';
import { authAPI } from '@/lib/api/auth.api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'visitor';
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
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

  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Error al hacer logout:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({ user: null, isAuthenticated: false });
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      set({ isInitialized: true, isAuthenticated: false });
      return;
    }

    try {
      const user = await authAPI.me();
      set({ user, isAuthenticated: true, isInitialized: true });
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({ isInitialized: true, isAuthenticated: false });
    }
  },
}));
```

---

## 4. Verificar auth.api.ts

`src/lib/api/auth.api.ts`:

```ts
import apiClient from './client';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'visitor';
  };
}

export const authAPI = {
  login: async (data: { email: string; password: string }) => {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: { name: string; email: string; password: string }) => {
    const response = await apiClient.post<LoginResponse>(
      '/auth/register',
      data,
    );
    return response.data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
  },

  me: async () => {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },

  refresh: async (refreshToken: string) => {
    const { data } = await apiClient.post('/auth/refresh', { refreshToken });
    return data;
  },
};
```

---

## 5. Inicializar Auth al cargar la app

`src/app/layout.tsx` (root layout):

```tsx
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import Providers from './providers';
import './globals.css';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <AuthInitializer>{children}</AuthInitializer>
        </Providers>
      </body>
    </html>
  );
}
```

**Nota**: Si Next.js te da error porque `useEffect` no funciona en Server Component, crea un componente client:

`src/components/AuthInitializer.tsx`:

```tsx
'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
}
```

Y en `layout.tsx`:

```tsx
import { AuthInitializer } from '@/components/AuthInitializer';
import Providers from './providers';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <AuthInitializer>{children}</AuthInitializer>
        </Providers>
      </body>
    </html>
  );
}
```

---

## 6. Configurar Next.js para imágenes de Cloudinary

`next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

---

## 7. Configurar CORS en el Backend

Verificar que tu backend tenga configurado CORS correctamente.

En `src/main.ts` (NestJS):

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      // Agrega tu dominio de producción cuando deploys
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(3001);
}
bootstrap();
```

O si usas variables de entorno (recomendado):

```ts
app.enableCors({
  origin: process.env.FRONTEND_URL?.split(',') || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

Y en tu `.env` del backend:

```env
FRONTEND_URL=http://localhost:3000
# O múltiples: FRONTEND_URL=http://localhost:3000,https://tu-frontend-vercel.app
```

---

## 8. Verificar Conexión

### Backend:

```bash
npm run start:dev
# Debe correr en http://localhost:3001
```

### Frontend:

```bash
npm run dev
# Debe correr en http://localhost:3000
```

### Verificación rápida:

- Abrir DevTools > Network
- Navegar a `/projects`
- Verificar que se hace request a `http://localhost:3001/api/projects`
- Si funciona, la conexión está lista ✅

---

## Errores comunes

### CORS blocked

→ Revisar configuración CORS en backend (paso 7)

### 401 Unauthorized

→ Verificar que el token se envía en headers del axios interceptor

### Network Error

→ Verificar que backend esté corriendo y `NEXT_PUBLIC_API_URL` sea correcta

### Imágenes no cargan

→ Verificar `next.config.js` incluya dominio de Cloudinary

---

## Checklist

- [ ] Backend corriendo
- [ ] Frontend corriendo
- [ ] `.env.local` configurado
- [ ] CORS configurado
- [ ] Axios client con interceptores
- [ ] AuthStore completo
- [ ] AuthInitializer en layout
- [ ] Next.js config para Cloudinary

---

## Next: Continuar con desarrollo de las fases anteriores

Ya puedes empezar a probar las funcionalidades implementadas 🚀
