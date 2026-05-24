import { readFileSync, writeFileSync } from 'fs';
import { marked } from 'marked';
import { masks } from './masks.mjs';

const MD_PATH = 'pavel_khlebko_cv_eng.md';
const TEMPLATE_PATH = 'scripts/html-template.html';
const OUTPUT_PATH = 'index.html';

// Slugify text for heading IDs: lowercase, replace non-alphanumeric with hyphens, collapse
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s—-]/g, '')
    .replace(/[\s—]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

// Track heading IDs to deduplicate
const headingIds = {};
function uniqueSlug(text) {
  let id = slugify(text);
  if (headingIds[id]) {
    headingIds[id]++;
    id = `${id}-${headingIds[id]}`;
  } else {
    headingIds[id] = 1;
  }
  return id;
}

// Configure marked: add id attributes to headings
marked.use({
  gfm: true,
  renderer: {
    heading({ text, depth }) {
      const raw = text.replace(/<[^>]+>/g, '');
      const id = uniqueSlug(raw);
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    },
  },
});

// Read and mask MD
let md = readFileSync(MD_PATH, 'utf-8');
for (const { from, to } of masks) {
  md = md.replaceAll(from, to);
}

// Split into header (h1, subtitle, contact links) and content
const lines = md.split('\n');
const h1Index = lines.findIndex((l) => l.startsWith('# '));
const name = lines[h1Index].replace(/^#\s+/, '').trim();

// Find subtitle: next non-empty line after h1
let subtitle = '';
let linksIndex = -1;
for (let i = h1Index + 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  if (line.startsWith('**') && line.endsWith('**')) {
    subtitle = line.replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
  } else if (line.startsWith('[')) {
    linksIndex = i;
    break;
  }
}

// Parse contact links: [text](url) separated by |
const linksLine = lines[linksIndex];
const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
const navLinks = [];
let match;
while ((match = linkPattern.exec(linksLine)) !== null) {
  navLinks.push({ text: match[1], url: match[2] });
}

// Build header HTML
const navHtml = navLinks.map((l) => `<a href="${l.url}">${l.text}</a>`).join(' | ');
const headerHtml = `<header>\n  <h1>${name}</h1>\n  <p>${subtitle}</p>\n  <nav>\n    ${navHtml}\n  </nav>\n</header>`;

// Content: everything after the contact links line
const contentMd = lines.slice(linksIndex + 1).join('\n');
const articleHtml = marked.parse(contentMd);
const bodyHtml = `${headerHtml}\n<article>\n${articleHtml}</article>`;

// Build title
const pageTitle = `${name} — ${subtitle}`;

// Read template and fill placeholders
const template = readFileSync(TEMPLATE_PATH, 'utf-8');
const html = template.replace('{{TITLE}}', pageTitle).replace('{{BODY}}', bodyHtml);

writeFileSync(OUTPUT_PATH, html);
console.log(`Generated ${OUTPUT_PATH}`);