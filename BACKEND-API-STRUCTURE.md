# 📋 ESTRUCTURA DE DATOS BACKEND - REFERENCIA RÁPIDA

## Auth Responses (Login & Register)

Tu backend devuelve esta estructura:

```typescript
{
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;        // Mongoose ObjectId como string
    email: string;
    name: string;
    role: "admin" | "visitor";
  };
}
```

---

## Endpoints de Auth

### POST `/api/auth/register`
**Body:**
```json
{
  "name": "Juan Perez",
  "email": "juan@example.com",
  "password": "123456"
}
```

**Response 201:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "juan@example.com",
    "name": "Juan Perez",
    "role": "visitor"
  }
}
```

---

### POST `/api/auth/login`
**Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response 200:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

**Response 401 (credenciales inválidas):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

---

### POST `/api/auth/refresh`
**Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response 200:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST `/api/auth/logout`
**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response 204:** (No Content)

---

## Ajustes necesarios en el Frontend

### 1. Tipos TypeScript

`src/types/auth.types.ts`:

```typescript
export type UserRole = 'admin' | 'visitor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
```

---

### 2. Auth API Client

`src/lib/api/auth.api.ts`:

```typescript
import apiClient from './client';
import type { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth.types';

export const authAPI = {
  login: async (data: LoginRequest) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest) => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
  },

  refresh: async (refreshToken: string) => {
    const { data } = await apiClient.post<{ accessToken: string; refreshToken: string }>(
      '/auth/refresh',
      { refreshToken }
    );
    return data;
  },
};
```

---

### 3. Auth Store

`src/lib/store/authStore.ts`:

```typescript
import { create } from 'zustand';
import { authAPI } from '@/lib/api/auth.api';
import type { User, LoginRequest, RegisterRequest } from '@/types/auth.types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
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
      // Decodificar el token para obtener el usuario (o hacer un endpoint /auth/me)
      // Por ahora, si el token existe, asumimos que es válido
      // En producción, deberías hacer una llamada a /auth/me o similar
      set({ isInitialized: true, isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({ isInitialized: true, isAuthenticated: false });
    }
  },
}));
```

---

## Notas importantes

1. **El backend NO devuelve el usuario en el refresh**, solo tokens nuevos
2. **El logout devuelve 204 No Content**, no hay body
3. **Los nuevos usuarios son `visitor` por defecto**, no `admin`
4. **El `id` del usuario es un ObjectId de MongoDB** convertido a string
5. **El backend usa `role` directamente**, no hay subdocumento

---

## Test rápido con curl

```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# Logout (reemplaza TOKEN con tu accessToken)
curl -X POST http://localhost:3001/api/auth/logout \
  -H "Authorization: Bearer TOKEN"
```

---

## ✅ Con esta estructura, tu frontend está listo para conectarse al backend

Copia los tipos y ajustes a tus archivos correspondientes 🚀