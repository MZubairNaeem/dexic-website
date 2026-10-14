// Geometry for the Dexic Core logo: a geometric D whose counter is a lime
// core, followed by custom lowercase "exic". Units: cap height 100, baseline y=100.
export const LOGO = {
  width: 342.25,
  /** D silhouette (drawn solid; the core sits on top) */
  d: 'M0 0H50A50 50 0 0 1 50 100H0Z',
  core: { cx: 53, cy: 50, r: 29 },
  /** "e" with its upper counter — render with fill-rule="evenodd" */
  e: 'M177.41 70.5A36 36 0 1 0 170.37 86.16L156.58 75.39A18.5 18.5 0 0 1 124.68 70.5L177.41 70.5ZM159.32 57.5L124.68 57.5A18.5 18.5 0 0 1 159.32 57.5Z',
  /** "x", "i" (stem + tittle) and "c" */
  xic: 'M184 28H204.23L246 100H225.77ZM246 28L204.23 100H184L225.77 28ZM254 28H271.5V100H254ZM253.25 11.5A9.5 9.5 0 1 1 272.25 11.5A9.5 9.5 0 1 1 253.25 11.5ZM342.25 39.91A36 36 0 1 0 342.25 88.09L329.25 76.38A18.5 18.5 0 1 1 329.25 51.62Z'
} as const
