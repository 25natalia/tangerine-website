import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * A single loading "bone". Decorative on its own (aria-hidden) — the
 * accessible announcement lives once on the group that contains it, not on
 * every individual bone (a table skeleton with 40 bones shouldn't announce
 * "loading" 40 times).
 */
function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("animate-pulse rounded-(--radius-sm) bg-(--background-strong)", className)}
      {...props}
    />
  );
}

const avatarSizes = { sm: "size-8", md: "size-10", lg: "size-14" } as const;

function SkeletonAvatar({
  size = "md",
  className,
}: {
  size?: keyof typeof avatarSizes;
  className?: string;
}) {
  return <Skeleton className={cn("shrink-0 rounded-full", avatarSizes[size], className)} />;
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Cargando tarjeta"
      className={cn(
        "w-full max-w-xs space-y-3 rounded-(--radius-container) border border-border p-4",
        className
      )}
    >
      <Skeleton className="h-32 w-full rounded-(--radius-md)" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

function SkeletonList({
  rows = 3,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div role="status" aria-label="Cargando lista" className={cn("w-full space-y-4", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <SkeletonAvatar size="sm" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonTable({
  rows = 4,
  columns = 4,
  className,
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div role="status" aria-label="Cargando tabla" className={cn("w-full", className)}>
      <div className="mb-3 flex gap-4 border-b border-border pb-3">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 border-b border-border/60 py-3 last:border-0">
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton key={c} className="h-3.5 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

function SkeletonDashboard({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Cargando dashboard"
      className={cn("w-full space-y-6", className)}
    >
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-(--radius-container) border border-border p-4">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        ))}
      </div>
      <Skeleton className="h-40 w-full rounded-(--radius-container)" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <SkeletonAvatar size="sm" />
            <Skeleton className="h-3.5 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

export { Skeleton, SkeletonAvatar, SkeletonCard, SkeletonList, SkeletonTable, SkeletonDashboard };
