# 🚀 FASE 6: PÁGINAS ADMIN (CRUD PROYECTOS) - GUÍA CONCISA

Objetivo: Implementar panel admin con CRUD completo de proyectos, upload de imágenes/videos a Cloudinary, gestión de contenido y validaciones.

---

## Archivos a crear/editar

- `src/app/(admin)/dashboard/page.tsx`
- `src/app/(admin)/projects/page.tsx` (lista admin proyectos)
- `src/app/(admin)/projects/new/page.tsx` (crear proyecto)
- `src/app/(admin)/projects/[id]/edit/page.tsx` (editar proyecto)
- `src/components/admin/ProjectForm.tsx` (formulario reutilizable)
- `src/components/admin/ProjectTable.tsx` (tabla con acciones)
- `src/components/admin/CloudinaryUpload.tsx` (upload widget)
- `src/lib/validations/project.schemas.ts` (Zod schemas)
- `src/lib/api/admin-projects.api.ts` (endpoints admin)
- `src/hooks/useProjectMutations.ts` (React Query mutations)

---

## Comandos (dependencias si faltan)

```bash
npm install @tanstack/react-query react-hot-toast
```

---

## Código (copiar/pegar funcional)

### `src/lib/validations/project.schemas.ts`

```ts
import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(3, 'Mínimo 3 caracteres'),
  description: z.string().min(10, 'Mínimo 10 caracteres'),
  category: z.enum(['web', 'mobile', 'backend', 'fullstack', 'ia', 'other']),
  technologies: z.array(z.string()).min(1, 'Agrega al menos una tecnología'),
  githubUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  liveUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  featured: z.boolean().optional(),
});

export type ProjectInput = z.infer<typeof projectSchema>;
```

---

### `src/lib/api/admin-projects.api.ts`

```ts
import apiClient from './client';
import { ProjectInput } from '@/lib/validations/project.schemas';

export const adminProjectsAPI = {
  create: async (data: ProjectInput) => {
    const { data: result } = await apiClient.post('/projects', data);
    return result;
  },

  update: async (id: string, data: Partial<ProjectInput>) => {
    const { data: result } = await apiClient.patch(`/projects/${id}`, data);
    return result;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/projects/${id}`);
  },

  uploadImage: async (projectId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post(`/upload/project/${projectId}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  uploadVideo: async (projectId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post(`/upload/project/${projectId}/video`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  deleteImage: async (projectId: string, publicId: string) => {
    await apiClient.delete(`/upload/project/${projectId}/image/${encodeURIComponent(publicId)}`);
  },

  deleteVideo: async (projectId: string, publicId: string) => {
    await apiClient.delete(`/upload/project/${projectId}/video/${encodeURIComponent(publicId)}`);
  },
};
```

---

### `src/hooks/useProjectMutations.ts`

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminProjectsAPI } from '@/lib/api/admin-projects.api';
import { ProjectInput } from '@/lib/validations/project.schemas';
import toast from 'react-hot-toast';

export function useProjectMutations() {
  const queryClient = useQueryClient();

  const createProject = useMutation({
    mutationFn: (data: ProjectInput) => adminProjectsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Proyecto creado');
    },
    onError: () => toast.error('Error al crear proyecto'),
  });

  const updateProject = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectInput> }) =>
      adminProjectsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Proyecto actualizado');
    },
    onError: () => toast.error('Error al actualizar'),
  });

  const deleteProject = useMutation({
    mutationFn: (id: string) => adminProjectsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Proyecto eliminado');
    },
    onError: () => toast.error('Error al eliminar'),
  });

  const uploadImage = useMutation({
    mutationFn: ({ projectId, file }: { projectId: string; file: File }) =>
      adminProjectsAPI.uploadImage(projectId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Imagen subida');
    },
    onError: () => toast.error('Error al subir imagen'),
  });

  const uploadVideo = useMutation({
    mutationFn: ({ projectId, file }: { projectId: string; file: File }) =>
      adminProjectsAPI.uploadVideo(projectId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Video subido');
    },
    onError: () => toast.error('Error al subir video'),
  });

  const deleteImage = useMutation({
    mutationFn: ({ projectId, publicId }: { projectId: string; publicId: string }) =>
      adminProjectsAPI.deleteImage(projectId, publicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Imagen eliminada');
    },
    onError: () => toast.error('Error al eliminar imagen'),
  });

  const deleteVideo = useMutation({
    mutationFn: ({ projectId, publicId }: { projectId: string; publicId: string }) =>
      adminProjectsAPI.deleteVideo(projectId, publicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Video eliminado');
    },
    onError: () => toast.error('Error al eliminar video'),
  });

  return {
    createProject,
    updateProject,
    deleteProject,
    uploadImage,
    uploadVideo,
    deleteImage,
    deleteVideo,
  };
}
```

---

### `src/components/admin/ProjectForm.tsx`

```tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, ProjectInput } from '@/lib/validations/project.schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Props {
  initialData?: Partial<ProjectInput>;
  onSubmit: (data: ProjectInput) => void;
  isLoading?: boolean;
}

export function ProjectForm({ initialData, onSubmit, isLoading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      category: 'web',
      technologies: [],
      featured: false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
      <Input label="Título" {...register('title')} error={errors.title?.message} />
      
      <div>
        <label className="block mb-1 text-sm font-medium">Descripción</label>
        <textarea {...register('description')} className="w-full border rounded p-2" rows={4} />
        {errors.description && <span className="text-red-600 text-sm">{errors.description.message}</span>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Categoría</label>
        <select {...register('category')} className="w-full border rounded p-2">
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Fullstack</option>
          <option value="ia">IA</option>
          <option value="other">Otro</option>
        </select>
        {errors.category && <span className="text-red-600 text-sm">{errors.category.message}</span>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Tecnologías (separadas por coma)</label>
        <input
          type="text"
          {...register('technologies', {
            setValueAs: (v) => v.split(',').map((t: string) => t.trim()).filter(Boolean),
          })}
          placeholder="React, TypeScript, Node.js"
          className="w-full border rounded p-2"
        />
        {errors.technologies && <span className="text-red-600 text-sm">{errors.technologies.message}</span>}
      </div>

      <Input label="GitHub URL (opcional)" {...register('githubUrl')} error={errors.githubUrl?.message} />
      <Input label="Live URL (opcional)" {...register('liveUrl')} error={errors.liveUrl?.message} />

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register('featured')} id="featured" />
        <label htmlFor="featured">Proyecto destacado</label>
      </div>

      <Button type="submit" isLoading={isLoading}>
        {initialData ? 'Actualizar' : 'Crear'} Proyecto
      </Button>
    </form>
  );
}
```

---

### `src/components/admin/CloudinaryUpload.tsx`

```tsx
'use client';
import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/Button';

interface Props {
  projectId: string;
  type: 'image' | 'video';
  onUpload: (file: File) => void;
  isLoading?: boolean;
}

export function CloudinaryUpload({ projectId, type, onUpload, isLoading }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) onUpload(file);
  };

  const accept = type === 'image' ? 'image/*' : 'video/*';

  return (
    <div className="flex items-center gap-3">
      <input type="file" accept={accept} onChange={handleChange} />
      <Button onClick={handleUpload} disabled={!file} isLoading={isLoading}>
        Subir {type === 'image' ? 'Imagen' : 'Video'}
      </Button>
    </div>
  );
}
```

---

### `src/components/admin/ProjectTable.tsx`

```tsx
'use client';
import Link from 'next/link';
import { Project } from '@/lib/api/projects.api';
import { Button } from '@/components/ui/Button';

interface Props {
  projects: Project[];
  onDelete: (id: string) => void;
}

export function ProjectTable({ projects, onDelete }: Props) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="text-left p-3">Título</th>
          <th className="text-left p-3">Categoría</th>
          <th className="text-left p-3">Destacado</th>
          <th className="text-left p-3">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project._id} className="border-b">
            <td className="p-3">{project.title}</td>
            <td className="p-3">{project.category}</td>
            <td className="p-3">{project.featured ? '⭐' : '-'}</td>
            <td className="p-3 flex gap-2">
              <Link href={`/admin/projects/${project._id}/edit`}>
                <Button variant="outline" size="sm">Editar</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => onDelete(project._id)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

### `src/app/(admin)/dashboard/page.tsx`

```tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { projectsAPI } from '@/lib/api/projects.api';

export default function AdminDashboard() {
  const { data } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => projectsAPI.getAll(),
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded p-4">
          <h3 className="text-lg font-semibold">Total Proyectos</h3>
          <p className="text-3xl">{data?.total || 0}</p>
        </div>
      </div>
    </div>
  );
}
```

---

### `src/app/(admin)/projects/page.tsx`

```tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { projectsAPI } from '@/lib/api/projects.api';
import { ProjectTable } from '@/components/admin/ProjectTable';
import { useProjectMutations } from '@/hooks/useProjectMutations';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function AdminProjectsPage() {
  const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsAPI.getAll(),
  });

  const { deleteProject } = useProjectMutations();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Proyectos</h1>
        <Link href="/admin/projects/new">
          <Button>Nuevo Proyecto</Button>
        </Link>
      </div>

      {data?.data && (
        <ProjectTable projects={data.data} onDelete={(id) => deleteProject.mutate(id)} />
      )}
    </div>
  );
}
```

---

### `src/app/(admin)/projects/new/page.tsx`

```tsx
'use client';
import { useRouter } from 'next/navigation';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { useProjectMutations } from '@/hooks/useProjectMutations';

export default function NewProjectPage() {
  const router = useRouter();
  const { createProject } = useProjectMutations();

  const handleSubmit = async (data: any) => {
    await createProject.mutateAsync(data);
    router.push('/admin/projects');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Crear Proyecto</h1>
      <ProjectForm onSubmit={handleSubmit} isLoading={createProject.isPending} />
    </div>
  );
}
```

---

### `src/app/(admin)/projects/[id]/edit/page.tsx`

```tsx
'use client';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { projectsAPI } from '@/lib/api/projects.api';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { CloudinaryUpload } from '@/components/admin/CloudinaryUpload';
import { useProjectMutations } from '@/hooks/useProjectMutations';
import { Button } from '@/components/ui/Button';

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: project } = useQuery({
    queryKey: ['project', params.id],
    queryFn: () => projectsAPI.getById(params.id),
  });

  const { updateProject, uploadImage, uploadVideo, deleteImage, deleteVideo } = useProjectMutations();

  const handleSubmit = async (data: any) => {
    await updateProject.mutateAsync({ id: params.id, data });
    router.push('/admin/projects');
  };

  if (!project) return <div className="p-6">Cargando...</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Editar Proyecto</h1>

      <ProjectForm
        initialData={project}
        onSubmit={handleSubmit}
        isLoading={updateProject.isPending}
      />

      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Imágenes</h2>
        <CloudinaryUpload
          projectId={params.id}
          type="image"
          onUpload={(file) => uploadImage.mutate({ projectId: params.id, file })}
          isLoading={uploadImage.isPending}
        />

        <div className="grid grid-cols-3 gap-4 mt-4">
          {project.images?.map((img) => (
            <div key={img.publicId} className="relative">
              <img src={img.url} alt="" className="w-full h-40 object-cover rounded" />
              <Button
                size="sm"
                onClick={() => deleteImage.mutate({ projectId: params.id, publicId: img.publicId })}
              >
                Eliminar
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Videos</h2>
        <CloudinaryUpload
          projectId={params.id}
          type="video"
          onUpload={(file) => uploadVideo.mutate({ projectId: params.id, file })}
          isLoading={uploadVideo.isPending}
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          {project.videos?.map((vid) => (
            <div key={vid.publicId} className="relative">
              <video src={vid.url} className="w-full h-40 object-cover rounded" controls />
              <Button
                size="sm"
                onClick={() => deleteVideo.mutate({ projectId: params.id, publicId: vid.publicId })}
              >
                Eliminar
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## Setup Toast Provider (si no lo hiciste)

`src/app/providers.tsx`:

```tsx
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
```

---

## Checklist rápida (testing)

- [ ] `/admin/dashboard` muestra stats
- [ ] `/admin/projects` lista proyectos con acciones
- [ ] `/admin/projects/new` crea proyecto
- [ ] `/admin/projects/[id]/edit` edita proyecto
- [ ] Upload imágenes/videos funciona
- [ ] Eliminar imágenes/videos funciona
- [ ] Validaciones Zod funcionan
- [ ] Toasts se muestran correctamente
- [ ] React Query invalida cache después de mutaciones

---

## Next: Fase 7 (CRUD Skills, Reviews, AI Insights + Analytics Dashboard)

Avísame cuando termines 🚀