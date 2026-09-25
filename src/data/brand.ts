// Visual-only brand mapping for products. Copy lives in products.ts;
// this file only decides icons, tile colours and which words get highlighted.
import type { IconName } from '../components/brand/icons'

export type Tone = 'lime' | 'violet' | 'ink'

export interface ProductBrand {
  icon: IconName
  tone: Tone
  /** Phrase inside the tagline that sits on the highlighter. */
  highlight: string
  /** One icon per feature, in the same order as product.features. */
  featureIcons: IconName[]
}

export const PRODUCT_BRAND: Record<string, ProductBrand> = {
  stacship: {
    icon: 'box',
    tone: 'ink',
    highlight: 'simple',
    featureIcons: ['terminal', 'git-branch', 'lock', 'sliders', 'undo', 'activity']
  },
  tablesnap: {
    icon: 'scan',
    tone: 'lime',
    highlight: 'effortlessly',
    featureIcons: ['qr', 'message', 'shield-check', 'file-text', 'grid', 'map-pin']
  },
  woofy: {
    icon: 'paw',
    tone: 'violet',
    highlight: 'Animal Rescue',
    featureIcons: ['camera', 'radio', 'merge', 'stethoscope', 'clock', 'heart']
  }
}

const FALLBACK: ProductBrand = {
  icon: 'sparkles',
  tone: 'lime',
  highlight: '',
  featureIcons: ['zap', 'target', 'layers', 'sliders', 'activity', 'sparkles']
}

export function brandFor(slug: string): ProductBrand {
  return PRODUCT_BRAND[slug] ?? FALLBACK
}

/** Split a sentence around the highlight phrase (first match). */
export function splitHighlight(text: string, phrase: string): [string, string, string] {
  const i = phrase ? text.indexOf(phrase) : -1
  if (i < 0) return [text, '', '']
  return [text.slice(0, i), phrase, text.slice(i + phrase.length)]
}

/** Alternating tones for grids of cards. */
export const TONE_CYCLE: Tone[] = ['lime', 'violet', 'ink']
