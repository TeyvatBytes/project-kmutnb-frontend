import { client } from "$lib/api";

const generateShopsSitemap = async () => {
  const { data } = await client.api.v1.shops.get();
  return data
    .map(
      (shop) => `<url>
 <loc>https://sellvat.com/shop/${shop.slug}</loc>
 <lastmod>${shop.updatedAt}</lastmod>
 <image:image>
     <image:loc>${shop.logo}</image:loc>
 </image:image>
 </url>`,
    )
    .join("");
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  return new Response(
    `<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${await generateShopsSitemap()}
</urlset>`,
    {
      headers: {
        "Content-Type": "text/xml; charset=UTF-8",
      },
    },
  );
}
