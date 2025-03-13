import { client } from "$lib/api";

export async function load({ params }) {
  // const shopId = params.shop_id;
  let orders = [];
  try {
    // This is a placeholder for a future API endpoint
    // You would need to add this endpoint to your order.ts file
    const { data: myOrders } = await client.api.v1.users["@me"].orders.get();
    if (myOrders) orders = myOrders;
  } catch (error) {
    console.error("Failed to fetch shop orders:", error);
  }

  console.log({
    orders,
  });
  return {
    orders,
  };
}
