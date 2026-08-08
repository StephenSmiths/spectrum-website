import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { CtaModal, type CtaMode } from "./CtaModal";
import type { Lang } from "@/lib/theme";

type CtaState = { mode: CtaMode; showcaseTitle?: string } | null;

const Ctx = createContext<{
  openDemo: (showcaseTitle?: string) => void;
  openEnquiry: (showcaseTitle?: string) => void;
} | null>(null);

export function CtaProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const [state, setState] = useState<CtaState>(null);
  const openDemo = useCallback((showcaseTitle?: string) => setState({ mode: "demo", showcaseTitle }), []);
  const openEnquiry = useCallback((showcaseTitle?: string) => setState({ mode: "enquiry", showcaseTitle }), []);
  const value = useMemo(() => ({ openDemo, openEnquiry }), [openDemo, openEnquiry]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <CtaModal
        open={Boolean(state)}
        mode={state?.mode ?? "demo"}
        lang={lang}
        showcaseTitle={state?.showcaseTitle}
        onClose={() => setState(null)}
      />
    </Ctx.Provider>
  );
}

export function useCta() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCta must be used within CtaProvider");
  return ctx;
}
