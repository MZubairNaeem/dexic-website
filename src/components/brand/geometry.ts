export type Point = [number, number]

const round = (n: number) => Math.round(n * 10) / 10

/** Point on a circle, 0° = 3 o'clock, clockwise (SVG y-down). */
export function polar(cx: number, cy: number, r: number, deg: number): Point {
  const rad = (deg * Math.PI) / 180
  return [round(cx + r * Math.cos(rad)), round(cy + r * Math.sin(rad))]
}

/** SVG arc path between two angles on a circle. */
export function arc(cx: number, cy: number, r: number, fromDeg: number, toDeg: number): string {
  const [x1, y1] = polar(cx, cy, r, fromDeg)
  const [x2, y2] = polar(cx, cy, r, toDeg)
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0
  return `M${x1} ${y1} A${r} ${r} 0 ${large} 1 ${x2} ${y2}`
}

/**
 * Two-winged arrowhead at `tip`, oriented along the incoming direction
 * (from the last control point `from` towards `tip`).
 */
export function arrowHead(tip: Point, from: Point, length = 10, spreadDeg = 28): string {
  const dx = from[0] - tip[0]
  const dy = from[1] - tip[1]
  const d = Math.hypot(dx, dy) || 1
  const ux = dx / d
  const uy = dy / d
  const wing = (deg: number): Point => {
    const a = (deg * Math.PI) / 180
    return [round(tip[0] + length * (ux * Math.cos(a) - uy * Math.sin(a))), round(tip[1] + length * (ux * Math.sin(a) + uy * Math.cos(a)))]
  }
  const [a, b] = [wing(spreadDeg), wing(-spreadDeg)]
  return `M${a[0]} ${a[1]} L${tip[0]} ${tip[1]} L${b[0]} ${b[1]}`
}
