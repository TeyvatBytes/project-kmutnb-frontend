import { client } from "$lib/api";

const generateProductsSitemap = async () => {
  const { data } = await client.api.v1.products.get();
  return data
    .map(
      (product) => `<url>
 <loc>https://sellvat.com/shop/${product.slug}</loc>
 <lastmod>${product.updatedAt}</lastmod>
 <image:image>
     <image:loc>${product.image}</image:loc>
 </image:image>
 </url>`,
    )
    .join("");
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  return new Response(
    `<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${await generateProductsSitemap()}
</urlset>`,
    {
      headers: {
        "Content-Type": "text/xml; charset=UTF-8",
      },
    },
  );
}
