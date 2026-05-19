import fs from 'fs';
import path from 'path';

const sitemapPath = path.resolve('public/sitemap.xml');
let content = fs.readFileSync(sitemapPath, 'utf8');

// Regex to find all <loc>...</loc> tags
const locRegex = /<loc>(https:\/\/www\.olipl\.com\/[^<]+)<\/loc>/g;

content = content.replace(locRegex, (match, url) => {
  // If URL already ends with a slash, leave it
  if (url.endsWith('/')) {
    return match;
  }
  // Otherwise, append the trailing slash
  return `<loc>${url}/</loc>`;
});

fs.writeFileSync(sitemapPath, content, 'utf8');
console.log('Sitemap successfully updated with trailing slashes!');
