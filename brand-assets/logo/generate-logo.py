"""Generate the Dexic logo system as pure-path SVGs.

Units: cap height 100, baseline y=100 (SVG y grows downward).
"""
import math
import os
import sys

OUT = os.path.dirname(os.path.abspath(__file__))

INK = '#0e0e0e'
PAPER = '#f6f6f2'
WHITE = '#ffffff'
LIME = '#d4f51e'
VIOLET = '#6c5cff'

# ---- Parameters -------------------------------------------------------------
P = dict(
    SD=20,      # D stroke (top/bottom)
    core_dx=3,  # core nudged right: heavier stem, lighter bowl
    core_r=29,  # core radius
    s=17.5,     # lowercase stroke
    xh=72,      # x-height
    bar=13,     # e crossbar thickness
    e_term=38,  # e lower terminal angle (deg below horizontal)
    c_open=42,  # c aperture half-angle (deg)
    xw=62,      # x glyph width
    tit=19,     # i tittle diameter
    tit_gap=7,  # gap between tittle and stem
    k=(6, 6, 8, 8),  # gaps D|e, e|x, x|i, i|c
)


def f(v):
    return f'{v:.2f}'.rstrip('0').rstrip('.')


def pt(cx, cy, r, deg):
    a = math.radians(deg)
    return cx + r * math.cos(a), cy + r * math.sin(a)


def glyph_D(x0, SD, dx=0, r=None):
    """Outer D silhouette and the circular core."""
    r = r if r is not None else 50 - SD
    outer = f'M{f(x0)} 0H{f(x0 + 50)}A50 50 0 0 1 {f(x0 + 50)} 100H{f(x0)}Z'
    core = (x0 + 50 + dx, 50, r)
    return outer, core, x0 + 100


def circle_path(cx, cy, r, clockwise=True):
    sweep = 1 if clockwise else 0
    return (f'M{f(cx - r)} {f(cy)}A{f(r)} {f(r)} 0 1 {sweep} {f(cx + r)} {f(cy)}'
            f'A{f(r)} {f(r)} 0 1 {sweep} {f(cx - r)} {f(cy)}Z')


def glyph_e(x0, s, xh, bar, term):
    R = xh / 2
    r = R - s
    cx, cy = x0 + R, 100 - R
    yb = cy + bar / 2   # bar bottom
    yt = cy - bar / 2   # bar top
    # Outer contour: start at right edge on bar bottom, go the long way round
    a1 = math.degrees(math.asin((yb - cy) / R))
    p1 = pt(cx, cy, R, a1)
    p2 = pt(cx, cy, R, term)
    p3 = pt(cx, cy, r, term)
    a4 = 180 - math.degrees(math.asin((yb - cy) / r))
    p4 = pt(cx, cy, r, a4)
    outer = (f'M{f(p1[0])} {f(p1[1])}'
             f'A{f(R)} {f(R)} 0 1 0 {f(p2[0])} {f(p2[1])}'
             f'L{f(p3[0])} {f(p3[1])}'
             f'A{f(r)} {f(r)} 0 0 1 {f(p4[0])} {f(p4[1])}'
             f'L{f(p1[0])} {f(p1[1])}Z')
    # Upper counter (hole), wound the opposite way
    a5 = -math.degrees(math.asin((cy - yt) / r))
    p5 = pt(cx, cy, r, a5)
    p6 = pt(cx, cy, r, 180 - a5)
    hole = (f'M{f(p5[0])} {f(p5[1])}'
            f'L{f(p6[0])} {f(p6[1])}'
            f'A{f(r)} {f(r)} 0 0 1 {f(p5[0])} {f(p5[1])}Z')
    return outer + hole, x0 + 2 * R


def glyph_x(x0, s, xh, w):
    top, bot = 100 - xh, 100

    def stroke(xa, xb):
        # Horizontal stroke width a for perpendicular thickness s.
        a = s
        for _ in range(30):
            dx, dy = (xb - xa) - a, xh
            a = s * math.hypot(dx, dy) / dy
        return a

    a = stroke(x0, x0 + w)
    s1 = f'M{f(x0)} {f(top)}H{f(x0 + a)}L{f(x0 + w)} {f(bot)}H{f(x0 + w - a)}Z'
    s2 = f'M{f(x0 + w)} {f(top)}L{f(x0 + a)} {f(bot)}H{f(x0)}L{f(x0 + w - a)} {f(top)}Z'
    return s1 + s2, x0 + w


def glyph_i(x0, s, xh, tit, gap):
    top = 100 - xh
    stem = f'M{f(x0)} {f(top)}H{f(x0 + s)}V100H{f(x0)}Z'
    cx = x0 + s / 2
    cy = top - gap - tit / 2
    return stem, (cx, cy, tit / 2), x0 + s


def glyph_c(x0, s, xh, opening):
    R = xh / 2
    r = R - s
    cx, cy = x0 + R, 100 - R
    p1 = pt(cx, cy, R, -opening)
    p2 = pt(cx, cy, R, opening)
    p3 = pt(cx, cy, r, opening)
    p4 = pt(cx, cy, r, -opening)
    d = (f'M{f(p1[0])} {f(p1[1])}'
         f'A{f(R)} {f(R)} 0 1 0 {f(p2[0])} {f(p2[1])}'
         f'L{f(p3[0])} {f(p3[1])}'
         f'A{f(r)} {f(r)} 0 1 1 {f(p4[0])} {f(p4[1])}Z')
    # Right edge of the c's ink is the terminal tip, not the full circle.
    return d, max(p1[0], p3[0])


def build(p):
    k = p['k']
    D, core, x = glyph_D(0, p['SD'], p['core_dx'], p['core_r'])
    e, x2 = glyph_e(x + k[0], p['s'], p['xh'], p['bar'], p['e_term'])
    xg, x3 = glyph_x(x2 + k[1], p['s'], p['xh'], p['xw'])
    i_stem, tit, x4 = glyph_i(x3 + k[2], p['s'], p['xh'], p['tit'], p['tit_gap'])
    c, x5 = glyph_c(x4 + k[3], p['s'], p['xh'], p['c_open'])
    return dict(D=D, core=core, e=e, x=xg, i=i_stem, tit=tit, c=c, width=x5)


def svg(w, h, body, vb=None, bg=None):
    vb = vb or f'0 0 {f(w)} {f(h)}'
    rect = f'<rect width="100%" height="100%" fill="{bg}"/>' if bg else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" '
            f'width="{f(w)}" height="{f(h)}">{rect}{body}</svg>\n')


def symbol_body(g, ink, core_fill, knockout=False):
    """Colour: solid D with the core laid on top (no anti-alias seam).
    Knockout: one-colour D with the core punched out."""
    cx, cy, r = g['core']
    if knockout:
        return f'<path d="{g["D"]}{circle_path(cx, cy, r, clockwise=False)}" fill="{ink}" fill-rule="evenodd"/>'
    return (f'<path d="{g["D"]}" fill="{ink}"/>'
            f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="{core_fill}"/>')


def wordmark_body(g, ink, core_fill, knockout=False):
    body = symbol_body(g, ink, core_fill, knockout=knockout)
    cx, cy, r = g['tit']
    body += f'<path d="{g["e"]}" fill="{ink}" fill-rule="evenodd"/>'
    body += f'<path d="{g["x"]}" fill="{ink}"/>'
    body += f'<path d="{g["i"]}" fill="{ink}"/>'
    body += f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="{ink}"/>'
    body += f'<path d="{g["c"]}" fill="{ink}"/>'
    return body


def write(name, content):
    with open(os.path.join(OUT, name), 'w') as fh:
        fh.write(content)


def main():
    g = build(P)
    W = g['width']

    # Wordmark
    for name, ink, core, ko in [
        ('dexic-wordmark.svg', INK, LIME, False),
        ('dexic-wordmark-on-dark.svg', PAPER, LIME, False),
        ('dexic-wordmark-black.svg', INK, INK, True),
        ('dexic-wordmark-white.svg', WHITE, WHITE, True),
    ]:
        write(name, svg(W, 100, wordmark_body(g, ink, core, ko)))

    # Symbol
    for name, ink, core, ko in [
        ('dexic-symbol.svg', INK, LIME, False),
        ('dexic-symbol-on-dark.svg', PAPER, LIME, False),
        ('dexic-symbol-black.svg', INK, INK, True),
        ('dexic-symbol-white.svg', WHITE, WHITE, True),
    ]:
        write(name, svg(100, 100, symbol_body(g, ink, core, knockout=ko)))

    # Tiles: rounded app icon, square avatars (platforms crop them), favicon.
    T = 160

    def tile(bg, ink, core, scale, rx=0, ko=False, nudge=1.5):
        o = (T - 100 * scale) / 2
        r = f'<rect width="{T}" height="{T}" rx="{f(T * rx)}" fill="{bg}"/>'
        return svg(T, T, r + f'<g transform="translate({f(o + nudge)} {f(o)}) scale({scale})">'
                   f'{symbol_body(g, ink, core, knockout=ko)}</g>')

    write('dexic-app-icon.svg', tile(INK, PAPER, LIME, 0.62, rx=0.225))
    write('dexic-avatar.svg', tile(INK, PAPER, LIME, 0.56))
    write('dexic-avatar-lime.svg', tile(LIME, INK, LIME, 0.56, ko=True))
    write('dexic-favicon.svg', tile(INK, PAPER, LIME, 0.74, rx=0.24, nudge=2))

    # Inline snippet for the LinkedIn banner (wordmark, ink + lime)
    with open(os.path.join(OUT, 'wordmark-inline.txt'), 'w') as fh:
        fh.write(f'<svg class="wm-logo" viewBox="0 0 {f(W)} 100" aria-label="Dexic">{wordmark_body(g, INK, LIME)}</svg>')

    print(f'wordmark width {W:.1f}')


if __name__ == '__main__':
    main()
