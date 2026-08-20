import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');

const ALLOWED_PATTERNS = ['vortex', 'grid', 'waves', 'facets', 'rings', 'hex'];

test('index.html is a complete document, not truncated', () => {
  assert.ok(html.startsWith('<!DOCTYPE html>'));
  assert.ok(html.includes('The Obsidian Archive'));
  assert.ok(html.length > 100_000);
});

test('relative favicon for GitHub project Pages', () => {
  assert.match(html, /<link rel="icon" href="favicon.svg"/);
  assert.doesNotMatch(html, /href="\/favicon\.svg"/);
});

test('CSP and referrer meta are present', () => {
  assert.match(html, /http-equiv="Content-Security-Policy"/);
  assert.match(html, /name="referrer" content="strict-origin-when-cross-origin"/);
  assert.match(html, /form-action 'none'/);
});

test('no eval, document.write, or network clients', () => {
  assert.equal(html.includes('eval('), false);
  assert.equal(html.includes('document.write'), false);
  assert.equal(html.includes('fetch('), false);
  assert.equal(html.includes('XMLHttpRequest'), false);
});

test('no secrets or env files referenced', () => {
  assert.doesNotMatch(html, /sk-[a-zA-Z0-9]{10,}/);
  assert.doesNotMatch(html, /api[_-]?key\s*[:=]/i);
  assert.doesNotMatch(html, /BEGIN PRIVATE KEY/);
});

test('CDN scripts are pinned and have SRI', () => {
  for (const pin of [
    'react@18.3.1/umd/react.production.min.js',
    'react-dom@18.3.1/umd/react-dom.production.min.js',
    'lenis@1.1.18/dist/lenis.min.js',
    'three@0.160.0/build/three.min.js',
  ]) {
    assert.ok(html.includes(pin), `missing pin ${pin}`);
  }
  assert.equal((html.match(/integrity="sha384-/g) || []).length, 4);
  assert.doesNotMatch(html, /unpkg\.com\/react@18\//);
});

test('contact is mailto only', () => {
  assert.match(html, /mailto:studio@obsidianarchive\.art/);
  assert.doesNotMatch(html, /<form[\s>]/i);
});

test('theme persistence key is closed', () => {
  assert.match(html, /localStorage\.getItem\('obsidian-theme'\)/);
  assert.match(html, /localStorage\.setItem\('obsidian-theme'/);
});

test('portfolio pattern types stay on the allow-list', () => {
  const types = [...html.matchAll(/patternType:\s*'([a-z]+)'/g)].map((m) => m[1]);
  assert.ok(types.length >= 6);
  for (const t of types) {
    assert.ok(ALLOWED_PATTERNS.includes(t), `unexpected patternType ${t}`);
  }
});
