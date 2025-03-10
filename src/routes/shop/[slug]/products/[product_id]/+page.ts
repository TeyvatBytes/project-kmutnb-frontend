import { client } from "$lib/api";

export async function load({ params }) {
  const { data: shop } = await client.api.v1.shops["by-slug"].get({
    query: { slug: params.slug },
  });

  const { data: product } =
    await client.api.v1.shops[shop.id].products[params.product_id].get();

  return {
    shop,
    product,
  };
}
