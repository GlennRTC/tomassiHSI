'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  escapeHtml,
  renderTags,
  renderCasoCard,
  renderCasoModal,
  renderCasosCards,
  renderCasosModals,
  renderDocumentRow,
  renderDocumentsSection,
  spliceMarked,
} = require('./build-content');

test('escapeHtml escapes &, <, >, and "', () => {
  assert.equal(escapeHtml('<a> & "quote"'), '&lt;a&gt; &amp; &quot;quote&quot;');
});

test('renderTags renders one span per tag', () => {
  const html = renderTags(['HL7', 'FHIR']);
  assert.match(html, /HL7/);
  assert.match(html, /FHIR/);
  assert.equal(html.split('<span').length - 1, 2);
});

test('spliceMarked replaces content between markers, leaves the rest untouched', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'build-content-test-'));
  const file = path.join(dir, 'sample.html');
  fs.writeFileSync(
    file,
    '<p>before</p>\n<!-- TEST:START -->\nold content\n<!-- TEST:END -->\n<p>after</p>\n'
  );
  spliceMarked(file, 'TEST', 'new content');
  const result = fs.readFileSync(file, 'utf8');
  assert.match(result, /new content/);
  assert.doesNotMatch(result, /old content/);
  assert.match(result, /<p>before<\/p>/);
  assert.match(result, /<p>after<\/p>/);
});

test('spliceMarked throws when markers are missing', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'build-content-test-'));
  const file = path.join(dir, 'sample.html');
  fs.writeFileSync(file, '<p>no markers here</p>');
  assert.throws(() => spliceMarked(file, 'MISSING', 'x'));
});

const SAMPLE_CASO = {
  id: 'PRJ-001',
  featured: false,
  title: 'Título de prueba',
  summary: 'Resumen de prueba',
  country: 'Colombia',
  period: '2025–2026',
  tags: ['HL7', 'Mirth Connect'],
  image: { src: 'https://example.com/img.png', alt: 'Diagrama de prueba' },
  detail: {
    contexto: 'Contexto de prueba',
    problema: 'Problema de prueba',
    solucion: 'Solución de prueba',
    resultado: 'Resultado de prueba',
  },
};

test('renderCasoCard uses the standard template when not featured', () => {
  const html = renderCasoCard(SAMPLE_CASO);
  assert.match(html, /col-span-1 md:col-span-6/);
  assert.match(html, /Título de prueba/);
  assert.match(html, /href="#modal-prj-001"/);
});

test('renderCasoCard uses the featured template when featured is true', () => {
  const html = renderCasoCard({ ...SAMPLE_CASO, featured: true });
  assert.match(html, /col-span-1 md:col-span-12/);
});

test('renderCasoModal includes all four detail sections and the correct ids', () => {
  const html = renderCasoModal(SAMPLE_CASO);
  assert.match(html, /id="modal-prj-001"/);
  assert.match(html, /id="modal-prj-001-title"/);
  assert.match(html, /Contexto de prueba/);
  assert.match(html, /Problema de prueba/);
  assert.match(html, /Solución de prueba/);
  assert.match(html, /Resultado de prueba/);
});

test('renderCasosCards renders one article per caso inside the grid wrapper', () => {
  const html = renderCasosCards([SAMPLE_CASO, { ...SAMPLE_CASO, id: 'PRJ-002' }]);
  assert.match(html, /class="grid grid-cols-1 md:grid-cols-12 gap-6"/);
  assert.equal((html.match(/<article/g) || []).length, 2);
});

test('renderCasosModals renders one case-modal div per caso', () => {
  const html = renderCasosModals([SAMPLE_CASO, { ...SAMPLE_CASO, id: 'PRJ-002' }]);
  assert.equal((html.match(/case-modal/g) || []).length, 2);
});

test('renderDocumentsSection falls back to the placeholder when there are no documents', () => {
  const html = renderDocumentsSection([]);
  assert.match(html, /Próximamente/);
  assert.match(html, /Esta sección reunirá papers técnicos/);
});

test('renderDocumentsSection lists documents when present', () => {
  const html = renderDocumentsSection([
    { title: 'Guía LOINC', description: 'Notas de mapeo', date: '2026-08', file: 'loinc-mapping.pdf' },
  ]);
  assert.match(html, /Guía LOINC/);
  assert.match(html, /Notas de mapeo/);
  assert.match(html, /href="documents\/loinc-mapping\.pdf"/);
  assert.doesNotMatch(html, /Próximamente/);
});

test('renderDocumentRow escapes document fields', () => {
  const html = renderDocumentRow({
    title: 'A & B',
    description: '<script>',
    date: '2026-08',
    file: 'a-b.md',
  });
  assert.match(html, /A &amp; B/);
  assert.match(html, /&lt;script&gt;/);
});
