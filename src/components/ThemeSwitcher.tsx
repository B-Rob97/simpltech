"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { THEMES, type ThemeId } from "@/lib/themes";

function CycleGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3 w-3 fill-none stroke-current"
      strokeWidth="1.7"
      aria-hidden
    >
      <path
        d="M3 8a5 5 0 0 1 8.2-3.8L13 3v3.5H9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 8a5 5 0 0 1-8.2 3.8L3 13V9.5h3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeSwitcher() {
  const { theme, setTheme, cycleTheme, refreshing } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const jump = (id: ThemeId) => {
    setOpen(false);
    setTheme(id);
  };

  return (
    <div ref={rootRef} className="relative">
      <div className="flex items-center">
        <button
          type="button"
          disabled={refreshing}
          onClick={cycleTheme}
          aria-label={`Switch design. Now showing ${theme.label}. Cycle to the next look.`}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-button)] border-[length:var(--border-width)] border-foreground/15 bg-foreground/5 px-2 py-1.5 text-left text-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/10 disabled:opacity-60 sm:gap-2 sm:px-3"
        >
          <span
            aria-hidden
            data-theme={theme.id}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] bg-[color:var(--accent)] text-[color:var(--accent-ink)] shadow-[0_0_0_1px_color-mix(in_oklab,var(--foreground)_20%,transparent)]"
          >
            <CycleGlyph />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-1 font-[family-name:var(--font-display)] text-[11px] font-semibold leading-none tracking-wide sm:text-xs">
              <span className="sm:hidden">Switch look</span>
              <span className="hidden sm:inline">Switch design</span>
            </span>
            <span className="mt-0.5 hidden truncate text-[10px] leading-none text-foreground/55 sm:block">
              Now: {theme.label}
            </span>
          </span>
        </button>
        <button
          type="button"
          disabled={refreshing}
          aria-expanded={open}
          aria-controls={listId}
          aria-label="Choose a design"
          onClick={() => setOpen((value) => !value)}
          className="ml-0.5 inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-button)] text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground disabled:opacity-60"
        >
          <span aria-hidden className="text-[10px]">
            {open ? "▴" : "▾"}
          </span>
        </button>
      </div>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Design systems"
          className="absolute right-0 z-[70] mt-2 max-h-[min(24rem,70vh)] w-[min(18rem,calc(100vw-2rem))] overflow-auto rounded-[var(--radius-card)] border-[length:var(--border-width)] border-foreground/15 bg-elevated py-1 shadow-[0_18px_50px_color-mix(in_oklab,var(--foreground)_16%,transparent)]"
        >
          {THEMES.map((item, index) => {
            const active = item.id === theme.id;
            return (
              <li key={item.id} role="option" aria-selected={active}>
                <button
                  type="button"
                  disabled={refreshing}
                  onClick={() => jump(item.id)}
                  className={`flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors hover:bg-foreground/5 ${
                    active ? "bg-foreground/10" : ""
                  }`}
                >
                  <span
                    aria-hidden
                    data-theme={item.id}
                    className="mt-1 h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[color:var(--accent)]"
                  />
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-2">
                      <span className="font-[family-name:var(--font-display)] text-[10px] font-semibold text-foreground/45">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-foreground">
                        {item.label}
                      </span>
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-foreground/55">
                      {item.pitch}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
