import type { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

/** Visual treatment. @default "underline" */
export type TabsVariant = "underline" | "pills" | "segmented" | "contained";

/** Layout flow — native Base UI prop, re-exported for convenience. @default "horizontal" */
export type TabsOrientation = TabsPrimitive.Root.Orientation;

export interface TabsProps extends TabsPrimitive.Root.Props {
  variant?: TabsVariant;
}
