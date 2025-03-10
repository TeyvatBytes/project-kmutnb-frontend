import { client } from "$lib/api";

export async function load({ params }) {
  const shopId = params.shop_id;

  // Get shop details
  const { data: shop } = await client.api.v1.shops[shopId].get();

  // NOTE: You'll need to add a new endpoint in your backend to get shop orders
  // For now we'll make a placeholder for how it would work

  let orders = [];
  try {
    // This is a placeholder for a future API endpoint
    // You would need to add this endpoint to your order.ts file
    const { data: shopOrders } = await client.api.v1.shops[shopId].orders.get();
    orders = shopOrders;
  } catch (error) {
    console.error("Failed to fetch shop orders:", error);
    // If the endpoint doesn't exist yet, we'll use a workaround
    // You can implement this endpoint on the backend or adjust this code later
  }

  console.log({
    shop,
    orders,
  });
  return {
    shop,
    orders,
  };
}
