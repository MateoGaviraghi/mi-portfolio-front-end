# 🚀 FASE 8: MÓDULOS ADICIONALES (CRUD COMPLETO) - GUÍA CONCISA

Objetivo: Implementar CRUD completo para Skills, Reviews, AI Insights y Analytics (admin + público).

---

## Archivos a crear/editar

### Skills Module

- `src/app/(admin)/skills/page.tsx` (lista admin)
- `src/app/(admin)/skills/new/page.tsx` (crear)
- `src/app/(admin)/skills/[id]/edit/page.tsx` (editar)
- `src/components/admin/SkillForm.tsx`
- `src/lib/validations/skill.schemas.ts`
- `src/lib/api/admin-skills.api.ts`
- `src/hooks/useSkillMutations.ts`

### Reviews Module

- `src/app/(admin)/reviews/page.tsx` (gestión admin)
- `src/app/(public)/reviews/page.tsx` (vista pública)
- `src/components/reviews/ReviewCard.tsx`
- `src/components/reviews/ReviewForm.tsx`
- `src/lib/validations/review.schemas.ts`
- `src/lib/api/reviews.api.ts`
- `src/hooks/useReviewMutations.ts`

### AI Insights Module

- `src/app/(admin)/ai-insights/page.tsx` (lista admin)
- `src/app/(admin)/ai-insights/new/page.tsx` (crear)
- `src/components/admin/AIInsightForm.tsx`
- `src/lib/validations/ai-insight.schemas.ts`
- `src/lib/api/admin-ai-insights.api.ts`

### Analytics Module

- `src/app/(admin)/analytics/page.tsx` (dashboard)
- `src/components/analytics/AnalyticsDashboard.tsx`
- `src/components/analytics/Charts.tsx`
- `src/lib/api/analytics.api.ts`

---

## 1. SKILLS MODULE

### `src/lib/validations/skill.schemas.ts`

```ts
import { z } from 'zod';

export const skillSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
  category: z.string().min(2, 'Categoría requerida'),
  level: z.number().min(0).max(100, 'Nivel entre 0-100'),
  icon: z.string().optional(),
  description: z.string().optional(),
});

export type SkillInput = z.infer<typeof skillSchema>;
```

---

### `src/lib/api/admin-skills.api.ts`

```ts
import apiClient from './client';
import { SkillInput } from '@/lib/validations/skill.schemas';

export const adminSkillsAPI = {
  create: async (data: SkillInput) => {
    const { data: result } = await apiClient.post('/skills', data);
    return result;
  },

  update: async (id: string, data: Partial<SkillInput>) => {
    const { data: result } = await apiClient.patch(`/skills/${id}`, data);
    return result;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/skills/${id}`);
  },
};
```

---

### `src/hooks/useSkillMutations.ts`

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminSkillsAPI } from '@/lib/api/admin-skills.api';
import { SkillInput } from '@/lib/validations/skill.schemas';
import toast from 'react-hot-toast';

export function useSkillMutations() {
  const queryClient = useQueryClient();

  const createSkill = useMutation({
    mutationFn: (data: SkillInput) => adminSkillsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill creada');
    },
    onError: () => toast.error('Error al crear skill'),
  });

  const updateSkill = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SkillInput> }) =>
      adminSkillsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill actualizada');
    },
    onError: () => toast.error('Error al actualizar'),
  });

  const deleteSkill = useMutation({
    mutationFn: (id: string) => adminSkillsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill eliminada');
    },
    onError: () => toast.error('Error al eliminar'),
  });

  return { createSkill, updateSkill, deleteSkill };
}
```

---

### `src/components/admin/SkillForm.tsx`

```tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { skillSchema, SkillInput } from '@/lib/validations/skill.schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Props {
  initialData?: Partial<SkillInput>;
  onSubmit: (data: SkillInput) => void;
  isLoading?: boolean;
}

export function SkillForm({ initialData, onSubmit, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillInput>({
    resolver: zodResolver(skillSchema),
    defaultValues: initialData || { level: 50 },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
      <Input
        label="Nombre"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label="Categoría"
        {...register('category')}
        error={errors.category?.message}
      />

      <div>
        <label className="block mb-1 text-sm font-medium">Nivel (0-100)</label>
        <input
          type="number"
          {...register('level', { valueAsNumber: true })}
          min="0"
          max="100"
          className="w-full border rounded p-2"
        />
        {errors.level && (
          <span className="text-red-600 text-sm">{errors.level.message}</span>
        )}
      </div>

      <Input
        label="Icono (emoji o clase)"
        {...register('icon')}
        error={errors.icon?.message}
      />

      <div>
        <label className="block mb-1 text-sm font-medium">Descripción</label>
        <textarea
          {...register('description')}
          className="w-full border rounded p-2"
          rows={3}
        />
      </div>

      <Button type="submit" isLoading={isLoading}>
        {initialData ? 'Actualizar' : 'Crear'} Skill
      </Button>
    </form>
  );
}
```

---

### `src/app/(admin)/skills/page.tsx`

```tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { skillsAPI } from '@/lib/api/skills.api';
import { useSkillMutations } from '@/hooks/useSkillMutations';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function AdminSkillsPage() {
  const { data: skills } = useQuery({
    queryKey: ['skills'],
    queryFn: () => skillsAPI.getAll(),
  });

  const { deleteSkill } = useSkillMutations();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Skills</h1>
        <Link href="/admin/skills/new">
          <Button>Nueva Skill</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {skills?.map((skill) => (
          <div
            key={skill._id}
            className="border rounded p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-bold">{skill.name}</h3>
              <p className="text-sm text-gray-600">
                {skill.category} - Nivel: {skill.level}%
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/skills/${skill._id}/edit`}>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteSkill.mutate(skill._id)}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### `src/app/(admin)/skills/new/page.tsx`

```tsx
'use client';
import { useRouter } from 'next/navigation';
import { SkillForm } from '@/components/admin/SkillForm';
import { useSkillMutations } from '@/hooks/useSkillMutations';

export default function NewSkillPage() {
  const router = useRouter();
  const { createSkill } = useSkillMutations();

  const handleSubmit = async (data: any) => {
    await createSkill.mutateAsync(data);
    router.push('/admin/skills');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Crear Skill</h1>
      <SkillForm onSubmit={handleSubmit} isLoading={createSkill.isPending} />
    </div>
  );
}
```

---

## 2. REVIEWS MODULE

### `src/lib/validations/review.schemas.ts`

```ts
import { z } from 'zod';

export const reviewSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
  position: z.string().min(2, 'Posición requerida'),
  company: z.string().min(2, 'Empresa requerida'),
  content: z.string().min(10, 'Mínimo 10 caracteres'),
  rating: z.number().min(1).max(5),
  avatar: z.string().url().optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
```

---

### `src/lib/api/reviews.api.ts`

```ts
import apiClient from './client';
import { ReviewInput } from '@/lib/validations/review.schemas';

export interface Review {
  _id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const reviewsAPI = {
  // Público
  getApproved: async () => {
    const { data } = await apiClient.get<Review[]>('/reviews');
    return data;
  },

  create: async (data: ReviewInput) => {
    const { data: result } = await apiClient.post<Review>('/reviews', data);
    return result;
  },

  // Admin
  getAll: async () => {
    const { data } = await apiClient.get<Review[]>('/reviews/all');
    return data;
  },

  approve: async (id: string) => {
    await apiClient.post(`/reviews/${id}/approve`);
  },

  reject: async (id: string) => {
    await apiClient.post(`/reviews/${id}/reject`);
  },

  delete: async (id: string) => {
    await apiClient.delete(`/reviews/${id}`);
  },
};
```

---

### `src/components/reviews/ReviewCard.tsx`

```tsx
import { Review } from '@/lib/api/reviews.api';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border rounded p-6 space-y-3">
      <div className="flex items-center gap-3">
        {review.avatar && (
          <img
            src={review.avatar}
            alt={review.name}
            className="w-12 h-12 rounded-full"
          />
        )}
        <div>
          <h3 className="font-bold">{review.name}</h3>
          <p className="text-sm text-gray-600">
            {review.position} en {review.company}
          </p>
        </div>
      </div>

      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i}>{i < review.rating ? '⭐' : '☆'}</span>
        ))}
      </div>

      <p className="text-gray-700">{review.content}</p>
    </div>
  );
}
```

---

### `src/components/reviews/ReviewForm.tsx`

```tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema, ReviewInput } from '@/lib/validations/review.schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Props {
  onSubmit: (data: ReviewInput) => void;
  isLoading?: boolean;
}

export function ReviewForm({ onSubmit, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5 },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
      <Input
        label="Nombre"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label="Posición"
        {...register('position')}
        error={errors.position?.message}
      />
      <Input
        label="Empresa"
        {...register('company')}
        error={errors.company?.message}
      />

      <div>
        <label className="block mb-1 text-sm font-medium">Rating (1-5)</label>
        <input
          type="number"
          {...register('rating', { valueAsNumber: true })}
          min="1"
          max="5"
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Comentario</label>
        <textarea
          {...register('content')}
          className="w-full border rounded p-2"
          rows={4}
        />
        {errors.content && (
          <span className="text-red-600 text-sm">{errors.content.message}</span>
        )}
      </div>

      <Input
        label="Avatar URL (opcional)"
        {...register('avatar')}
        error={errors.avatar?.message}
      />

      <Button type="submit" isLoading={isLoading}>
        Enviar Review
      </Button>
    </form>
  );
}
```

---

### `src/app/(admin)/reviews/page.tsx`

```tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { reviewsAPI } from '@/lib/api/reviews.api';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function AdminReviewsPage() {
  const { data: reviews, refetch } = useQuery({
    queryKey: ['reviews-all'],
    queryFn: () => reviewsAPI.getAll(),
  });

  const handleApprove = async (id: string) => {
    await reviewsAPI.approve(id);
    toast.success('Review aprobada');
    refetch();
  };

  const handleReject = async (id: string) => {
    await reviewsAPI.reject(id);
    toast.success('Review rechazada');
    refetch();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Reviews</h1>

      <div className="space-y-4">
        {reviews?.map((review) => (
          <div key={review._id} className="border rounded p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold">{review.name}</h3>
                <p className="text-sm text-gray-600">
                  {review.position} - {review.company}
                </p>
                <p className="mt-2">{review.content}</p>
                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                    review.status === 'approved'
                      ? 'bg-green-100'
                      : review.status === 'rejected'
                        ? 'bg-red-100'
                        : 'bg-yellow-100'
                  }`}
                >
                  {review.status}
                </span>
              </div>

              {review.status === 'pending' && (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleApprove(review._id)}>
                    Aprobar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(review._id)}
                  >
                    Rechazar
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 3. AI INSIGHTS MODULE

### `src/lib/validations/ai-insight.schemas.ts`

```ts
import { z } from 'zod';

export const aiInsightSchema = z.object({
  title: z.string().min(5, 'Mínimo 5 caracteres'),
  content: z.string().min(20, 'Mínimo 20 caracteres'),
  category: z.string().min(2, 'Categoría requerida'),
  tags: z.array(z.string()).optional(),
  projectId: z.string().optional(),
});

export type AIInsightInput = z.infer<typeof aiInsightSchema>;
```

---

### `src/lib/api/admin-ai-insights.api.ts`

```ts
import apiClient from './client';
import { AIInsightInput } from '@/lib/validations/ai-insight.schemas';

export const adminAIInsightsAPI = {
  create: async (data: AIInsightInput) => {
    const { data: result } = await apiClient.post('/ai-insights', data);
    return result;
  },

  update: async (id: string, data: Partial<AIInsightInput>) => {
    const { data: result } = await apiClient.patch(`/ai-insights/${id}`, data);
    return result;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/ai-insights/${id}`);
  },
};
```

---

### `src/components/admin/AIInsightForm.tsx`

```tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  aiInsightSchema,
  AIInsightInput,
} from '@/lib/validations/ai-insight.schemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Props {
  initialData?: Partial<AIInsightInput>;
  onSubmit: (data: AIInsightInput) => void;
  isLoading?: boolean;
}

export function AIInsightForm({ initialData, onSubmit, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AIInsightInput>({
    resolver: zodResolver(aiInsightSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
      <Input
        label="Título"
        {...register('title')}
        error={errors.title?.message}
      />

      <div>
        <label className="block mb-1 text-sm font-medium">Contenido</label>
        <textarea
          {...register('content')}
          className="w-full border rounded p-2"
          rows={6}
        />
        {errors.content && (
          <span className="text-red-600 text-sm">{errors.content.message}</span>
        )}
      </div>

      <Input
        label="Categoría"
        {...register('category')}
        error={errors.category?.message}
      />

      <div>
        <label className="block mb-1 text-sm font-medium">
          Tags (separados por coma)
        </label>
        <input
          type="text"
          {...register('tags', {
            setValueAs: (v) =>
              v
                .split(',')
                .map((t: string) => t.trim())
                .filter(Boolean),
          })}
          placeholder="AI, Machine Learning, NLP"
          className="w-full border rounded p-2"
        />
      </div>

      <Input
        label="ID Proyecto relacionado (opcional)"
        {...register('projectId')}
        error={errors.projectId?.message}
      />

      <Button type="submit" isLoading={isLoading}>
        {initialData ? 'Actualizar' : 'Crear'} Insight
      </Button>
    </form>
  );
}
```

---

### `src/app/(admin)/ai-insights/page.tsx`

```tsx
'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiInsightsAPI } from '@/lib/api/ai-insights.api';
import { adminAIInsightsAPI } from '@/lib/api/admin-ai-insights.api';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminAIInsightsPage() {
  const queryClient = useQueryClient();
  const { data: insights } = useQuery({
    queryKey: ['ai-insights'],
    queryFn: () => aiInsightsAPI.getAll(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminAIInsightsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-insights'] });
      toast.success('Insight eliminado');
    },
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">AI Insights</h1>
        <Link href="/admin/ai-insights/new">
          <Button>Nuevo Insight</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {insights?.map((insight) => (
          <div
            key={insight._id}
            className="border rounded p-4 flex items-start justify-between"
          >
            <div>
              <h3 className="font-bold">{insight.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{insight.category}</p>
              <p className="mt-2 line-clamp-2">{insight.content}</p>
              {insight.tags && (
                <div className="flex gap-2 mt-2">
                  {insight.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/ai-insights/${insight._id}/edit`}>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteMutation.mutate(insight._id)}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 4. ANALYTICS MODULE

### `src/lib/api/analytics.api.ts`

```ts
import apiClient from './client';

export const analyticsAPI = {
  getOverview: async () => {
    const { data } = await apiClient.get('/analytics/overview');
    return data;
  },

  getDevices: async () => {
    const { data } = await apiClient.get('/analytics/devices');
    return data;
  },

  getGeo: async () => {
    const { data } = await apiClient.get('/analytics/geo');
    return data;
  },

  getTimeseries: async (days = 30) => {
    const { data } = await apiClient.get(`/analytics/timeseries?days=${days}`);
    return data;
  },
};
```

---

### `src/app/(admin)/analytics/page.tsx`

```tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { analyticsAPI } from '@/lib/api/analytics.api';

export default function AnalyticsPage() {
  const { data: overview } = useQuery({
    queryKey: ['analytics-overview'],
    queryFn: () => analyticsAPI.getOverview(),
  });

  const { data: devices } = useQuery({
    queryKey: ['analytics-devices'],
    queryFn: () => analyticsAPI.getDevices(),
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="border rounded p-4">
          <h3 className="text-sm text-gray-600">Total Visitas</h3>
          <p className="text-3xl font-bold">{overview?.totalVisits || 0}</p>
        </div>
        <div className="border rounded p-4">
          <h3 className="text-sm text-gray-600">Visitas Únicas</h3>
          <p className="text-3xl font-bold">{overview?.uniqueVisitors || 0}</p>
        </div>
        <div className="border rounded p-4">
          <h3 className="text-sm text-gray-600">Proyectos Vistos</h3>
          <p className="text-3xl font-bold">{overview?.projectViews || 0}</p>
        </div>
        <div className="border rounded p-4">
          <h3 className="text-sm text-gray-600">Avg. Duración</h3>
          <p className="text-3xl font-bold">{overview?.avgDuration || 0}s</p>
        </div>
      </div>

      <div className="border rounded p-6">
        <h2 className="text-xl font-bold mb-4">Dispositivos</h2>
        <div className="space-y-2">
          {devices?.map((device: any) => (
            <div
              key={device.type}
              className="flex items-center justify-between"
            >
              <span>{device.type}</span>
              <span className="font-bold">{device.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## Checklist de implementación

### Skills

- [ ] Admin CRUD completo
- [ ] Vista pública con progress bars
- [ ] Validaciones Zod
- [ ] Mutations con React Query

### Reviews

- [ ] Formulario público para enviar reviews
- [ ] Admin puede aprobar/rechazar
- [ ] Vista pública solo muestra aprobadas
- [ ] Estados: pending/approved/rejected

### AI Insights

- [ ] Admin CRUD completo
- [ ] Vista pública lista insights
- [ ] Tags y categorías
- [ ] Relación opcional con proyectos

### Analytics

- [ ] Dashboard admin con stats
- [ ] Tracking automático de páginas
- [ ] Gráficos de dispositivos y geo
- [ ] Timeline de visitas

---

## Navegación Admin (actualizar Sidebar)

Agregar links en `src/components/layout/AdminSidebar.tsx`:

```tsx
<nav>
  <Link href="/admin/dashboard">Dashboard</Link>
  <Link href="/admin/projects">Proyectos</Link>
  <Link href="/admin/skills">Skills</Link>
  <Link href="/admin/reviews">Reviews</Link>
  <Link href="/admin/ai-insights">AI Insights</Link>
  <Link href="/admin/analytics">Analytics</Link>
</nav>
```

---

## 🎉 ¡Módulos completos!

Ahora tienes CRUD completo para todos los módulos del backend 🚀
