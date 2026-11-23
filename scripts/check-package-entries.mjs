import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const packages = ['core', 'client', 'xmc', 'ai'];
let failed = 0;

for (const name of packages) {
  const dir = path.resolve(import.meta.dirname, '..', 'packages', name);
  const label = `@sitecore-marketplace-sdk/${name}`;
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
  const specifier = manifest.exports['.'].import;
  const file = path.resolve(dir, specifier);

  try {
    const loaded = await import(pathToFileURL(file).href);
    const keys = Object.keys(loaded);
    console.log('PASS import', label);
    console.log(' ', file);
    console.log(' ', keys.slice(0, 6).join(', ') || '(no keys)');
  } catch (error) {
    failed += 1;
    console.log('FAIL import', label);
    console.log(' ', file);
    console.log(' ', error.message.split('\n')[0]);
  }
}

process.exit(failed === 0 ? 0 : 1);
