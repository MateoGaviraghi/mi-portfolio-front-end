// ===========================
// PROJECT TYPES
// ===========================

import { BaseFilters } from "./index";

// Project Category Enum
export enum ProjectCategory {
  WEB = "web",
  MOBILE = "mobile",
  AI = "ai",
  BACKEND = "backend",
}

// Cloudinary Types
export interface CloudinaryThumbnails {
  small?: string;
  medium?: string;
  large?: string;
}

export interface CloudinaryImage {
  _id: string;
  publicId: string;
  secureUrl: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  thumbnails?: CloudinaryThumbnails;
}

export interface CloudinaryVideo {
  _id: string;
  publicId: string;
  secureUrl: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  duration?: number;
  thumbnail?: string;
}

// AI Generated Info
export interface AIGeneratedInfo {
  percentage: number;
  tools: string[];
  description: string;
}

// Project Stats
export interface ProjectStats {
  views: number;
  likes: number;
}

// Project Schema
export interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  images: CloudinaryImage[];
  videos: CloudinaryVideo[];
  githubUrl?: string;
  liveUrl?: string;
  category: ProjectCategory;
  featured: boolean;
  aiGenerated: AIGeneratedInfo;
  stats: ProjectStats;
  createdAt: string;
  updatedAt: string;
}

// DTOs
export interface CreateProjectDto {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: ProjectCategory;
  featured?: boolean;
  aiGenerated?: AIGeneratedInfo;
}

export type UpdateProjectDto = Partial<CreateProjectDto>;

// Filters
export interface ProjectFilters extends BaseFilters {
  category?: ProjectCategory;
  featured?: boolean;
  search?: string;
}

// Upload Response
export interface UploadResponse {
  message: string;
  project: Project;
  uploadedImage?: CloudinaryImage;
  uploadedVideo?: CloudinaryVideo;
}
