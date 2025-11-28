"use client";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Upload, Image as ImageIcon, Video } from "lucide-react";

interface Props {
  projectId: string;
  type: "image" | "video";
  onUpload: (file: File) => void;
  isLoading?: boolean;
}

export function CloudinaryUpload({ type, onUpload, isLoading }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      setFile(null);
      setPreview(null);
    }
  };

  const accept = type === "image" ? "image/*" : "video/*";
  const Icon = type === "image" ? ImageIcon : Video;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="flex-1 cursor-pointer">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 hover:border-slate-600 transition-all">
            <Icon className="w-5 h-5 text-slate-400" />
            <span className="text-slate-300">
              {file
                ? file.name
                : `Seleccionar ${type === "image" ? "imagen" : "video"}`}
            </span>
          </div>
          <input
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
        </label>

        <Button
          onClick={handleUpload}
          disabled={!file || isLoading}
          isLoading={isLoading}
          className="bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700"
        >
          <Upload className="w-4 h-4 mr-2" />
          Subir
        </Button>
      </div>

      {preview && (
        <div className="relative w-full max-w-sm rounded-lg overflow-hidden border border-slate-700">
          {type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Preview" className="w-full h-auto" />
          ) : (
            <video src={preview} className="w-full h-auto" controls />
          )}
        </div>
      )}
    </div>
  );
}
