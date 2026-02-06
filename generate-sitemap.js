const fs = require("fs");
const path = require("path");
// Helper to get posts - simplified for script
// In a real scenario, we might import the lib if converted to CommonJS or use ts-node
// For now, I'll read the file system directly as the lib does.

const postsDirectory = path.join(process.cwd(), "landing-page/content/posts");
const citiesPath = path.join(process.cwd(), "landing-page/content/cities.json");

function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

function generateSiteMap() {
  const baseUrl = "https://www.miltonbolonha.com.br";
  const date = new Date().toISOString();

  const posts = getAllPostSlugs();
  const cities = JSON.parse(fs.readFileSync(citiesPath, "utf8"));

  const staticPages = [
    "",
    "/catalogo",
    "/contato",
    "/sobre",
    "/blog",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/helpers/template.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Core Pages -->
  ${staticPages
    .map((url) => {
      return `
     <url>
       <loc>${baseUrl}${url}</loc>
       <lastmod>${date}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
   `;
    })
    .join("")}

  <!-- Catalog Items -->
  ${posts
    .map(({ params }) => {
      return `
       <url>
           <loc>${baseUrl}/catalogo/${params.slug}</loc>
           <lastmod>${date}</lastmod>
           <changefreq>daily</changefreq>
           <priority>0.8</priority>
       </url>
     `;
    })
    .join("")}

  <!-- City Catalog Indexes -->
  ${cities
    .map((city) => {
      return `
       <url>
           <loc>${baseUrl}/cities/${city.id}</loc>
           <lastmod>${date}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.8</priority>
       </url>
     `;
    })
    .join("")}

  <!-- City Catalog Items -->
  ${cities
    .map((city) => {
      return posts.map(({ params }) => {
        return `
        <url>
            <loc>${baseUrl}/cities/${city.id}/${params.slug}</loc>
            <lastmod>${date}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
        </url>
      `;
      }).join("");
    })
    .join("")}
</urlset>`;

  return sitemap;
}

const sitemapXml = generateSiteMap();
// Write to landing-page/out/sitemap.xml (since it runs after build)
// Or better: write to landing-page/public/sitemap.xml BEFORE build
const publicDir = path.join(process.cwd(), "landing-page/public");
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml);
console.log(`✅ Sitemap generated at ${path.join(publicDir, "sitemap.xml")}`);
