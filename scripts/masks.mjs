// Employer name masks applied to MD source before HTML generation.
// PDF generation uses real names — no masking.
// More specific replacements must come first.

export const masks = [
  // Heading-specific replacements (company + project)
  { from: '### SLB — myDigitalProduct', to: '### Oilfield services company — myDigitalProduct' },
  { from: '### SLB — VTC', to: '### Oilfield services company — VTC' },
  { from: '### Schlumberger North America — Well Operations Advisor', to: '### Oilfield services company (USA) — Well Operations Advisor' },
  { from: '### Thomson Reuters — ONVI', to: '### Multinational media conglomerate (USA) — ONVI' },
  { from: '### Thomson Reuters — Checkpoint Engage', to: '### Financial services company (USA) — Checkpoint Engage' },

  // Generic name replacements (catch remaining body-text occurrences)
  { from: 'SLB', to: 'Oilfield services company' },
  { from: 'Schlumberger North America', to: 'Oilfield services company (USA)' },
  { from: 'Thomson Reuters', to: 'Multinational media conglomerate (USA)' },
];