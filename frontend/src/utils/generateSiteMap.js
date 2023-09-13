const fs = require('fs');

const prettier = require('prettier');

const SitemapGeneratedDate = new Date().toISOString();
const DOMAIN = 'https://votogether.com';

const formatting = target => prettier.format(target, { parser: 'html' });

const pages = ['/', '/login', '/ranking'].map(page => DOMAIN + page);

const pageSitemap = pages
  .map(
    page => `
      <url>
        <loc>${page}</loc>
        <lastmod>${SitemapGeneratedDate}</lastmod>
      </url>
    `
  )
  .join('');

const generateSiteMap = `
      <?xml version="1.0" encoding="UTF-8"?>
        <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
          ${pageSitemap}
        </urlset>`;

const formattedSitemap = formatting(generateSiteMap);

fs.writeFileSync('../../public/seo/sitemap.xml', formattedSitemap, 'utf8');
