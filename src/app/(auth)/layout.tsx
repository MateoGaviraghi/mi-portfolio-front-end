import { Providers } from "../providers";

export const metadata = {
  title: "Autenticación - Mi Portfolio",
  description: "Login y registro",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="min-h-screen flex items-center justify-center bg-slate-950">
        {children}
      </main>
    </Providers>
  );
}
