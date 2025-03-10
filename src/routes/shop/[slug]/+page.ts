import { client } from "$lib/api";

export async function load({ params }) {
  const { data: shop, error } = await client.api.v1.shops["by-slug"].get({
    query: { slug: params.slug },
  });

  return {
    shop,
  };
}
