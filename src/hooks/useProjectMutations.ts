import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminProjectsAPI } from "@/lib/api/admin-projects.api";
import { ProjectInput } from "@/lib/validations/project.schemas";
import toast from "react-hot-toast";

export function useProjectMutations() {
  const queryClient = useQueryClient();

  const createProject = useMutation({
    mutationFn: (data: ProjectInput) => adminProjectsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Proyecto creado");
    },
    onError: () => toast.error("Error al crear proyecto"),
  });

  const updateProject = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectInput> }) =>
      adminProjectsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Proyecto actualizado");
    },
    onError: () => toast.error("Error al actualizar"),
  });

  const deleteProject = useMutation({
    mutationFn: (id: string) => adminProjectsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Proyecto eliminado");
    },
    onError: () => toast.error("Error al eliminar"),
  });

  const uploadImage = useMutation({
    mutationFn: ({ projectId, file }: { projectId: string; file: File }) =>
      adminProjectsAPI.uploadImage(projectId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Imagen subida");
    },
    onError: () => toast.error("Error al subir imagen"),
  });

  const uploadVideo = useMutation({
    mutationFn: ({ projectId, file }: { projectId: string; file: File }) =>
      adminProjectsAPI.uploadVideo(projectId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Video subido");
    },
    onError: () => toast.error("Error al subir video"),
  });

  const deleteImage = useMutation({
    mutationFn: ({
      projectId,
      publicId,
    }: {
      projectId: string;
      publicId: string;
    }) => adminProjectsAPI.deleteImage(projectId, publicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Imagen eliminada");
    },
    onError: () => toast.error("Error al eliminar imagen"),
  });

  const deleteVideo = useMutation({
    mutationFn: ({
      projectId,
      publicId,
    }: {
      projectId: string;
      publicId: string;
    }) => adminProjectsAPI.deleteVideo(projectId, publicId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Video eliminado");
    },
    onError: () => toast.error("Error al eliminar video"),
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
