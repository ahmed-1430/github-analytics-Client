"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "devinsight-theme";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  return storedTheme === "light" || storedTheme === "dark" ? storedTheme : getSystemTheme();
}

function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!mounted) {
      return;
    }

    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [mounted, theme]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const storedTheme = window.localStorage.getItem(STORAGE_KEY);
      if (!storedTheme) {
        setTheme(media.matches ? "dark" : "light");
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [mounted]);

  return {
    theme,
    isDark: theme === "dark",
    mounted,
    toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    setTheme,
  };
}
