import { useEffect, useState } from "react";
import type { Lang } from "./theme";

const KEY = "spectrum-lang";

export function usePersistentLang(defaultLang: Lang = "en") {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const v = localStorage.getItem(KEY);
      return v === "zh" || v === "en" ? v : defaultLang;
    } catch {
      return defaultLang;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  return [lang, setLang] as const;
}
