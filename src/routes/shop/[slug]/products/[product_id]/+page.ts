import { client } from "$lib/api";

export async function load({ params }) {
  const { data: shop } = await client.shops["by-slug"].get({
    query: { slug: params.slug },
  });

  const { data: product } =
    await client.shops[shop.id].products[params.product_id].get();

  return {
    shop,
    product,
  };
}
