export type ShowcaseStatus = "draft" | "published";

export type ShowcaseCategory =
  | "automation"
  | "crm"
  | "support"
  | "scheduling"
  | "knowledge"
  | "ai"
  | "finance"
  | "ops";

export interface Localized {
  en: string;
  zh: string;
}

export interface ShowcaseImage {
  /** Globally unique */
  id: string;
  /** Local path under /public, e.g. /showcase/novaflow/01.png */
  src: string;
  caption: Localized;
}

export interface ShowcaseItem {
  slug: string;
  brand: string;
  category: ShowcaseCategory;
  status: ShowcaseStatus;
  featured?: boolean;
  /** Internal only — never render on the marketing site by default */
  source_repo?: string;
  tagline: Localized;
  /** One-line reason to book a demo — shown near CTAs */
  demoHook?: Localized;
  summary: Localized;
  body: Localized;
  features: Localized[];
  /** 應用例子 */
  useCases: Localized[];
  /** 針對痛點 */
  painPoints: Localized[];
  /** 好處特點 */
  benefits: Localized[];
  /** 商業價值 */
  businessValue: Localized[];
  scenes: Localized[];
  images: ShowcaseImage[];
  accent: string;
}
