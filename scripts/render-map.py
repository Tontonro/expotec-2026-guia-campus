"""Render the original vector PDF, with the same crop as the map SVG.

Run: python scripts/render-map.py
Dependencies: PyMuPDF and Pillow.
Keep PDF_CROP synchronized with the SVG viewBox in index.html.
"""

from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parents[1]
PDF_CROP = fitz.Rect(52, 78, 798, 544.25)
MAP_WIDTH, MAP_HEIGHT = 1304, 815


def main():
    with fitz.open(ROOT / "referencias/Planta_IFRN.pdf") as source:
        with fitz.open() as canvas:
            page = canvas.new_page(width=MAP_WIDTH, height=MAP_HEIGHT)
            page.show_pdf_page(page.rect, source, 0, clip=PDF_CROP)
            # Rasterize the vectors directly: do not upscale the old PNG.
            for name, scale, options in (
                ("planta-ifrn-map.webp", 5, {"lossless": True, "method": 6}),
                ("planta-ifrn-map.png", 2, {}),
            ):
                target = ROOT / "assets" / name
                pixmap = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=False)
                pixmap.pil_save(target, **options)
                print(f"{name}: {pixmap.width} x {pixmap.height}, {target.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
