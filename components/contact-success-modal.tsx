"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { Mascot } from "@/components/ui/mascot";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

export interface ContactSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Visitor's name from the submitted form, if they gave one. */
  name?: string;
}

/**
 * One-off feedback modal for the Contact form's success state — not a new
 * `components/ui/*` primitive (per ARCHITECTURE.md: no reusable component is
 * born in this repo, and the DS has no ported Dialog yet). Built directly on
 * `@base-ui/react/dialog`, the exact same headless library `Drawer`
 * (`components/ui/drawer.tsx`) already wraps, styled with the identical
 * design tokens it uses (`--z-overlay`/`--z-modal`, `--overlay-scrim`,
 * `--surface-default`, `--shadow-elevation-4`, `--radius-overlay`) so it
 * reads as the same visual language without inventing a new one.
 *
 * Copy is reused verbatim from `contact.form` (`successThanksNamed` /
 * `successThanksGeneric`, `successBody`) — the same message the ported
 * `ContactForm`'s own inline success `Card` already shows once its internal
 * status flips. This modal just surfaces that message first, front and
 * center, right after `SiteContactForm` scrolls the page back up to the
 * Hero — the inline card underneath still renders if the visitor scrolls
 * back down, since `ContactForm`'s internal state isn't touched here.
 */
export function ContactSuccessModal({ open, onOpenChange, name }: ContactSuccessModalProps) {
  const { t } = useLanguage();
  const copy = t.contact.form;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className={cn(
            "fixed inset-0 z-(--z-overlay) bg-(--overlay-scrim) transition-opacity duration-(--duration-slow) ease-(--ease-standard)",
            "data-starting-style:opacity-0 data-ending-style:opacity-0"
          )}
        />
        <DialogPrimitive.Viewport className="fixed inset-0 z-(--z-modal) flex items-center justify-center p-6">
          <DialogPrimitive.Popup
            className={cn(
              "relative flex w-full max-w-sm flex-col items-center gap-4 rounded-(--radius-overlay) border border-(--border-default) bg-(--surface-default) p-8 text-center text-(--text-primary) shadow-(--shadow-elevation-4) outline-none",
              "transition-all duration-(--duration-slow) ease-(--ease-standard)",
              "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0"
            )}
          >
            <DialogPrimitive.Close
              className="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-(--radius-full) text-(--icon-subtle) transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:bg-(--background-strong) hover:text-(--icon-default) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-focus)"
            >
              <X className="size-4" aria-hidden="true" />
              <span className="sr-only">{t.common.close}</span>
            </DialogPrimitive.Close>

            <Mascot variant="2" className="w-28 sm:w-32" alt="" />

            <div>
              <DialogPrimitive.Title className="font-display text-2xl font-bold">
                {name ? copy.successThanksNamed(name) : copy.successThanksGeneric}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-body mt-3 text-pretty text-(--text-secondary)">
                {copy.successBody}
              </DialogPrimitive.Description>
            </div>
          </DialogPrimitive.Popup>
        </DialogPrimitive.Viewport>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
