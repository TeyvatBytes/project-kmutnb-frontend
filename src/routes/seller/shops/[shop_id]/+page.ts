import { client } from "$lib/api";

export async function load({ params }) {
  const shopId = params.shop_id;

  // Get shop details
  const { data: shop } = await client.api.v1.shops[shopId].get();

  // Get recent orders for this shop (we'll need to add this endpoint to the backend)
  let recentOrders = [];
  try {
    // This is a placeholder for a future API endpoint
    // You would need to add this endpoint to your order.ts file
    const { data: orders } = await client.api.v1.shops[shopId].orders.get({
      limit: 5, // Get only 5 most recent orders
    });
    recentOrders = orders;
  } catch (error) {
    console.error("Failed to fetch recent orders:", error);
    // If the endpoint doesn't exist yet, we'll just have an empty array
  }

  console.log({
    shopId,
    shop,
    recentOrders,
  });

  return {
    shop,
    recentOrders,
  };
}
