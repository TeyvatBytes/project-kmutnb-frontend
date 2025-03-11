import { client } from "$lib/api";

export async function load({ params }) {
  const shopId = params.shop_id;

  // Get shop details
  const { data: shop } = await client.api.v1.shops[shopId].get();

  return { shop };
}
