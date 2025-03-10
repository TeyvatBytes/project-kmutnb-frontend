import { client } from "$lib/api";

export async function load({ params }) {
  const { data: shops } = await client.api.v1.users["@me"].shops.get();

  return {
    shops,
  };
}
