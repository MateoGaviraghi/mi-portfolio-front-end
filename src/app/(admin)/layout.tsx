"use client";

import RequireAuth from "@/lib/auth/RequireAuth";
import Header from "@/components/layout/Header";
import { Providers } from "../providers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <RequireAuth>
        <div className="min-h-screen bg-slate-950">
          <Header />
          <div className="p-6">{children}</div>
        </div>
      </RequireAuth>
    </Providers>
  );
}
