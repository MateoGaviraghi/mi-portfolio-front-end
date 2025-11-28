"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/sobre-mi", label: "About Me" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contacto", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg"
          : "bg-background/60 backdrop-blur-sm border-b border-border/20"
      )}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group relative flex items-center justify-center"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/50 group-hover:border-secondary transition-colors duration-300 bg-muted flex items-center justify-center">
              <span className="text-secondary font-bold text-lg">MG</span>
            </div>
            <span className="absolute inset-0 rounded-full bg-secondary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>

          <ul className="hidden md:flex items-center gap-2">
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href} className="relative">
                  <Link
                    href={href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg overflow-hidden group",
                      isActive
                        ? "text-secondary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="relative z-10">{label}</span>
                    {/* Efecto de fondo hover */}
                    <span className="absolute inset-0 bg-secondary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    {/* Indicador activo */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary to-accent animate-pulse" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          <ul className="space-y-2 pb-4">
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-secondary/20 text-secondary font-semibold border-l-4 border-secondary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
