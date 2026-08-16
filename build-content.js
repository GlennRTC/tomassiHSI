#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderTags(tags) {
  return tags
    .map(
      (tag) =>
        `<span class="border border-surface-highest px-3 py-1 text-[12px] text-on-surface bg-surface-low font-semibold">${escapeHtml(tag)}</span>`
    )
    .join('\n');
}

function renderFeaturedCard(caso) {
  const idLower = escapeHtml(caso.id.toLowerCase());
  return `<article class="col-span-1 md:col-span-12 bg-white border border-surface-highest relative overflow-hidden group">
<div class="grid grid-cols-1 md:grid-cols-2 gap-0">
<div class="p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-surface-highest bg-white z-10">
<div>
<div class="flex justify-between items-start mb-6">
<span class="text-[13px] text-primary-container font-bold">${escapeHtml(caso.id)}</span>
<span class="text-[12px] text-on-surface-variant border border-surface-highest px-2 py-1 bg-surface-low">${escapeHtml(caso.country)} · ${escapeHtml(caso.period)}</span>
</div>
<h3 class="text-[32px] text-on-surface mb-4 font-semibold">${escapeHtml(caso.title)}</h3>
<p class="text-[14px] text-on-surface-variant mb-6">
${escapeHtml(caso.summary)}
</p>
</div>
<div class="flex flex-wrap gap-2 mt-4">
${renderTags(caso.tags)}
</div>
<a class="inline-flex items-center gap-1 text-[12px] text-primary-container font-bold uppercase tracking-wider hover:gap-2 transition-all mt-4 w-max" href="#modal-${idLower}">
Ver caso completo
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
<div class="relative h-64 md:h-auto bg-surface-low border-l border-surface-highest overflow-hidden flex items-center justify-center p-8">
<img class="w-full h-full object-contain filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500" alt="${escapeHtml(caso.image.alt)}" src="${escapeHtml(caso.image.src)}"/>
<div class="absolute inset-0 border-l-2 border-primary-container opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
</div>
</div>
</article>`;
}

function renderStandardCard(caso) {
  const idLower = escapeHtml(caso.id.toLowerCase());
  return `<article class="col-span-1 md:col-span-6 bg-white border border-surface-highest relative group flex flex-col">
<div class="h-48 relative border-b border-surface-highest bg-surface-low overflow-hidden flex items-center justify-center">
<img class="w-full h-full object-cover filter grayscale opacity-80 hover:grayscale-0 transition-all duration-500" alt="${escapeHtml(caso.image.alt)}" src="${escapeHtml(caso.image.src)}"/>
<span class="absolute top-4 left-4 bg-white border border-surface-highest px-2 py-1 text-[12px] text-primary-container z-10 font-bold shadow-sm">${escapeHtml(caso.id)}</span>
</div>
<div class="p-6 flex-grow flex flex-col bg-white">
<div class="flex justify-between items-center mb-3">
<span class="text-[12px] text-on-surface-variant border border-surface-highest px-2 py-1 bg-surface-low">${escapeHtml(caso.country)} · ${escapeHtml(caso.period)}</span>
</div>
<h3 class="text-[20px] font-semibold text-on-surface mb-3">${escapeHtml(caso.title)}</h3>
<p class="text-[14px] text-on-surface-variant mb-6 flex-grow">
${escapeHtml(caso.summary)}
</p>
<div class="flex flex-wrap gap-2 border-t border-surface-highest pt-4">
${renderTags(caso.tags)}
</div>
<a class="inline-flex items-center gap-1 text-[12px] text-primary-container font-bold uppercase tracking-wider hover:gap-2 transition-all mt-4 w-max" href="#modal-${idLower}">
Ver caso completo
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
<div class="absolute left-0 top-0 bottom-0 w-[2px] bg-primary-container opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</article>`;
}

function renderCasoCard(caso) {
  return caso.featured ? renderFeaturedCard(caso) : renderStandardCard(caso);
}

function renderCasoModal(caso) {
  const idLower = escapeHtml(caso.id.toLowerCase());
  return `<div class="case-modal hidden target:flex fixed inset-0 z-[100] items-start justify-center overflow-y-auto py-8 md:py-16 px-margin-mobile md:px-margin-desktop" id="modal-${idLower}">
<a aria-label="Cerrar artículo" class="fixed inset-0 bg-on-surface/80" href="#projects"></a>
<article aria-labelledby="modal-${idLower}-title" aria-modal="true" class="relative bg-white border border-surface-highest w-full max-w-3xl z-10" role="dialog">
<a aria-label="Cerrar artículo" class="fixed md:absolute top-4 right-4 flex items-center justify-center w-11 h-11 border border-surface-highest bg-white hover:border-primary-container hover:text-primary-container transition-colors z-20" href="#projects">
<span class="material-symbols-outlined">close</span>
</a>
<div class="h-56 md:h-72 bg-surface-low border-b border-surface-highest overflow-hidden">
<img alt="${escapeHtml(caso.image.alt)}" class="w-full h-full object-cover filter grayscale" src="${escapeHtml(caso.image.src)}"/>
</div>
<div class="p-8 md:p-12">
<div class="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-surface-highest pb-4">
<span class="text-[13px] text-primary-container font-bold">${escapeHtml(caso.id)}</span>
<span class="text-[12px] text-on-surface-variant border border-surface-highest px-2 py-1 bg-surface-low">${escapeHtml(caso.country)} · ${escapeHtml(caso.period)}</span>
</div>
<h2 class="text-[26px] md:text-[34px] font-semibold text-on-surface mb-8" id="modal-${idLower}-title">${escapeHtml(caso.title)}</h2>
<div class="flex flex-col gap-6">
<div>
<h3 class="text-[12px] uppercase tracking-widest font-bold text-primary-container mb-2">Contexto</h3>
<p class="text-[15px] text-on-surface-variant leading-relaxed">${escapeHtml(caso.detail.contexto)}</p>
</div>
<div>
<h3 class="text-[12px] uppercase tracking-widest font-bold text-primary-container mb-2">Problema técnico</h3>
<p class="text-[15px] text-on-surface-variant leading-relaxed">${escapeHtml(caso.detail.problema)}</p>
</div>
<div>
<h3 class="text-[12px] uppercase tracking-widest font-bold text-primary-container mb-2">Solución</h3>
<p class="text-[15px] text-on-surface-variant leading-relaxed">${escapeHtml(caso.detail.solucion)}</p>
</div>
<div>
<h3 class="text-[12px] uppercase tracking-widest font-bold text-primary-container mb-2">Resultado</h3>
<p class="text-[15px] text-on-surface-variant leading-relaxed">${escapeHtml(caso.detail.resultado)}</p>
</div>
<div>
<h3 class="text-[12px] uppercase tracking-widest font-bold text-primary-container mb-2">Stack técnico</h3>
<div class="flex flex-wrap gap-2">
${renderTags(caso.tags)}
</div>
</div>
</div>
</div>
</article>
</div>`;
}

function renderCasosCards(casos) {
  return `<div class="grid grid-cols-1 md:grid-cols-12 gap-6">
${casos.map(renderCasoCard).join('\n')}
</div>`;
}

function renderCasosModals(casos) {
  return casos.map(renderCasoModal).join('\n');
}

const DOCUMENTS_PLACEHOLDER = `<div class="border border-surface-highest bg-white p-8 md:p-12 max-w-2xl shadow-sm">
<div class="inline-flex items-center gap-2 border border-surface-highest px-3 py-1 bg-surface-low w-max mb-6">
<div class="w-2 h-2 bg-primary-container animate-pulse"></div>
<span class="text-[13px] text-on-surface-variant uppercase tracking-wider font-semibold">Próximamente</span>
</div>
<p class="text-[16px] text-on-surface-variant leading-relaxed mb-8">
Esta sección reunirá papers técnicos, notas de arquitectura y documentación (PDF / Markdown) sobre interoperabilidad clínica, HL7, FHIR y ASTM.
</p>
<a class="inline-flex items-center justify-center border border-surface-highest bg-white text-on-surface text-[12px] font-semibold px-6 py-3 uppercase tracking-wider hover:bg-surface-low transition-colors gap-2" href="index.html#contact">
¿Buscas un documento específico? Contáctame
</a>
</div>`;

function renderDocumentRow(doc) {
  return `<div class="p-6 md:p-8 flex flex-col gap-2">
<div class="flex flex-wrap items-center justify-between gap-2">
<h2 class="text-[18px] font-semibold text-on-surface">${escapeHtml(doc.title)}</h2>
<span class="text-[12px] text-on-surface-variant border border-surface-highest px-2 py-1 bg-surface-low">${escapeHtml(doc.date)}</span>
</div>
<p class="text-[14px] text-on-surface-variant leading-relaxed">${escapeHtml(doc.description)}</p>
<a class="inline-flex items-center gap-1 text-[12px] text-primary-container font-bold uppercase tracking-wider hover:gap-2 transition-all mt-2 w-max" href="documents/${escapeHtml(doc.file)}" rel="noopener" target="_blank">
Ver documento
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>`;
}

function renderDocumentsSection(documents) {
  if (documents.length === 0) {
    return DOCUMENTS_PLACEHOLDER;
  }
  return `<div class="flex flex-col border border-surface-highest bg-white divide-y divide-surface-highest max-w-3xl">
${documents.map(renderDocumentRow).join('\n')}
</div>`;
}

function spliceMarked(filePath, marker, content) {
  const html = fs.readFileSync(filePath, 'utf8');
  const startTag = `<!-- ${marker}:START`;
  const endTag = `<!-- ${marker}:END -->`;
  const startIdx = html.indexOf(startTag);
  const endIdx = html.indexOf(endTag);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(`Markers for ${marker} not found in ${filePath}`);
  }
  const startLineEnd = html.indexOf('\n', startIdx) + 1;
  const before = html.slice(0, startLineEnd);
  const after = html.slice(endIdx);
  fs.writeFileSync(filePath, before + content + '\n' + after, 'utf8');
}

function main() {
  const casos = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/casos.json'), 'utf8'));
  const documents = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/documents.json'), 'utf8'));

  spliceMarked(path.join(ROOT, 'index.html'), 'CASOS_CARDS', renderCasosCards(casos));
  spliceMarked(path.join(ROOT, 'index.html'), 'CASOS_MODALS', renderCasosModals(casos));
  spliceMarked(path.join(ROOT, 'docs.html'), 'DOCUMENTS', renderDocumentsSection(documents));

  console.log(`Generated ${casos.length} casos and ${documents.length} documents.`);
}

module.exports = {
  escapeHtml,
  renderTags,
  renderCasoCard,
  renderCasoModal,
  renderCasosCards,
  renderCasosModals,
  renderDocumentRow,
  renderDocumentsSection,
  spliceMarked,
};

if (require.main === module) {
  main();
}
