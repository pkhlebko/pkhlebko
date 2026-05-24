---
name: cv-html
description: Generate index.html from pavel_khlebko_cv_eng.md with employer name masking. Use when updating the site or when the user says "generate HTML", "update site", or "build CV HTML".
disable-model-invocation: true
allowed-tools: Bash(node scripts/generate-html.mjs) Bash(npm run cv:html) Bash(npm run cv)
---

# Generate CV HTML from pavel_khlebko_cv_eng.md

Convert `pavel_khlebko_cv_eng.md` into `index.html` using Node.js with marked, applying employer name masks for the public site.

Employer name masking is applied automatically. Real names are preserved in the MD source (used for PDF); the public HTML shows generic placeholders.

## Steps

1. If `node_modules` is missing or `marked` is not installed, run:
   ```bash
   npm install --save-dev marked
   ```

2. Run the HTML generation command:
   ```bash
   npm run cv:html
   ```
   Or to generate both HTML and PDF:
   ```bash
   npm run cv
   ```

3. Confirm the output file `index.html` exists at the project root.

4. Report success or any errors.