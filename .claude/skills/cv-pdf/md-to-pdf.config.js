module.exports = {
  dest: 'pavel_khlebko_cv_eng.pdf',
  stylesheet: ['.claude/skills/cv-pdf/pdf-style.css'],
  pdf_options: {
    format: 'A4',
    margin: '20mm 18mm',
    printBackground: true,
  },
  body_class: 'cv-pdf',
  marked_options: {
    gfm: true,
  },
};