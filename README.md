# 🚀 Portfolio Personal - Mateo Gaviraghi

Portfolio profesional de desarrollo Full Stack construido con las tecnologías más modernas. Diseñado para mostrar proyectos, habilidades y experiencia de forma profesional y atractiva.

## ✨ Features

- 🎨 **Diseño Moderno**: UI premium con gradientes, animaciones y efectos glassmorphism
- 🌓 **Modo Oscuro**: Diseño optimizado para modo dark con colores vibrantes
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- ⚡ **Performance**: Optimizado para velocidad con SSR y SSG de Next.js
- 🔐 **Admin Dashboard**: Panel de administración completo para gestionar contenido
- 🎯 **SEO Optimizado**: Metadata completa para buscadores y redes sociales
- 🔍 **Búsqueda y Filtros**: Sistema de filtrado avanzado para proyectos y skills
- 💬 **Sistema de Reviews**: Permite a visitantes dejar comentarios y valoraciones
- 📊 **Analytics**: Dashboard con estadísticas de proyectos, skills y reviews

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI**: [React 19](https://react.dev/)
- **Lenguaje**: [TypeScript 5](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Iconos**: [Lucide React](https://lucide.dev/)

### State Management & Data Fetching

- **Autenticación**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Server State**: [TanStack Query (React Query)](https://tanstack.com/query)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Developer Experience

- **Linting**: ESLint con configuración de Next.js
- **Type Safety**: TypeScript estricto
- **Package Manager**: npm

## 📁 Estructura del Proyecto

```
mi-portfolio-front-end/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/          # Rutas públicas
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── projects/      # Galería de proyectos
│   │   │   ├── skills/        # Skills y tecnologías
│   │   │   └── reviews/       # Testimonios
│   │   ├── (auth)/            # Rutas de autenticación
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── admin/             # Panel de administración
│   │   │   ├── dashboard/
│   │   │   ├── projects/
│   │   │   ├── skills/
│   │   │   └── reviews/
│   │   ├── layout.tsx         # Layout principal
│   │   ├── globals.css        # Estilos globales
│   │   └── providers.tsx      # Providers (React Query, etc)
│   ├── components/            # Componentes reutilizables
│   │   ├── ui/               # Componentes UI base
│   │   ├── layout/           # Header, Footer, Navigation
│   │   ├── projects/         # Componentes de proyectos
│   │   ├── skills/           # Componentes de skills
│   │   ├── reviews/          # Componentes de reviews
│   │   └── admin/            # Componentes del admin
│   ├── lib/                  # Utilidades y configuración
│   │   ├── api/             # Clientes API
│   │   ├── store/           # Zustand stores
│   │   ├── utils/           # Funciones helper
│   │   └── validations/     # Schemas de validación Zod
│   └── types/               # Definiciones de TypeScript
├── public/                  # Archivos estáticos
├── .env                    # Variables de entorno (no commitear)
└── package.json

```

## 🚀 Getting Started

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Backend API corriendo (ver [BACKEND-API-STRUCTURE.md](./BACKEND-API-STRUCTURE.md))

### Instalación

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/MateoGaviraghi/mi-portfolio-front-end.git
   cd mi-portfolio-front-end
   ```

2. **Instala dependencias**

   ```bash
   npm install
   ```

3. **Configura variables de entorno**

   Crea un archivo `.env.local` en la raíz del proyecto (ver [ENV_SETUP.md](./ENV_SETUP.md)):

   ```bash
   # API Backend
   NEXT_PUBLIC_API_URL=http://localhost:4000/api

   # Personal Info
   NEXT_PUBLIC_SITE_NAME="Mateo Gaviraghi"
   NEXT_PUBLIC_EMAIL="tu-email@ejemplo.com"
   NEXT_PUBLIC_GITHUB_URL="https://github.com/MateoGaviraghi"
   NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/in/tu-perfil"
   ```

4. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

5. **Abre en el navegador**

   Visita [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run start    # Inicia servidor de producción
npm run lint     # Ejecuta ESLint
```

## 🔑 Variables de Entorno Requeridas

Ver archivo [ENV_SETUP.md](./ENV_SETUP.md) para una guía completa.

### Principales Variables:

| Variable                   | Descripción          | Requerida |
| -------------------------- | -------------------- | --------- |
| `NEXT_PUBLIC_API_URL`      | URL del backend API  | ✅        |
| `NEXT_PUBLIC_SITE_NAME`    | Nombre del portfolio | ✅        |
| `NEXT_PUBLIC_EMAIL`        | Email de contacto    | ✅        |
| `NEXT_PUBLIC_GITHUB_URL`   | URL de GitHub        | ✅        |
| `NEXT_PUBLIC_LINKEDIN_URL` | URL de LinkedIn      | ✅        |

## 🎨 Sistema de Diseño

El portfolio utiliza un sistema de diseño consistente:

- **Colores Primary**: Cyan (#06b6d4) a Purple (#9333ea)
- **Tipografía**: Inter (Google Fonts)
- **Bordes**: Rounded (8px, 12px, 16px)
- **Espaciado**: Sistema de 4px (0.5rem, 1rem, 1.5rem, etc.)
- **Animaciones**: Smooth transitions con Framer Motion

## 📱 Características Principales

### Para Visitantes

- Navegación intuitiva por proyectos, skills y reviews
- Sistema de filtros y búsqueda
- Visualización detallada de cada proyecto
- Formulario de contacto
- Diseño responsive y accesible

### Para Administradores

- Dashboard con estadísticas
- CRUD completo de Proyectos
  - Upload de imágenes con Cloudinary
  - Editor de tecnologías y tags
  - Gestión de featured projects
- CRUD de Skills con niveles de proficiencia
- Gestión de Reviews y aprobación de comentarios
- Autenticación segura con JWT

## 🔐 Autenticación

El sistema usa JWT tokens almacenados en cookies seguras:

- Login/Register con validación
- Protección de rutas admin
- Refresh token automático
- Logout con limpieza de sesión

## 🚢 Deployment

### Vercel (Recomendado)

1. Conecta el repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push a `main`

### Otras Plataformas

El proyecto es compatible con cualquier plataforma que soporte Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📚 Documentación Adicional

- [FASE-3-LAYOUTS-NAVIGATION.md](./FASE-3-LAYOUTS-NAVIGATION.md) - Layouts y Navegación
- [FASE-4-PAGINAS-PUBLICAS.md](./FASE-4-PAGINAS-PUBLICAS.md) - Páginas Públicas
- [FASE-5-AUTH-PAGES.md](./FASE-5-AUTH-PAGES.md) - Autenticación
- [FASE-6-ADMIN-CRUD-PROYECTOS.md](./FASE-6-ADMIN-CRUD-PROYECTOS.md) - Panel Admin
- [FASE-7-CONEXION-BACK-FRONT.md](./FASE-7-CONEXION-BACK-FRONT.md) - Integración Backend
- [FASE-8-MODULOS-ADICIONALES.md](./FASE-8-MODULOS-ADICIONALES.md) - Módulos Adicionales

## 🤝 Contribuciones

Este es un proyecto personal, pero sugerencias y feedback son bienvenidos!

## 📄 Licencia

Este proyecto es de uso personal. Todos los derechos reservados.

## 👤 Autor

**Mateo Gaviraghi**

- GitHub: [@MateoGaviraghi](https://github.com/MateoGaviraghi)
- LinkedIn: [Mateo Gaviraghi](https://linkedin.com/in/mateo-gaviraghi)
- Email: contacto@mateogaviraghi.com

---

⭐ Si te gustó este proyecto, dame una estrella en GitHub!
