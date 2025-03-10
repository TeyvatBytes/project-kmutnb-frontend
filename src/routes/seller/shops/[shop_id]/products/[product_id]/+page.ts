import { client } from "$lib/api";

export async function load({ params }) {
  const shopId = params.shop_id;
  const productId = params.product_id;

  // Get shop details
  const { data: shop } = await client.api.v1.shops[shopId].get();

  // Get product details
  const { data: product } =
    await client.api.v1.shops[shopId].products[productId].get();

  // Get product stock data
  const { data: stockData } =
    await client.api.v1.shops[shopId].products[productId].stock.get();

  return {
    shop,
    product,
    stockData,
  };
}
