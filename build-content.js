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

module.exports = {
  escapeHtml,
  renderTags,
  spliceMarked,
};
