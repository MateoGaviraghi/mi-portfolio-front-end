import "../globals.css";
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
    <html lang="es">
      <body className="antialiased">
        <Providers>
          <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
