"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  LayoutDashboard,
  Folder,
  Lightbulb,
  Wrench,
} from "lucide-react";

export function AdminDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-primary-400 hover:text-primary-300 transition-colors relative group font-semibold"
      >
        Admin
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-primary-400 to-purple-500 group-hover:w-full transition-all"></span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-lg border border-slate-800 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-2">
            {/* Dashboard */}
            <Link
              href="/admin/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            {/* Divider */}
            <div className="my-1 h-px bg-slate-800"></div>

            {/* Proyectos */}
            <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Gestión
            </div>
            <Link
              href="/admin/projects"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              <Folder className="w-4 h-4" />
              <span>Proyectos</span>
            </Link>

            {/* Skills (preparado para futuro) */}
            <Link
              href="/admin/skills"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors opacity-50 cursor-not-allowed"
              aria-disabled="true"
            >
              <Wrench className="w-4 h-4" />
              <span>Skills</span>
              <span className="ml-auto text-xs text-slate-500">Pronto</span>
            </Link>

            {/* AI Insights (preparado para futuro) */}
            <Link
              href="/admin/ai-insights"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors opacity-50 cursor-not-allowed"
              aria-disabled="true"
            >
              <Lightbulb className="w-4 h-4" />
              <span>AI Insights</span>
              <span className="ml-auto text-xs text-slate-500">Pronto</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
