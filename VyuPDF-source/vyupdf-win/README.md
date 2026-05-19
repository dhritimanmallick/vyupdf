# VyuPDF

Lightweight PDF editor by **Vyuhaa Med Data Private Limited**.

Download, double-click, done. No Python, no Chrome extension, no other software required.

---

## Download

Go to [Releases](https://github.com/vyuhaadata/vyupdf/releases/latest) and download:
- **Windows:** `VyuPDF-Setup-1.0.0.exe`
- **Mac:** `VyuPDF-1.0.0.dmg`

---

## Features

| Feature | Description |
|---|---|
| Open PDF | Open any PDF file — drag and drop or file picker |
| Add Text | Click anywhere on the page to place editable text |
| Add Image | Insert images, drag to reposition, resize |
| Add Pages | Import pages from other PDFs or images |
| OCR | Extract text from scanned pages (requires internet on first use) |
| Organise Pages | Move pages up/down, delete pages |
| Compress | Reduce file size before saving |
| Save / Save As | Save edited PDF to any location |

**Keyboard shortcuts:**
`Ctrl+O` Open · `Ctrl+S` Save · `Ctrl+Shift+S` Save As · `Ctrl+T` Text tool · `Ctrl+R` OCR · `Ctrl++/-` Zoom · `Esc` Cancel tool

---

## Build from source

```bash
git clone https://github.com/vyuhaadata/vyupdf.git
cd vyupdf
npm install
npm start              # run in development
npm run build:win      # build Windows .exe
npm run build:mac      # build macOS .dmg
```

GitHub Actions builds the installer automatically on every push to `main`.

---

## Tech stack

- [Electron](https://www.electronjs.org/) v29
- [pdf-lib](https://pdf-lib.js.org/) — PDF editing
- [PDF.js](https://mozilla.github.io/pdf.js/) — PDF rendering
- [Tesseract.js](https://tesseract.projectnaptha.com/) — OCR

---

## License

**Apache License 2.0** — free to use, modify, and distribute.

The Vyuhaa logo and branding remain the property of Vyuhaa Med Data Private Limited and are not covered by the Apache license.

---

© 2026 Vyuhaa Med Data Private Limited · [vyuhaadata.com](https://www.vyuhaadata.com)
