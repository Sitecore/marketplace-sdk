const path = require('path');

const packages = ['core', 'client', 'xmc', 'ai'];
let failed = 0;

for (const name of packages) {
  const dir = path.resolve(__dirname, '..', 'packages', name);
  const label = `@sitecore-marketplace-sdk/${name}`;
  let resolved = '';
  try {
    resolved = require.resolve(dir);
  } catch (error) {
    failed += 1;
    console.log('FAIL require', label);
    console.log(' ', error.message.split('\n')[0]);
    continue;
  }

  try {
    const loaded = require(dir);
    const keys = Object.keys(loaded);
    console.log('PASS require', label);
    console.log(' ', resolved);
    console.log(' ', keys.slice(0, 6).join(', ') || '(no keys)');
  } catch (error) {
    failed += 1;
    console.log('FAIL require', label);
    console.log(' ', resolved);
    console.log(' ', error.message.split('\n')[0]);
  }
}

process.exit(failed === 0 ? 0 : 1);
