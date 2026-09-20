/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Public origin the site is served from, without a trailing slash
   * (e.g. https://hexanxt.com). Used to build absolute canonical / Open Graph
   * URLs. Optional: when unset, those tags fall back to relative paths.
   */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
