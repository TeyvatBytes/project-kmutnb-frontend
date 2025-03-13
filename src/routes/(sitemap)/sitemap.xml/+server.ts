let current_time = new Date().toISOString();
/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>

<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <sitemap>
      <loc>https://sellvat.com/shops-sitemap.xml</loc>
      <lastmod>${current_time}</lastmod>
   </sitemap>
</sitemapindex>`,
    {
      headers: {
        "Content-Type": "text/xml; charset=UTF-8",
      },
    },
  );
}

// <sitemap>
// <loc>https://sellvat.com/products-sitemap.xml</loc>
// <lastmod>${current_time}</lastmod>
// </sitemap>
