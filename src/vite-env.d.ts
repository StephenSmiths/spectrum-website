/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CAL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
