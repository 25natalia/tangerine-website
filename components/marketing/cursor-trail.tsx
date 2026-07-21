"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const DEFAULT_COLORS = ["var(--purple-400)", "var(--tangerine-400)", "var(--purple-300)"];
const DEFAULT_SPAWN_INTERVAL_MS = 55;
const DEFAULT_LIFETIME_MS = 650;
const DEFAULT_SIZE: [number, number] = [7, 7];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export interface CursorTrailProps {
  targetRef: React.RefObject<HTMLElement | null>;
  /** Rotated through in order, one per spawned particle. @default purple/tangerine/purple */
  colors?: string[];
  /** [min, max] particle diameter in px. @default [7, 7] (fixed size) */
  size?: [number, number];
  /** Gaussian-ish blur applied to every particle. @default 0 (no blur) */
  blurPx?: number;
  /** [min, max] ms a particle stays before it's removed. @default [650, 650] (fixed) */
  lifetimeMs?: [number, number];
  /** Minimum ms between spawns, regardless of mousemove frequency. @default 55 */
  spawnIntervalMs?: number;
  /**
   * Off by default: particles fade straight up (`cursor-particle-fade`).
   * On: each particle drifts along its own randomized path
   * (`cursor-particle-drift`) instead of a fixed vertical line — used by
   * MascotStage's sparkle mode, where the effect should read as organic
   * motes rather than a directional trail.
   */
  organic?: boolean;
}

/**
 * A quiet cursor trail — deliberately not React state driving a particle
 * array. Each dot is a plain DOM node created on `mousemove`, animated by a
 * CSS keyframe (globals.css), and removed on `animationend`. That keeps the
 * hot path (mousemove → spawn) completely outside React's render cycle: no
 * re-render, no reconciliation, no state growing unbounded — the only
 * per-particle cost is one DOM node that deletes itself. Throttled to one
 * spawn per `spawnIntervalMs` regardless of how fast the mouse actually
 * moves, so a fast swipe can't flood the DOM.
 *
 * Skipped entirely — no listener even attached — under
 * prefers-reduced-motion or on coarse/touch pointers, where a cursor trail
 * has no real cursor to trail.
 */
export function CursorTrail({
  targetRef,
  colors = DEFAULT_COLORS,
  size = DEFAULT_SIZE,
  blurPx = 0,
  lifetimeMs,
  spawnIntervalMs = DEFAULT_SPAWN_INTERVAL_MS,
  organic = false,
}: CursorTrailProps) {
  const reduceMotion = usePrefersReducedMotion();
  const lastSpawnRef = useRef(0);
  const colorIndexRef = useRef(0);
  const [minLife, maxLife] = lifetimeMs ?? [DEFAULT_LIFETIME_MS, DEFAULT_LIFETIME_MS];
  const [minSize, maxSize] = size;

  useEffect(() => {
    const target = targetRef.current;
    if (!target || reduceMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    function handleMove(e: MouseEvent) {
      const now = performance.now();
      if (now - lastSpawnRef.current < spawnIntervalMs) return;
      lastSpawnRef.current = now;

      const rect = target!.getBoundingClientRect();
      const dot = document.createElement("span");
      const color = colors[colorIndexRef.current % colors.length];
      colorIndexRef.current += 1;

      const diameter = randomBetween(minSize, maxSize);
      const duration = randomBetween(minLife, maxLife);

      dot.setAttribute("aria-hidden", "true");
      dot.style.cssText = `
        position: absolute;
        left: ${e.clientX - rect.left}px;
        top: ${e.clientY - rect.top}px;
        width: ${diameter}px;
        height: ${diameter}px;
        border-radius: 9999px;
        background: ${color};
        pointer-events: none;
        will-change: transform, opacity;
        ${blurPx > 0 ? `filter: blur(${blurPx}px);` : ""}
        ${
          organic
            ? `--drift-x: ${randomBetween(-20, 20)}px; --drift-y: ${randomBetween(-56, -28)}px; --particle-opacity: ${randomBetween(0.45, 0.75)}; animation: cursor-particle-drift ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;`
            : `animation: cursor-particle-fade ${duration}ms ease-out forwards;`
        }
      `;
      dot.addEventListener("animationend", () => dot.remove(), { once: true });
      target!.appendChild(dot);
    }

    target.addEventListener("mousemove", handleMove);
    return () => target.removeEventListener("mousemove", handleMove);
  }, [targetRef, reduceMotion, colors, minSize, maxSize, blurPx, minLife, maxLife, spawnIntervalMs, organic]);

  return null;
}
