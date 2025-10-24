"use client";
import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { X, Play } from "lucide-react";

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
  const [selected, setSelected] = useState<string>("");
  const [isVideo, setIsVideo] = useState(false);

  const openModal = (url: string, isVid: boolean = false) => {
    setSelected(url);
    setIsVideo(isVid);
    setOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div
            key={img.publicId}
            className="relative h-40 cursor-pointer group overflow-hidden rounded-lg"
            onClick={() => openModal(img.url, false)}
          >
            <Image
              src={img.url}
              alt={img.alt || `Imagen ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </div>
        ))}

        {videos?.map((vid) => (
          <div
            key={vid.publicId}
            className="relative h-40 cursor-pointer group overflow-hidden rounded-lg"
            onClick={() => openModal(vid.url, true)}
          >
            <video src={vid.url} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-slate-900 ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative max-w-5xl w-full">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary-400 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
              {isVideo ? (
                <video
                  src={selected}
                  controls
                  autoPlay
                  className="w-full max-h-[80vh]"
                />
              ) : (
                <div className="relative w-full h-[80vh]">
                  <Image
                    src={selected}
                    alt="Preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
