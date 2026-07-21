import { Children, type ReactNode } from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// No overflow-hidden here — AvatarStatus is a child of Avatar and needs to
// render fully outside the circular image, not get clipped by it. The image
// and fallback each clip themselves to a circle instead (see below).
const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center rounded-full align-middle select-none",
  {
    variants: {
      size: {
        sm: "size-8 text-caption",
        md: "size-10 text-body-sm",
        lg: "size-14 text-title",
      },
      /**
       * Only meaningful for the initials fallback (a real photo already
       * carries its own color). "neutral" is the default — assign a hue
       * only when it encodes something real (role, team, account type),
       * the same category every time that person/entity appears, never
       * picked per-render. Purple doubles as "primary/internal team" since
       * it's already this system's brand identity color.
       */
      color: {
        neutral: "bg-secondary text-secondary-foreground",
        purple: "bg-(--purple-100) text-(--purple-700)",
        green: "bg-(--green-100) text-(--green-700)",
        blue: "bg-(--info-100) text-(--info-700)",
        orange: "bg-(--tangerine-100) text-(--tangerine-800)",
      },
    },
    defaultVariants: { size: "md", color: "neutral" },
  }
);

function Avatar({
  className,
  size,
  color,
  ...props
}: AvatarPrimitive.Root.Props & VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, color }), className)}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("size-full overflow-hidden rounded-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("flex size-full items-center justify-center overflow-hidden rounded-full font-medium uppercase", className)}
      {...props}
    />
  );
}

const statusStyles = {
  online: "bg-(--icon-success)",
  offline: "bg-(--icon-subtle)",
  busy: "bg-(--icon-error)",
} as const;

const statusLabels = {
  online: "En línea",
  offline: "Desconectado",
  busy: "Ocupado",
} as const;

function AvatarStatus({
  status,
  className,
}: {
  status: keyof typeof statusStyles;
  className?: string;
}) {
  return (
    <span
      role="status"
      aria-label={statusLabels[status]}
      className={cn(
        "absolute right-0 bottom-0 block size-[34%] min-h-2.5 min-w-2.5 shrink-0 rounded-full ring-[3px] ring-(--surface-default)",
        statusStyles[status],
        className
      )}
    />
  );
}

function AvatarGroup({
  className,
  max,
  size = "md",
  children,
}: {
  className?: string;
  max?: number;
  size?: VariantProps<typeof avatarVariants>["size"];
  children: ReactNode;
}) {
  const items = Children.toArray(children);
  const visible = max ? items.slice(0, max) : items;
  const overflow = max && items.length > max ? items.length - max : 0;

  return (
    <div className={cn("flex -space-x-2.5", className)}>
      {visible.map((child, i) => (
        <div key={i} className="rounded-full ring-2 ring-(--surface-default)">
          {child}
        </div>
      ))}
      {overflow > 0 ? (
        <div
          className={cn(
            avatarVariants({ size }),
            "bg-(--background-subtle) font-medium text-(--text-secondary) ring-2 ring-(--surface-default)"
          )}
        >
          +{overflow}
        </div>
      ) : null}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarStatus, AvatarGroup };
