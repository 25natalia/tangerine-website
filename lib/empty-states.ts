// Content presets for <EmptyState /> — one source of truth for the copy and
// mascot pose each variant starts from, so the component itself never
// hardcodes a string. A preset supplies content only (title, description,
// mascot pose) — never behavior. Actions always come from the consumer,
// because "Reintentar" without a real handler wired to it is worse than no
// button at all.

import type { MascotVariant } from "./mascot";

export type EmptyStateVariant =
  | "generic"
  | "search"
  | "filter"
  | "folder"
  | "notifications"
  | "messages"
  | "analytics"
  | "error"
  | "offline"
  | "success"
  | "coming-soon"
  | "first-time";

export interface EmptyStatePreset {
  id: EmptyStateVariant;
  label: string;
  /** Which of the 5 official poses reads best for this moment's emotional register. */
  mascotVariant: MascotVariant;
  title: string;
  description: string;
}

export const emptyStatePresets: Record<EmptyStateVariant, EmptyStatePreset> = {
  generic: {
    id: "generic",
    label: "Generic",
    mascotVariant: "default",
    title: "Todavía no hay nada por acá.",
    description:
      "Esta pantalla está esperando su primer contenido — en cuanto aparezca, se va a ver tan bien como el resto del sistema.",
  },
  search: {
    id: "search",
    label: "Search",
    mascotVariant: "1",
    title: "Ese término no aparece por ningún lado.",
    description:
      "Probá con otra palabra o revisá que no haya un error de tipeo — a veces el resultado correcto está a una letra de distancia.",
  },
  filter: {
    id: "filter",
    label: "Filter",
    mascotVariant: "1",
    title: "Ningún resultado con esta combinación.",
    description: "Los filtros que elegiste son demasiado específicos entre sí — sacá alguno y probá de nuevo.",
  },
  folder: {
    id: "folder",
    label: "Folder",
    mascotVariant: "default",
    title: "Esta carpeta todavía está vacía.",
    description: "Subí tu primer archivo y dejá este espacio en blanco atrás.",
  },
  notifications: {
    id: "notifications",
    label: "Notifications",
    mascotVariant: "2",
    title: "Estás al día con todo.",
    description: "No hay notificaciones nuevas — cuando pase algo que te importe, va a aparecer acá primero.",
  },
  messages: {
    id: "messages",
    label: "Messages",
    mascotVariant: "2",
    title: "Todavía no tenés conversaciones.",
    description: "Cuando alguien te escriba, o arranques vos la conversación, va a vivir acá.",
  },
  analytics: {
    id: "analytics",
    label: "Analytics",
    mascotVariant: "default",
    title: "Los números están en camino.",
    description: "Todavía no hay suficientes datos para mostrar algo confiable — esto se llena rápido, volvé en un rato.",
  },
  error: {
    id: "error",
    label: "Error",
    mascotVariant: "4",
    title: "Algo salió mal de nuestro lado.",
    description: "No pudimos traer esta información. Ya lo estamos mirando — mientras tanto, probá de nuevo.",
  },
  offline: {
    id: "offline",
    label: "Offline",
    mascotVariant: "4",
    title: "Parece que no hay conexión.",
    description: "Revisá tu red e intentá de nuevo — apenas vuelva la señal, todo sigue exactamente donde lo dejaste.",
  },
  success: {
    id: "success",
    label: "Success",
    mascotVariant: "3",
    title: "Listo. Quedó como tenía que quedar.",
    description: "La acción se completó sin problemas — ya podés seguir con lo que sigue.",
  },
  "coming-soon": {
    id: "coming-soon",
    label: "Coming Soon",
    mascotVariant: "1",
    title: "Esto todavía se está cocinando.",
    description:
      "Estamos construyendo esta parte con el mismo criterio que el resto del sistema — va a valer la pena esperarla.",
  },
  "first-time": {
    id: "first-time",
    label: "First Time",
    mascotVariant: "2",
    title: "Bienvenido — este es un buen lugar para empezar.",
    description:
      "Todavía no configuraste nada acá, pero en un par de minutos vas a tener esto funcionando como el resto del sistema.",
  },
};

export const emptyStateVariants = Object.keys(emptyStatePresets) as EmptyStateVariant[];
