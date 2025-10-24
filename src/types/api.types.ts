// ===========================
// API SPECIFIC TYPES
// ===========================

// HTTP Methods
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// API Endpoints
export interface ApiEndpoints {
  // Auth
  auth: {
    login: "/auth/login";
    register: "/auth/register";
    refresh: "/auth/refresh";
    logout: "/auth/logout";
  };

  // Projects
  projects: {
    base: "/projects";
    search: "/projects/search";
    byId: (id: string) => string;
    like: (id: string) => string;
  };

  // Upload
  upload: {
    projectImage: (projectId: string) => string;
    projectVideo: (projectId: string) => string;
    deleteImage: (projectId: string, publicId: string) => string;
    deleteVideo: (projectId: string, publicId: string) => string;
  };

  // Skills
  skills: {
    base: "/skills";
    stats: "/skills/stats";
    byCategory: (category: string) => string;
    byLevel: (minLevel: number) => string;
  };

  // Reviews
  reviews: {
    base: "/reviews";
    all: "/reviews/all";
    stats: "/reviews/stats";
    myReviews: "/reviews/my-reviews";
    approve: (id: string) => string;
    reject: (id: string) => string;
  };

  // Analytics
  analytics: {
    track: "/analytics/track";
    overview: "/analytics/overview";
    devices: "/analytics/devices";
    geo: "/analytics/geo";
    timeseries: "/analytics/timeseries";
    referrers: "/analytics/referrers";
    session: (sessionId: string) => string;
  };

  // AI Insights
  aiInsights: {
    base: "/ai-insights";
    stats: "/ai-insights/stats";
    top: "/ai-insights/top";
    byProject: (projectId: string) => string;
  };

  // Users
  users: {
    base: "/users";
    byId: (id: string) => string;
  };
}

// Request config
export interface RequestConfig {
  timeout?: number;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  withCredentials?: boolean;
}

// Auth context type for decorators
export interface CurrentUserData {
  userId: string;
  email: string;
  role: string;
}
