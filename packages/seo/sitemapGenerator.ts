import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://zazatechnologies.com';
const APPS_DIR = path.join(process.cwd(), 'apps');

export function generateSitemap() {
  const appFolders = fs.readdirSync(APPS_DIR).filter(f => fs.statSync(path.join(APPS_DIR, f)).isDirectory());
  let urls: string[] = [];
  appFolders.forEach(app => {
    const appPath = path.join(APPS_DIR, app, 'app');
    if (fs.existsSync(appPath)) {
      const files = fs.readdirSync(appPath);
      files.forEach(file => {
        if (file.endsWith('.tsx') && file !== 'layout.tsx' && file !== 'globals.css') {
          const route = file === 'page.tsx' ? '' : `/${file.replace('.tsx', '')}`;
          urls.push(`${DOMAIN}/${app}${route}`);
        }
      });
    }
  });
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `<url><loc>${url}</loc></url>`).join('\n')}\n</urlset>`;
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  return sitemap;
} 