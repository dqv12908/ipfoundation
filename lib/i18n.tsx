"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Locale = "vi" | "en";

interface LanguageContextValue {
  locale: Locale;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("vi");

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "vi" ? "en" : "vi"));
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
