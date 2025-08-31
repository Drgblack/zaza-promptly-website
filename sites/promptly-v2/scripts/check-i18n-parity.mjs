import fs from 'node:fs';
import path from 'node:path';

const localesDir = path.join(process.cwd(), 'src/messages'); // adjust if different
const a = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'),'utf8'));
const b = JSON.parse(fs.readFileSync(path.join(localesDir, 'de.json'),'utf8'));

function flat(obj, pfx = '', out = {}) {
  Object.entries(obj).forEach(([k,v]) => {
    const key = pfx ? `${pfx}.${k}` : k;
    if (v && typeof v === 'object') flat(v, key, out);
    else out[key] = true;
  });
  return out;
}

const A = Object.keys(flat(a));
const B = Object.keys(flat(b));
const missingInDe = A.filter(k => !B.includes(k));
const extraInDe = B.filter(k => !A.includes(k));
if (missingInDe.length || extraInDe.length) {
  console.error('Missing in de:', missingInDe);
  console.error('Extra in de:', extraInDe);
  process.exit(1);
}
console.log('EN and DE translation keys are in parity.');