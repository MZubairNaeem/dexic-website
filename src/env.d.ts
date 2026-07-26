/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DATABASE_URL: string
  readonly CONTACT_EMAIL: string
  readonly CONTACT_PASS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
