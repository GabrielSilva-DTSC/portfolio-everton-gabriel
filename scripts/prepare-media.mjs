import sharp from 'sharp';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Preparação determinística: ver MEDIA_POLICY.md. Nenhum retoque ou filtro.
const root = fileURLToPath(new URL('../', import.meta.url));
const configPath = resolve(root, 'evidencias-privadas/media-sources.json');
const sources = JSON.parse(await readFile(configPath, 'utf8'));
const output = resolve(root, 'public/media');
await mkdir(output, { recursive: true });
const manifest = {};
const report = [];

for (const item of sources) {
  if (!/^[a-z0-9-]+$/.test(item.id) || manifest[item.id]) throw new Error(`ID inválido ou repetido: ${item.id}`);
  if (item.crop && item.kind !== 'screenshot') throw new Error(`Recorte reservado a prints: ${item.id}`);
  if (item.treatment === 'background-removed' && item.kind !== 'portrait') throw new Error(`Remoção de fundo reservada a retratos: ${item.id}`);
  const source = item.archive
    ? execFileSync('unzip', ['-p', resolve(root, item.archive), item.member], { maxBuffer: 30 * 1024 * 1024 })
    : await readFile(resolve(root, item.file));
  let pipeline = sharp(source).rotate();
  if (item.crop) pipeline = pipeline.extract(item.crop);
  const full = await pipeline.webp({ lossless: true, effort: 6 }).toBuffer({ resolveWithObject: true });
  const { width, height } = full.info;
  const original = `media/${item.id}-original.webp`;
  await writeFile(resolve(root, 'public', original), full.data);
  const widths = [...new Set([360, 720, width].filter(value => value <= width))].sort((a, b) => a - b);
  const variants = [];
  let totalBytes = 0;
  for (const size of widths) {
    const file = `${item.id}-${size}.webp`;
    const buffer = await sharp(full.data).resize({ width: size, withoutEnlargement: true }).webp({ quality: 88, alphaQuality: 100, effort: 6 }).toBuffer();
    await writeFile(resolve(output, file), buffer);
    totalBytes += buffer.length;
    variants.push({ src: `media/${file}`, width: size });
  }
  manifest[item.id] = { width, height, kind: item.kind, treatment: item.treatment ?? 'original', original, src: variants.at(-1).src, variants };
  report.push({ ...item, sha256: createHash('sha256').update(source).digest('hex'), width, height, totalBytes });
  console.log(`${item.id}: ${width} × ${height}, ${variants.length} versões, ${Math.round(totalBytes / 1024)} KB`);
}

await writeFile(resolve(output, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(resolve(root, 'evidencias-privadas/media-import-report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(`${report.length} imagens preparadas. Originais preservados.`);
