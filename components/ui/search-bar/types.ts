import type { ReactNode } from "react";

export type SearchBarSize = "sm" | "md" | "lg" | "hero";

/**
 * Visual/behavioral skins — the only things that actually change how the
 * bar looks. "Search with Filters/Suggestions/Recent Searches/Empty State"
 * from the brief are NOT separate variants here: they're capabilities
 * enabled by passing `filters`/`suggestions`/`recentSearches` — a real
 * product wants all of them at once (e.g. docs search: filters + live
 * suggestions + recent searches + an empty state), so they compose via
 * props instead of forcing a choice between mutually-exclusive skins.
 */
export type SearchBarVariant = "default" | "compact" | "hero" | "command";

export interface SearchBarFilterOption {
  id: string;
  label: string;
}

export interface SearchSuggestion {
  id: string;
  label: string;
  description?: string;
  /** Suggestions sharing a category render under one heading, grouped automatically. */
  category?: string;
  icon?: ReactNode;
  href?: string;
}

export interface SearchBarProps {
  /** @default depends on variant — "md" (default/none given), "sm" (compact), "hero" (hero), "lg" (command) */
  size?: SearchBarSize;
  /** @default "default" */
  variant?: SearchBarVariant;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  /** Fires on every keystroke — wire this to a debounced fetch for real suggestions. */
  onValueChange?: (value: string) => void;
  /** Fires on Enter, or clicking a trailing search affordance. */
  onSearch?: (value: string) => void;
  loading?: boolean;
  disabled?: boolean;
  /** Focuses the input on mount — for a SearchBar rendered inside a just-opened overlay (e.g. the Command variant in a Dialog). */
  autoFocus?: boolean;
  /** A message's presence is the error state. */
  error?: string;
  success?: boolean;
  /**
   * Already the list to render — this component does not re-filter them
   * client-side (a real backend/search index already decided relevance).
   * Give each item a `category` to group them automatically.
   */
  suggestions?: SearchSuggestion[];
  /** Shown instead of `suggestions` while the input is empty and focused. */
  recentSearches?: SearchSuggestion[];
  onClearRecentSearches?: () => void;
  filters?: SearchBarFilterOption[];
  activeFilter?: string;
  defaultActiveFilter?: string;
  onFilterChange?: (id: string) => void;
  /** The ⌘K / Ctrl+K badge. @default false */
  showShortcut?: boolean;
  /** @default ["⌘", "K"] */
  shortcutKeys?: string[];
  /** @default true */
  showClearButton?: boolean;
  onClear?: () => void;
  onSelectSuggestion?: (item: SearchSuggestion) => void;
  /** Overrides the official EmptyState's copy for the no-results case. */
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  /** A slot after the clear/shortcut cluster — a CTA button in `hero`, an extra icon button elsewhere. */
  trailingAction?: ReactNode;
  /** Renders a disabled mic affordance — reserved for a future release, never wired to real voice input. @default false */
  showVoiceSearchPlaceholder?: boolean;
  className?: string;
}
