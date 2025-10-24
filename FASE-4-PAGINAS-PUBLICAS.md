# 🚀 FASE 4: PÁGINAS PÚBLICAS - GUÍA CONCISA

Objetivo: Implementar páginas públicas (home, proyectos list/detail, skills, AI insights) con fetch de datos del backend, filtros, paginación y UX fluida.

---

## Archivos a crear/editar

- `src/app/(public)/projects/page.tsx` (lista de proyectos + filtros)
- `src/app/(public)/projects/[id]/page.tsx` (detalle proyecto + galería)
- `src/app/(public)/skills/page.tsx` (lista skills con stats)
- `src/app/(public)/ai-insights/page.tsx` (lista insights)
- `src/components/projects/ProjectCard.tsx` (card proyecto)
- `src/components/projects/ProjectFilters.tsx` (filtros categoría/búsqueda)
- `src/components/projects/ProjectGallery.tsx` (galería imágenes/videos)
- `src/components/skills/SkillCard.tsx` (card skill con barra progreso)
- `src/lib/api/projects.api.ts` (endpoints proyectos)
- `src/lib/api/skills.api.ts` (endpoints skills)
- `src/lib/api/ai-insights.api.ts` (endpoints AI)

---

## Comandos (dependencias necesarias)

```bash
npm install react-query @tanstack/react-query clsx
# Si usas framer-motion para animaciones (opcional):
npm install framer-motion
```

---

## Código (copiar/pegar minimal y funcional)

### `src/lib/api/projects.api.ts`

```ts
import apiClient from './client';

export interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  images: Array<{ url: string; publicId: string; alt?: string }>;
  videos?: Array<{ url: string; publicId: string }>;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  likes?: number;
  views?: number;
  createdAt: string;
}

export const projectsAPI = {
  getAll: async (params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const { data } = await apiClient.get<{
      data: Project[];
      total: number;
      page: number;
    }>('/projects', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Project>(`/projects/${id}`);
    return data;
  },

  search: async (query: string) => {
    const { data } = await apiClient.get<Project[]>(
      `/projects/search?q=${query}`,
    );
    return data;
  },

  like: async (id: string) => {
    const { data } = await apiClient.post(`/projects/${id}/like`);
    return data;
  },
};
```

---

### `src/lib/api/skills.api.ts`

```ts
import apiClient from './client';

export interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number; // 0-100
  icon?: string;
  description?: string;
}

export const skillsAPI = {
  getAll: async () => {
    const { data } = await apiClient.get<Skill[]>('/skills');
    return data;
  },

  getStats: async () => {
    const { data } = await apiClient.get('/skills/stats');
    return data;
  },
};
```

---

### `src/lib/api/ai-insights.api.ts`

```ts
import apiClient from './client';

export interface AIInsight {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  projectId?: string;
  createdAt: string;
}

export const aiInsightsAPI = {
  getAll: async (params?: { category?: string; limit?: number }) => {
    const { data } = await apiClient.get<AIInsight[]>('/ai-insights', {
      params,
    });
    return data;
  },

  getTop: async (limit = 5) => {
    const { data } = await apiClient.get<AIInsight[]>(
      `/ai-insights/top?limit=${limit}`,
    );
    return data;
  },
};
```

---

### `src/components/projects/ProjectCard.tsx`

```tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/api/projects.api';
import { Button } from '@/components/ui/Button';

export function ProjectCard({ project }: { project: Project }) {
  const mainImage = project.images?.[0]?.url || '/placeholder.jpg';

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
      <div className="relative h-48 w-full">
        <Image
          src={mainImage}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg">{project.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {project.description}
        </p>

        <div className="flex gap-2 flex-wrap">
          {project.technologies?.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-xs rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-500">
            ❤️ {project.likes || 0} · 👁️ {project.views || 0}
          </span>
          <Link href={`/projects/${project._id}`}>
            <Button variant="outline" size="sm">
              Ver más
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

### `src/components/projects/ProjectFilters.tsx`

```tsx
'use client';
import { Input } from '@/components/ui/Input';

interface Props {
  category: string;
  setCategory: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
}

export function ProjectFilters({
  category,
  setCategory,
  search,
  setSearch,
}: Props) {
  const categories = [
    'all',
    'web',
    'mobile',
    'backend',
    'fullstack',
    'ia',
    'other',
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Input
        placeholder="Buscar proyectos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="md:max-w-xs"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-3 py-2 dark:bg-slate-800"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat === 'all' ? '' : cat}>
            {cat.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
```

---

### `src/components/projects/ProjectGallery.tsx`

```tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';

interface Media {
  url: string;
  publicId: string;
  alt?: string;
}

export function ProjectGallery({
  images,
  videos,
}: {
  images: Media[];
  videos?: Media[];
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>('');

  const openModal = (url: string) => {
    setSelected(url);
    setOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <div
            key={img.publicId}
            className="relative h-40 cursor-pointer"
            onClick={() => openModal(img.url)}
          >
            <Image
              src={img.url}
              alt={img.alt || 'Imagen'}
              fill
              className="object-cover rounded"
            />
          </div>
        ))}

        {videos?.map((vid) => (
          <div
            key={vid.publicId}
            className="relative h-40 cursor-pointer"
            onClick={() => openModal(vid.url)}
          >
            <video
              src={vid.url}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          className="fixed inset-0 bg-black/80"
          onClick={() => setOpen(false)}
        />
        <div className="relative max-w-4xl w-full mx-4">
          {selected.includes('video') ? (
            <video src={selected} controls className="w-full rounded" />
          ) : (
            <img src={selected} alt="Preview" className="w-full rounded" />
          )}
        </div>
      </Dialog>
    </div>
  );
}
```

---

### `src/components/skills/SkillCard.tsx`

```tsx
import { Skill } from '@/lib/api/skills.api';

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="border rounded p-4 space-y-3">
      <div className="flex items-center gap-3">
        {skill.icon && <span className="text-3xl">{skill.icon}</span>}
        <div className="flex-1">
          <h3 className="font-semibold">{skill.name}</h3>
          <span className="text-xs text-gray-500">{skill.category}</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${skill.level}%` }}
        />
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        {skill.description}
      </div>
    </div>
  );
}
```

---

### `src/app/(public)/projects/page.tsx`

```tsx
'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { projectsAPI } from '@/lib/api/projects.api';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilters } from '@/components/projects/ProjectFilters';

export default function ProjectsPage() {
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['projects', category, search],
    queryFn: () => projectsAPI.getAll({ category, search }),
  });

  if (isLoading) return <div className="p-6">Cargando proyectos...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Proyectos</h1>

      <ProjectFilters
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {data?.data?.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No se encontraron proyectos.
        </p>
      )}
    </div>
  );
}
```

---

### `src/app/(public)/projects/[id]/page.tsx`

```tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { projectsAPI } from '@/lib/api/projects.api';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { Button } from '@/components/ui/Button';

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', params.id],
    queryFn: () => projectsAPI.getById(params.id),
  });

  if (isLoading) return <div className="p-6">Cargando...</div>;
  if (!project) return <div className="p-6">Proyecto no encontrado.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold">{project.title}</h1>
      <p className="text-gray-600 dark:text-gray-400">{project.description}</p>

      <div className="flex gap-2 flex-wrap">
        {project.technologies?.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank">
            <Button variant="outline">GitHub</Button>
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank">
            <Button>Ver Demo</Button>
          </a>
        )}
      </div>

      <ProjectGallery images={project.images} videos={project.videos} />

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>❤️ {project.likes || 0} likes</span>
        <span>👁️ {project.views || 0} vistas</span>
      </div>
    </div>
  );
}
```

---

### `src/app/(public)/skills/page.tsx`

```tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { skillsAPI } from '@/lib/api/skills.api';
import { SkillCard } from '@/components/skills/SkillCard';

export default function SkillsPage() {
  const { data: skills, isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: skillsAPI.getAll,
  });

  if (isLoading) return <div className="p-6">Cargando skills...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Skills & Tecnologías</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills?.map((skill) => (
          <SkillCard key={skill._id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
```

---

### `src/app/(public)/ai-insights/page.tsx`

```tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { aiInsightsAPI } from '@/lib/api/ai-insights.api';

export default function AIInsightsPage() {
  const { data: insights, isLoading } = useQuery({
    queryKey: ['ai-insights'],
    queryFn: () => aiInsightsAPI.getAll(),
  });

  if (isLoading) return <div className="p-6">Cargando insights...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Insights</h1>

      <div className="space-y-4">
        {insights?.map((insight) => (
          <div key={insight._id} className="border rounded p-4">
            <h3 className="font-bold text-lg">{insight.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {insight.content}
            </p>
            <div className="flex gap-2 mt-3">
              {insight.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-green-100 dark:bg-green-900 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Setup React Query Provider (si no lo hiciste en Fase 3)

`src/app/providers.tsx`

```tsx
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

Y envuélvelo en `src/app/layout.tsx` (root):

```tsx
import Providers from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## Checklist rápida (testing)

- [ ] `/projects` muestra lista de proyectos desde API
- [ ] Filtros por categoría y búsqueda funcionan
- [ ] `/projects/[id]` muestra detalle + galería
- [ ] `/skills` muestra skills con barras de progreso
- [ ] `/ai-insights` muestra lista de insights
- [ ] React Query cachea peticiones correctamente
- [ ] Imágenes Cloudinary cargan (usa transformaciones si es necesario: `.../w_600,h_400,c_fill/...`)

---

## Next: Fase 5 (Auth Pages: Login/Register con validación + UX)

¿Quieres que proceda a crear la Fase 5 o prefieres implementar esta fase primero?
