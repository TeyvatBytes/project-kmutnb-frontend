import { client } from "$lib/api";

export async function load({ params }) {
  const { data: shop } = await client.api.v1.shops[params.shop_id].get();

  return {
    shop,
  };
}
