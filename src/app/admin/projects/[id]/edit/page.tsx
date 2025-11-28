"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { projectsAPI } from "@/lib/api/projects.api";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { CloudinaryUpload } from "@/components/admin/CloudinaryUpload";
import { useProjectMutations } from "@/hooks/useProjectMutations";
import { ProjectInput } from "@/lib/validations/project.schemas";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import Image from "next/image";

export default function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { data: project, isLoading } = useQuery({
    queryKey: ["project", params.id],
    queryFn: () => projectsAPI.getById(params.id),
  });

  const { updateProject, uploadImage, uploadVideo, deleteImage, deleteVideo } =
    useProjectMutations();

  const handleSubmit = async (data: ProjectInput) => {
    await updateProject.mutateAsync({ id: params.id, data });
    router.push("/admin/projects");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 pb-12 flex items-center justify-center">
        <p className="text-slate-400">Cargando proyecto...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Proyecto no encontrado</p>
          <Link href="/admin/projects">
            <Button>Volver a proyectos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/admin/projects">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
            <Edit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Editar Proyecto
            </h1>
            <p className="text-slate-400 mt-1">{project.title}</p>
          </div>
        </div>

        {/* Form */}
        <ProjectForm
          initialData={{
            title: project.title,
            description: project.description,
            category: project.category as
              | "web"
              | "mobile"
              | "backend"
              | "fullstack"
              | "ia"
              | "other",
            technologies: project.technologies,
            githubUrl: project.githubUrl,
            liveUrl: project.liveUrl,
            featured: project.featured,
          }}
          onSubmit={handleSubmit}
          isLoading={updateProject.isPending}
        />

        {/* Images Section */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <ImageIcon className="w-6 h-6 text-primary-400" />
            <h2 className="text-xl font-bold text-white">Imágenes</h2>
          </div>

          <CloudinaryUpload
            projectId={params.id}
            type="image"
            onUpload={(file) =>
              uploadImage.mutate({ projectId: params.id, file })
            }
            isLoading={uploadImage.isPending}
          />

          {project.images && project.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.images.map((img) => (
                <div
                  key={img.publicId}
                  className="relative group rounded-lg overflow-hidden border border-slate-700"
                >
                  <Image
                    src={img.url}
                    alt={img.alt || ""}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        deleteImage.mutate({
                          projectId: params.id,
                          publicId: img.publicId,
                        })
                      }
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm text-center py-8">
              No hay imágenes. Sube la primera imagen.
            </p>
          )}
        </div>

        {/* Videos Section */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <Video className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Videos</h2>
          </div>

          <CloudinaryUpload
            projectId={params.id}
            type="video"
            onUpload={(file) =>
              uploadVideo.mutate({ projectId: params.id, file })
            }
            isLoading={uploadVideo.isPending}
          />

          {project.videos && project.videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.videos.map((vid) => (
                <div
                  key={vid.publicId}
                  className="relative group rounded-lg overflow-hidden border border-slate-700"
                >
                  <video
                    src={vid.url}
                    className="w-full h-48 object-cover"
                    controls
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        deleteVideo.mutate({
                          projectId: params.id,
                          publicId: vid.publicId,
                        })
                      }
                      className="bg-red-500/90 hover:bg-red-600 text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm text-center py-8">
              No hay videos. Sube el primer video.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
