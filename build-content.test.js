'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { escapeHtml, renderTags, spliceMarked } = require('./build-content');

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
