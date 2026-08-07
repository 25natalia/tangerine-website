"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import type { Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

// Contenido propio de la web (no del Design System) — puramente tipográfico,
// sin fondo ni pill: mismo tamaño/peso base que NavbarLink (text-body-sm
// font-medium) para leerse como parte del menú, no como un control aparte.
// Mismos tokens semánticos que NavbarLink usa para sus propios estados —
// --text-brand (el morado característico de marca, el mismo de cada kicker
// del sitio) para el idioma activo, --text-secondary (el gris de los demás
// links del Navbar, no el --text-tertiary más tenue) para el inactivo — así
// los dos resuelven claro/oscuro exactamente igual que el resto del menú.
const options: { value: Locale; label: string }[] = [
  { value: "es", label: "ES" },
  { value: "en", label: "EN" },
];

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className={cn("inline-flex items-center gap-1 text-body-sm font-medium", className)}
    >
      {options.map((option, i) => {
        const active = locale === option.value;
        return (
          <div key={option.value} className="flex items-center gap-1">
            {i > 0 ? (
              <span aria-hidden="true" className="text-(--text-tertiary)">
                /
              </span>
            ) : null}
            <button
              type="button"
              aria-pressed={active}
              onClick={() => setLocale(option.value)}
              className={cn(
                "rounded-(--radius-sm) outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard)",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)",
                active
                  ? "font-semibold text-(--text-brand)"
                  : "text-(--text-secondary) hover:text-(--text-primary)"
              )}
            >
              {option.label}
            </button>
          </div>
        );
      })}
    </div>
  );
}
