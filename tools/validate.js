// Usage: node tools/validate.js   (checks every table loads and every reference resolves)
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(f => f.startsWith('js/db') || f.startsWith('data/'));
const ctx = vm.createContext({ console });
vm.runInContext('var window=globalThis;', ctx);
files.forEach(f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f }));
const r = vm.runInContext(`({e:DB.validate(),places:DB.all('places').length,stops:DB.all('journey').length,peoples:DB.all('peoples').length,countries:DB.countries().length})`, ctx);
console.log(`${r.places} places, ${r.stops} journey stops, ${r.peoples} peoples in ${r.countries} countries`);
if (r.e.length) { console.log('PROBLEMS:\n - ' + r.e.join('\n - ')); process.exit(1); } else console.log('Database OK');
