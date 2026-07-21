"use client";

import * as React from "react";
import { Autocomplete } from "@base-ui/react/autocomplete";
import { Search, X, Loader2, Mic, CircleAlert, CircleCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { ChipGroup, ChipToggle } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import type { SearchBarProps, SearchBarSize, SearchBarVariant, SearchSuggestion } from "./types";

const variantSizeDefaults: Record<SearchBarVariant, SearchBarSize> = {
  default: "md",
  compact: "sm",
  hero: "hero",
  command: "lg",
};

const sizeConfig: Record<
  SearchBarSize,
  { height: string; text: string; icon: string; padStart: string; padEnd: string; iconInset: string; controlsInset: string }
> = {
  sm: { height: "h-9", text: "text-body-sm", icon: "size-4", padStart: "pl-9", padEnd: "pr-2", iconInset: "left-2.5", controlsInset: "right-1.5" },
  md: { height: "h-11", text: "text-body", icon: "size-4.5", padStart: "pl-10", padEnd: "pr-2", iconInset: "left-3", controlsInset: "right-2" },
  lg: { height: "h-14", text: "text-body-lg", icon: "size-5", padStart: "pl-12", padEnd: "pr-2.5", iconInset: "left-4", controlsInset: "right-2.5" },
  hero: { height: "h-16", text: "text-h4", icon: "size-6", padStart: "pl-14", padEnd: "pr-3", iconInset: "left-5", controlsInset: "right-3" },
};

const variantInputClasses: Record<SearchBarVariant, string> = {
  default: "rounded-(--radius-interactive) border border-(--border-default) bg-background",
  compact: "rounded-(--radius-interactive) border border-(--border-default) bg-background",
  hero: "rounded-(--radius-pill) border border-(--border-default) bg-background shadow-(--shadow-elevation-2)",
  command: "rounded-none border-0 border-b border-(--border-subtle) bg-transparent",
};

function ShortcutBadge({ keys }: { keys: string[] }) {
  return (
    <kbd
      aria-hidden="true"
      className="pointer-events-none inline-flex shrink-0 items-center gap-0.5 rounded-(--radius-sm) border border-(--border-default) bg-(--background-subtle) px-1.5 py-0.5 font-mono text-[11px] font-medium text-(--text-tertiary)"
    >
      {keys.join("")}
    </kbd>
  );
}

/** Wraps the substrings of `label` matching `query` in a highlighted <mark>. Case-insensitive, first match only — a search result highlights where it matched, not every repeated character. */
function HighlightedLabel({ label, query }: { label: string; query: string }) {
  if (!query.trim()) return <>{label}</>;
  const index = label.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return <>{label}</>;
  return (
    <>
      {label.slice(0, index)}
      <mark className="rounded-[2px] bg-(--purple-100) text-(--text-brand) dark:bg-(--purple-900)">
        {label.slice(index, index + query.length)}
      </mark>
      {label.slice(index + query.length)}
    </>
  );
}

type SuggestionGroup = { category: string; items: SearchSuggestion[] };

/** Always returns groups — a flat, uncategorized list becomes one group
 * with an empty `category` (rendered with no visible label), so the rest
 * of the component has a single shape to deal with instead of a union
 * between "flat array" and "array of groups". */
function groupSuggestions(items: SearchSuggestion[]): SuggestionGroup[] {
  if (items.length === 0) return [];
  if (!items.some((item) => item.category)) return [{ category: "", items }];
  const order: string[] = [];
  const byCategory = new Map<string, SearchSuggestion[]>();
  for (const item of items) {
    const category = item.category ?? "Otros";
    if (!byCategory.has(category)) {
      byCategory.set(category, []);
      order.push(category);
    }
    byCategory.get(category)!.push(item);
  }
  return order.map((category) => ({ category, items: byCategory.get(category)! }));
}

function SuggestionItemRow({
  item,
  query,
  onSelect,
}: {
  item: SearchSuggestion;
  query: string;
  onSelect?: (item: SearchSuggestion) => void;
}) {
  return (
    <Autocomplete.Item
      value={item}
      onClick={() => onSelect?.(item)}
      className={cn(
        "flex cursor-default items-center gap-3 rounded-(--radius-sm) px-3 py-2.5 text-body-sm outline-none select-none",
        "data-highlighted:bg-(--background-subtle)"
      )}
    >
      {item.icon ? <span className="shrink-0 text-(--icon-subtle)">{item.icon}</span> : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium text-foreground">
          <HighlightedLabel label={item.label} query={query} />
        </span>
        {item.description ? (
          <span className="block truncate text-caption text-(--text-tertiary)">{item.description}</span>
        ) : null}
      </span>
    </Autocomplete.Item>
  );
}

/**
 * The official Search Bar — one flexible primitive, not eight mutually
 * exclusive skins. Built on Base UI's Autocomplete (free-form text input +
 * filtered popup, the same combobox family as Select/Combobox) rather than
 * a plain `<Input>` with an icon: real keyboard navigation between
 * suggestions, ARIA wiring (role="combobox", aria-expanded,
 * aria-activedescendant) and grouped-item support all come from the
 * primitive instead of being hand-rolled.
 *
 * `suggestions`/`recentSearches` are rendered as-given — this component
 * never re-filters them client-side, because a real search (a backend, a
 * search index) already decided relevance better than a naive substring
 * match could.
 */
function SearchBar({
  size,
  variant = "default",
  placeholder = "Buscar…",
  value,
  defaultValue,
  onValueChange,
  onSearch,
  loading = false,
  disabled = false,
  autoFocus = false,
  error,
  success = false,
  suggestions = [],
  recentSearches = [],
  onClearRecentSearches,
  filters,
  activeFilter,
  defaultActiveFilter,
  onFilterChange,
  showShortcut = false,
  shortcutKeys = ["⌘", "K"],
  showClearButton = true,
  onClear,
  onSelectSuggestion,
  emptyStateTitle,
  emptyStateDescription,
  trailingAction,
  showVoiceSearchPlaceholder = false,
  className,
}: SearchBarProps) {
  const resolvedSize = size ?? variantSizeDefaults[variant];
  const config = sizeConfig[resolvedSize];

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? "");
  const inputValue = isControlled ? value : uncontrolledValue;

  const isFilterControlled = activeFilter !== undefined;
  const [uncontrolledFilter, setUncontrolledFilter] = React.useState(defaultActiveFilter ?? filters?.[0]?.id);
  const resolvedActiveFilter = isFilterControlled ? activeFilter : uncontrolledFilter;

  const showingRecent = inputValue.trim().length === 0 && recentSearches.length > 0;
  const rawItems = showingRecent ? recentSearches : suggestions;
  const displayItems = React.useMemo(() => groupSuggestions(rawItems), [rawItems]);

  function handleValueChange(next: string) {
    if (!isControlled) setUncontrolledValue(next);
    onValueChange?.(next);
  }

  function handleClear() {
    if (!isControlled) setUncontrolledValue("");
    onValueChange?.("");
    onClear?.();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onSearch?.(inputValue);
    }
    if (event.key === "Escape" && inputValue.length > 0) {
      handleClear();
    }
  }

  const hasError = Boolean(error);

  return (
    <div className={cn("w-full", className)}>
      <Autocomplete.Root
        items={displayItems}
        mode="none"
        filter={null}
        openOnInputClick
        {...(isControlled ? { value: inputValue } : { defaultValue })}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        {filters && filters.length > 0 ? (
          <ChipGroup
            multiple={false}
            value={resolvedActiveFilter ? [resolvedActiveFilter] : []}
            onValueChange={(next) => {
              const id = next[0] ?? filters[0]?.id;
              if (!isFilterControlled) setUncontrolledFilter(id);
              onFilterChange?.(id);
            }}
            className="mb-3"
          >
            {filters.map((filter) => (
              <ChipToggle key={filter.id} value={filter.id}>
                {filter.label}
              </ChipToggle>
            ))}
          </ChipGroup>
        ) : null}

        <div
          className={cn(
            "group/search relative flex items-center transition-[border-color,box-shadow] duration-(--duration-fast) ease-(--ease-standard)",
            config.height,
            variantInputClasses[variant],
            "focus-within:border-(--border-focus) focus-within:ring-3 focus-within:ring-(--border-focus)/50",
            hasError && "border-(--border-error) focus-within:border-(--border-error) focus-within:ring-(--border-error)/20",
            success && !hasError && "border-(--border-success)",
            disabled && "cursor-not-allowed opacity-(--opacity-disabled)"
          )}
        >
          <Search
            aria-hidden="true"
            className={cn("pointer-events-none absolute shrink-0 text-(--icon-subtle)", config.icon, config.iconInset)}
          />

          <Autocomplete.Input
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
            onKeyDown={handleKeyDown}
            aria-invalid={hasError || undefined}
            className={cn(
              "size-full min-w-0 bg-transparent text-foreground outline-none placeholder:text-(--text-tertiary)",
              config.text,
              config.padStart,
              config.padEnd
            )}
          />

          <div className={cn("absolute flex shrink-0 items-center gap-1.5", config.controlsInset)}>
            {loading ? (
              <Loader2 aria-hidden="true" className={cn("animate-spin text-(--icon-subtle)", config.icon)} />
            ) : null}

            {!loading && hasError ? (
              <CircleAlert aria-hidden="true" className={cn("text-(--icon-error)", config.icon)} />
            ) : null}

            {!loading && success && !hasError ? (
              <CircleCheck aria-hidden="true" className={cn("text-(--icon-success)", config.icon)} />
            ) : null}

            {showClearButton ? (
              <Autocomplete.Clear
                onClick={handleClear}
                aria-label="Limpiar búsqueda"
                className={cn(
                  "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-(--icon-subtle) transition-colors duration-(--duration-fast) ease-(--ease-standard)",
                  "hover:bg-(--background-strong) hover:text-(--icon-default)",
                  "opacity-0 data-visible:opacity-100"
                )}
              >
                <X className="size-3.5" />
              </Autocomplete.Clear>
            ) : null}

            {showVoiceSearchPlaceholder ? (
              <button
                type="button"
                disabled
                title="Búsqueda por voz — próximamente"
                aria-label="Búsqueda por voz — próximamente"
                className="inline-flex size-6 shrink-0 cursor-not-allowed items-center justify-center rounded-full text-(--icon-subtle) opacity-(--opacity-disabled)"
              >
                <Mic className="size-3.5" />
              </button>
            ) : null}

            {showShortcut ? <ShortcutBadge keys={shortcutKeys} /> : null}

            {trailingAction}
          </div>
        </div>

        {error ? <p className="text-caption mt-1.5 text-(--text-error)">{error}</p> : null}

        <Autocomplete.Portal>
          <Autocomplete.Positioner className="outline-none" sideOffset={8}>
            <Autocomplete.Popup
              className={cn(
                "w-[var(--anchor-width)] max-w-[var(--available-width)] max-h-[min(24rem,var(--available-height))]",
                "overflow-y-auto overscroll-contain rounded-2xl border border-border bg-(--surface-default) p-1.5 shadow-(--shadow-elevation-4) outline-none",
                "transition-[transform,opacity] duration-(--duration-fast) ease-(--ease-standard)",
                "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0"
              )}
            >
              {showingRecent ? (
                <div className="flex items-center justify-between px-3 pt-1.5 pb-1">
                  <span className="text-caption font-medium text-(--text-tertiary) uppercase">Búsquedas recientes</span>
                  {onClearRecentSearches ? (
                    <button
                      type="button"
                      onClick={onClearRecentSearches}
                      className="text-caption font-medium text-(--text-brand) hover:underline"
                    >
                      Limpiar
                    </button>
                  ) : null}
                </div>
              ) : null}

              <Autocomplete.Status className="text-caption px-3 py-2 text-(--text-tertiary)">
                {loading ? "Buscando…" : null}
              </Autocomplete.Status>

              <Autocomplete.Empty className="p-1">
                <EmptyState
                  size="sm"
                  titleAs="p"
                  mascotVariant="1"
                  title={emptyStateTitle ?? "Ese término no aparece por ningún lado."}
                  description={
                    emptyStateDescription ?? "Probá con otra palabra — a veces el resultado correcto está a una letra de distancia."
                  }
                />
              </Autocomplete.Empty>

              <Autocomplete.List className="outline-none data-empty:hidden">
                {(group: SuggestionGroup) => (
                  <Autocomplete.Group key={group.category || "_"} items={group.items} className="mb-1 last:mb-0">
                    {group.category ? (
                      <Autocomplete.GroupLabel className="text-caption px-3 pt-2 pb-1 font-medium text-(--text-tertiary) uppercase select-none">
                        {group.category}
                      </Autocomplete.GroupLabel>
                    ) : null}
                    <Autocomplete.Collection>
                      {(item: SearchSuggestion) => (
                        <SuggestionItemRow key={item.id} item={item} query={inputValue} onSelect={onSelectSuggestion} />
                      )}
                    </Autocomplete.Collection>
                  </Autocomplete.Group>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </div>
  );
}

export { SearchBar };
