"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applyThemeToDocument,
  getTheme,
  nextThemeId,
  persistTheme,
  THEME_REFRESH_MS,
  THEME_REFRESH_REDUCED_MS,
  type ThemeDefinition,
  type ThemeId,
} from "@/lib/themes";

type ThemeContextValue = {
  theme: ThemeDefinition;
  refreshing: boolean;
  incoming: ThemeDefinition | null;
  setTheme: (id: ThemeId) => void;
  cycleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
  initialThemeId: ThemeId;
};

export function ThemeProvider({
  children,
  initialThemeId,
}: ThemeProviderProps) {
  const [themeId, setThemeId] = useState<ThemeId>(initialThemeId);
  const [incoming, setIncoming] = useState<ThemeDefinition | null>(null);

  const theme = getTheme(themeId);

  const setTheme = useCallback(
    (id: ThemeId) => {
      if (incoming || id === themeId) return;

      const next = getTheme(id);
      setIncoming(next);

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const hold = reduced ? THEME_REFRESH_REDUCED_MS : THEME_REFRESH_MS;

      requestAnimationFrame(() => {
        applyThemeToDocument(next);
        persistTheme(next.id);
        setThemeId(next.id);

        window.setTimeout(() => {
          setIncoming(null);
        }, hold);
      });
    },
    [incoming, themeId],
  );

  const cycleTheme = useCallback(() => {
    setTheme(nextThemeId(themeId));
  }, [setTheme, themeId]);

  const value = useMemo(
    () => ({
      theme,
      refreshing: incoming !== null,
      incoming,
      setTheme,
      cycleTheme,
    }),
    [theme, incoming, setTheme, cycleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
