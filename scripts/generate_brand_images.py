#!/usr/bin/env python3
"""Generate Forest Teal / dark neutral JPEGs for kailas-lab public assets (no external deps beyond Pillow)."""
from __future__ import annotations

import math
import os
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images"

# Brand palette
C_BG = (14, 22, 21)  # #0e1615
C_BG2 = (26, 26, 26)  # #1A1A1A
C_TEAL = (26, 143, 125)  # #1A8F7D


def _lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def _clamp(c: float) -> int:
    return max(0, min(255, int(c)))


def atmospheric(
    w: int,
    h: int,
    seed: int,
    *,
    glow_x: float = 0.5,
    glow_y: float = 0.4,
    glow_strength: float = 1.0,
    diagonal_teal: float = 0.35,
    noise_amt: int = 14,
) -> Image.Image:
    random.seed(seed)
    img = Image.new("RGB", (w, h))
    px = img.load()
    for y in range(h):
        ny = y / h
        for x in range(w):
            nx = x / w
            # Base diagonal mix
            d = (nx * 0.55 + ny * 0.45) % 1.0
            t = d * 0.85 + random.random() * 0.04
            r = _lerp(C_BG[0], C_BG2[0], t)
            g = _lerp(C_BG[1], C_BG2[1], t)
            b = _lerp(C_BG[2], C_BG2[2], t)
            # Teal diagonal wash
            td = (nx * diagonal_teal + (1 - ny) * (1 - diagonal_teal)) * 0.5
            r += td * C_TEAL[0] * 0.08
            g += td * C_TEAL[1] * 0.12
            b += td * C_TEAL[2] * 0.1
            # Radial glow
            gx = nx - glow_x
            gy = ny - glow_y
            dist = math.sqrt(gx * gx + gy * gy)
            glow = max(0.0, 1.0 - dist * 2.2) * glow_strength
            g += glow * 55
            b += glow * 48
            r += glow * 12
            # Fine grain
            n = random.randint(-noise_amt, noise_amt)
            px[x, y] = (_clamp(r + n), _clamp(g + n), _clamp(b + n))
    return img


def add_light_ribbons(im: Image.Image, seed: int, count: int = 4) -> Image.Image:
    random.seed(seed)
    overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    w, h = im.size
    for i in range(count):
        x0 = random.randint(-w // 4, w)
        y0 = random.randint(0, h)
        x1 = x0 + random.randint(w // 3, w)
        y1 = y0 + random.randint(-h // 8, h // 8)
        width = random.randint(40, 120)
        color = (
            C_TEAL[0],
            C_TEAL[1],
            C_TEAL[2],
            random.randint(18, 45),
        )
        draw.line((x0, y0, x1, y1), fill=color, width=width)
    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=28))
    base = im.convert("RGBA")
    return Image.alpha_composite(base, overlay).convert("RGB")


def save_jpeg(im: Image.Image, path: Path, quality: int = 82) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "JPEG", quality=quality, optimize=True)


def main() -> None:
    specs: list[tuple[str, int, int, int, dict]] = [
        ("cases/case-1.jpg", 1200, 675, 101, {"glow_x": 0.3, "glow_y": 0.55, "diagonal_teal": 0.5}),
        ("cases/case-2.jpg", 1200, 675, 202, {"glow_x": 0.7, "glow_y": 0.35, "diagonal_teal": 0.25}),
        ("cases/case-3.jpg", 1200, 675, 303, {"glow_x": 0.5, "glow_y": 0.6, "glow_strength": 1.2}),
        ("cases/case-4.jpg", 1200, 675, 404, {"glow_x": 0.25, "glow_y": 0.3, "diagonal_teal": 0.6}),
        ("cases/case-5.jpg", 1200, 675, 505, {"glow_x": 0.65, "glow_y": 0.5, "diagonal_teal": 0.4}),
        ("cases/case-6.jpg", 1200, 675, 606, {"glow_x": 0.45, "glow_y": 0.45, "glow_strength": 0.95}),
        ("hero-main.jpg", 1920, 1080, 901, {"glow_x": 0.5, "glow_y": 0.42, "glow_strength": 1.15, "diagonal_teal": 0.38}),
        ("cta-bg.jpg", 1920, 900, 902, {"glow_x": 0.55, "glow_y": 0.65, "glow_strength": 1.0}),
        ("hero-inner-a.jpg", 1920, 720, 801, {"glow_x": 0.35, "glow_y": 0.5, "diagonal_teal": 0.45}),
        ("hero-inner-b.jpg", 1920, 720, 802, {"glow_x": 0.72, "glow_y": 0.4, "diagonal_teal": 0.3}),
        ("service-crisis.jpg", 900, 500, 11, {}),
        ("service-tax.jpg", 900, 500, 12, {"glow_x": 0.4}),
        ("service-negotiation.jpg", 900, 500, 13, {"glow_y": 0.55}),
        ("service-expertise.jpg", 900, 500, 14, {"diagonal_teal": 0.5}),
        ("service-ma.jpg", 900, 500, 15, {"glow_x": 0.6}),
        ("service-ai.jpg", 900, 500, 16, {"glow_strength": 1.25}),
        ("blog-tax.jpg", 1200, 630, 21, {"glow_x": 0.45}),
        ("blog-bankruptcy.jpg", 1200, 630, 22, {"glow_x": 0.55, "glow_y": 0.45}),
    ]

    for rel, w, h, seed, kw in specs:
        im = atmospheric(w, h, seed, **kw)
        if "case-" in rel or rel.startswith("hero-") or rel == "cta-bg.jpg":
            im = add_light_ribbons(im, seed + 777, count=3 if "case" in rel else 5)
        save_jpeg(im, OUT / rel)
        print("wrote", rel)

    print("done ->", OUT)


if __name__ == "__main__":
    main()
