"use client";
import { Input } from "@/components/ui/Input";
import { Search, Filter } from "lucide-react";

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
    { value: "", label: "Todos" },
    { value: "web", label: "Web" },
    { value: "mobile", label: "Mobile" },
    { value: "backend", label: "Backend" },
    { value: "fullstack", label: "Full Stack" },
    { value: "ia", label: "IA" },
    { value: "other", label: "Otros" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search */}
      <div className="relative flex-1 md:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          placeholder="Buscar proyectos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-slate-900/50 border-slate-800 focus:border-primary-500 text-white"
        />
      </div>

      {/* Category Filter */}
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="pl-10 pr-10 py-2.5 bg-slate-900/50 border border-slate-800 rounded-lg text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all cursor-pointer appearance-none min-w-[180px]"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
