# 🔧 Variables de Entorno - Configuración Personal

## Instrucciones de Configuración

1. **Crea un archivo `.env.local`** en la raíz del proyecto
2. **Copia y pega** el siguiente contenido
3. **Reemplaza** todos los valores placeholder con tu información real
4. **NO commitees** el archivo `.env.local` (ya está protegido por `.gitignore`)

## Template de Variables

```bash
# Personal Info
NEXT_PUBLIC_SITE_NAME="Mateo Gaviraghi"
NEXT_PUBLIC_SITE_TAGLINE="Full Stack Developer"
NEXT_PUBLIC_SITE_DESCRIPTION="Portfolio profesional de desarrollo Full Stack. Especialista en Next.js, NestJS, TypeScript y tecnologías modernas."

# Contact
NEXT_PUBLIC_EMAIL="tu-email@ejemplo.com"
NEXT_PUBLIC_PHONE="+54 XXX XXX XXXX"

# Social Links
NEXT_PUBLIC_GITHUB_URL="https://github.com/MateoGaviraghi"
NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/in/tu-perfil"
NEXT_PUBLIC_TWITTER_URL="https://twitter.com/tu-usuario"

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Optional: CV/Resume
NEXT_PUBLIC_CV_URL="/cv/mateo-gaviraghi-cv.pdf"
```

## Variables que Debes Actualizar

- ✏️ `NEXT_PUBLIC_EMAIL`: Tu email real
- ✏️ `NEXT_PUBLIC_PHONE`: Tu teléfono (opcional)
- ✏️ `NEXT_PUBLIC_LINKEDIN_URL`: Tu perfil de LinkedIn
- ✏️ `NEXT_PUBLIC_TWITTER_URL`: Tu perfil de Twitter/X (opcional)
- ✏️ `NEXT_PUBLIC_CV_URL`: URL a tu CV en PDF

## Cómo Usar Estas Variables

Las variables estarán disponibles automáticamente en tu código como:

```typescript
process.env.NEXT_PUBLIC_SITE_NAME
process.env.NEXT_PUBLIC_EMAIL
// etc...
```

Los archivos que actualizaré usarán estas variables automáticamente.
