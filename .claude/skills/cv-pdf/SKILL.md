---
name: cv-pdf
description: Generate PDF from cv.md with professional typography matching the site design. Use when updating the CV PDF or when the user says "generate CV", "update PDF", or "build CV".
disable-model-invocation: true
allowed-tools: Bash(npx md-to-pdf *) Bash(npm install *)
---

# Generate CV PDF from cv.md

Convert `cv.md` into `pavel_khlebko_cv_eng.pdf` using md-to-pdf with the project's PDF stylesheet.

## Steps

1. If `node_modules` is missing or `md-to-pdf` is not installed, run:
   ```bash
   npm install --save-dev md-to-pdf
   ```

2. Run the PDF generation command:
   ```bash
   npx md-to-pdf cv.md --config-file .claude/skills/cv-pdf/md-to-pdf.config.js
   ```

3. Confirm the output file `pavel_khlebko_cv_eng.pdf` exists at the project root.

4. Report the file size of the generated PDF.