"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cva } from "class-variance-authority";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionVariant,
  AccordionSize,
  AccordionIconType,
} from "./types";

interface AccordionConfig {
  variant: AccordionVariant;
  size: AccordionSize;
  icon: AccordionIconType;
}

const AccordionConfigContext = React.createContext<AccordionConfig>({
  variant: "default",
  size: "md",
  icon: "chevron-down",
});

function useAccordionConfig() {
  return React.useContext(AccordionConfigContext);
}

const rootVariants = cva("w-full", {
  variants: {
    variant: {
      default: "divide-y divide-(--border-subtle) rounded-(--radius-container) border border-(--border-default) bg-card overflow-hidden",
      filled: "divide-y divide-(--purple-100) rounded-(--radius-container) bg-(--purple-50) overflow-hidden dark:divide-(--purple-800) dark:bg-(--purple-950)",
      bordered: "divide-y divide-(--border-subtle) rounded-(--radius-container) border border-(--border-default)",
      ghost: "space-y-1",
      card: "flex flex-col space-y-3",
      faq: "space-y-4",
    } satisfies Record<AccordionVariant, string>,
  },
  defaultVariants: { variant: "default" },
});

const itemVariants = cva("", {
  variants: {
    variant: {
      default: "",
      filled: "",
      bordered: "",
      ghost: "rounded-(--radius-container)",
      // No overflow-hidden/border/bg here on purpose — those live on the
      // inner clip wrapper AccordionItem renders for this variant (see
      // below). box-shadow paints outside an element's border box, so an
      // element that both hides overflow and grows a shadow on hover clips
      // its own shadow; splitting the two responsibilities across two
      // elements is the actual fix, not a smaller/inset shadow.
      //
      // No scale/translate on hover, deliberately: a card that changes size
      // on hover reads as a layout glitch more than a lift, and it's what
      // caused the clipping this fixed in the first place. Feedback is
      // shadow + border color only — geometry never moves.
      card: "rounded-(--radius-container) transition-shadow duration-(--duration-base) ease-(--ease-standard) hover:shadow-(--shadow-elevation-3) data-open:shadow-(--shadow-elevation-2)",
      faq: "overflow-hidden rounded-(--radius-container) border border-(--border-default) bg-card",
    } satisfies Record<AccordionVariant, string>,
  },
  defaultVariants: { variant: "default" },
});

const sizeConfig = {
  sm: {
    padding: "gap-2 px-4 py-3",
    title: "text-body-sm font-medium",
    faqTitle: "text-body font-semibold",
    description: "text-xs",
    icon: "size-3.5",
    content: "px-4 pb-3 text-body-sm",
  },
  md: {
    padding: "gap-3 px-5 py-4",
    title: "text-body font-semibold",
    faqTitle: "text-h4 font-semibold",
    description: "text-body-sm",
    icon: "size-4",
    content: "px-5 pb-4 text-body-sm",
  },
  lg: {
    padding: "gap-4 px-6 py-5",
    title: "text-h4 font-semibold",
    faqTitle: "text-h3 font-bold",
    description: "text-body",
    icon: "size-5",
    content: "px-6 pb-5 text-body",
  },
} satisfies Record<AccordionSize, { padding: string; title: string; faqTitle: string; description: string; icon: string; content: string }>;

/**
 * The trailing expand indicator. `plus-minus` is drawn as two bars (not two
 * swapped lucide icons) so the morph from + to − is one continuous
 * `rotate` transition instead of a cross-fade between two different glyphs.
 */
function ExpandIcon({ icon, className }: { icon: AccordionIconType; className?: string }) {
  const iconColor = "text-(--icon-subtle) group-data-panel-open/trigger:text-(--icon-brand)";

  if (icon === "plus-minus") {
    return (
      <span aria-hidden="true" className={cn("relative shrink-0", iconColor, className)}>
        <span className="absolute inset-0 m-auto h-px w-[70%] bg-current" />
        <span className="absolute inset-0 m-auto h-[70%] w-px bg-current transition-transform duration-(--duration-base) ease-(--ease-standard) group-data-panel-open/trigger:rotate-90" />
      </span>
    );
  }

  const Icon = icon === "chevron-right" ? ChevronRight : ChevronDown;
  const rotate = icon === "chevron-right" ? "group-data-panel-open/trigger:rotate-90" : "group-data-panel-open/trigger:rotate-180";

  return (
    <Icon
      aria-hidden="true"
      className={cn("shrink-0 transition-transform duration-(--duration-base) ease-(--ease-standard)", iconColor, rotate, className)}
    />
  );
}

/**
 * The official Accordion system — six variants (default/filled/bordered/
 * ghost/card/faq) sharing one implementation on top of Base UI's Accordion
 * primitive, which supplies real keyboard nav (Arrow/Home/End per APG),
 * ARIA wiring, and the `--accordion-panel-height` CSS variable the panel
 * animates against — nothing here reimplements what the primitive already
 * gets right.
 *
 * `variant`/`size`/`icon` are set once on the root and read by every child
 * through context, so `<AccordionItem>`/`<AccordionTrigger>` never need
 * their own copies passed down.
 */
function Accordion({
  variant = "default",
  size = "md",
  icon = "chevron-down",
  multiple = false,
  collapsible = true,
  value,
  defaultValue,
  onValueChange,
  hiddenUntilFound = false,
  disabled,
  className,
  children,
}: AccordionProps) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(defaultValue ?? []);
  const currentValue = isControlled ? value : uncontrolledValue;

  function handleValueChange(next: string[]) {
    // Only relevant in single-open mode: block collapsing the last open
    // item down to none when the consumer opted out of that (e.g. Settings,
    // where one section should always stay visible).
    if (!multiple && !collapsible && next.length === 0) return;
    if (!isControlled) setUncontrolledValue(next);
    onValueChange?.(next);
  }

  const config = React.useMemo<AccordionConfig>(() => ({ variant, size, icon }), [variant, size, icon]);

  return (
    <AccordionConfigContext.Provider value={config}>
      <AccordionPrimitive.Root
        value={currentValue}
        onValueChange={handleValueChange}
        multiple={multiple}
        disabled={disabled}
        hiddenUntilFound={hiddenUntilFound}
        className={cn(rootVariants({ variant }), className)}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionConfigContext.Provider>
  );
}

function AccordionItem({ value, disabled, className, children }: AccordionItemProps) {
  const { variant } = useAccordionConfig();

  // "card" needs two elements, not one: the outer one (Base UI's Item,
  // which is where `data-open` actually lands) owns the hover shadow, and a
  // plain inner div owns overflow-hidden for the rounded corners around
  // AccordionContent's height animation, plus the border — whose hover
  // color needs `group-hover/item` since the color lives one element in
  // from the one the pointer is actually over. `flex-1` on the outer +
  // `flex flex-col` on the Root (rootVariants) is what makes every card in
  // a row match height when the consumer stretches the Root itself (e.g. a
  // CSS Grid cell). No z-index anywhere here: without a scale/lift transform
  // (removed — see the hover comment on itemVariants.card), neighboring
  // cards never visually overlap, so there's nothing for a z-index to
  // referee — and Tailwind's numeric scale (z-10, z-20…) mirrors this DS's
  // reserved --z-sticky/--z-dropdown/etc. tokens closely enough that reaching
  // for it out of habit risks a real collision with page-level chrome.
  if (variant === "card") {
    return (
      <AccordionPrimitive.Item
        value={value}
        disabled={disabled}
        className={cn("group/item relative flex-1", itemVariants({ variant }), className)}
      >
        <div className="h-full overflow-hidden rounded-(--radius-container) border border-(--border-default) bg-card transition-colors duration-(--duration-base) ease-(--ease-standard) group-hover/item:border-(--border-strong)">
          {children}
        </div>
      </AccordionPrimitive.Item>
    );
  }

  return (
    <AccordionPrimitive.Item
      value={value}
      disabled={disabled}
      className={cn("group/item", itemVariants({ variant }), className)}
    >
      {children}
    </AccordionPrimitive.Item>
  );
}

function AccordionTrigger({ title, description, leadingIcon, trailingIcon, className }: AccordionTriggerProps) {
  const { size, icon, variant } = useAccordionConfig();
  const config = sizeConfig[size];
  const titleClass = variant === "faq" ? config.faqTitle : config.title;

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group/trigger flex w-full items-center text-left outline-none",
          "transition-colors duration-(--duration-fast) ease-(--ease-standard)",
          "hover:bg-(--background-subtle)",
          "focus-visible:z-10 focus-visible:rounded-(--radius-sm) focus-visible:ring-3 focus-visible:ring-(--border-focus)/50 focus-visible:ring-inset",
          "disabled:pointer-events-none disabled:opacity-(--opacity-disabled)",
          config.padding,
          className
        )}
      >
        {leadingIcon ? (
          <span className="shrink-0 text-(--icon-subtle) group-data-panel-open/trigger:text-(--icon-brand)" aria-hidden="true">
            {leadingIcon}
          </span>
        ) : null}
        <span className="min-w-0 flex-1">
          <span className={cn(titleClass, "block text-balance text-foreground")}>{title}</span>
          {description ? (
            <span className={cn(config.description, "mt-0.5 block text-pretty text-(--text-secondary)")}>
              {description}
            </span>
          ) : null}
        </span>
        {trailingIcon ? (
          <span className="shrink-0" aria-hidden="true">
            {trailingIcon}
          </span>
        ) : null}
        <ExpandIcon icon={icon} className={config.icon} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ children, actions, divider = true, className }: AccordionContentProps) {
  const { size } = useAccordionConfig();
  const config = sizeConfig[size];

  return (
    <AccordionPrimitive.Panel
      className={cn(
        "h-(--accordion-panel-height) overflow-hidden opacity-100",
        "transition-[height,opacity] duration-(--duration-base) ease-(--ease-standard)",
        "data-starting-style:h-0 data-starting-style:opacity-0",
        "data-ending-style:h-0 data-ending-style:opacity-0"
      )}
    >
      <div className={cn(config.content, "text-(--text-secondary)", className)}>
        {children}
        {actions ? (
          <div className={cn("mt-4 flex flex-wrap items-center gap-2", divider && "border-t border-(--border-subtle) pt-4")}>
            {actions}
          </div>
        ) : null}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
