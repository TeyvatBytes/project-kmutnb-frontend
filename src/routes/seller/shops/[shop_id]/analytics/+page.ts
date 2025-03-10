import { client } from "$lib/api";

export async function load({ params }) {
  const shopId = params.shop_id;

  // Get shop details
  const { data: shop } = await client.api.v1.shops[shopId].get();

  // In a real implementation, you would fetch analytics data from your backend
  // This is mock data for demonstration purposes

  // Mock analytics data
  const analytics = {
    week: {
      sales: 12500,
      salesChange: 8.3,
      orders: 42,
      ordersChange: 5.7,
      customers: 38,
      customersChange: 3.2,
      averageOrder: 297.62,
      averageOrderChange: 2.1,
      dailySales: {
        labels: ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"],
        values: [1200, 1800, 1400, 2100, 2500, 1800, 1700],
      },
    },
    month: {
      sales: 48000,
      salesChange: 12.5,
      orders: 185,
      ordersChange: 9.2,
      customers: 142,
      customersChange: 7.8,
      averageOrder: 259.46,
      averageOrderChange: 3.1,
      dailySales: {
        labels: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
        ],
        values: [
          1500, 1200, 1800, 1600, 2000, 1900, 1400, 1300, 1700, 2100, 2300,
          1800, 1600, 1400, 1900, 2200, 1700, 1500, 1800, 2000, 1600, 1700,
          1900, 2100, 1800, 1500, 1300, 1600, 1700, 1500,
        ],
      },
    },
    year: {
      sales: 580000,
      salesChange: 22.8,
      orders: 2140,
      ordersChange: 18.3,
      customers: 950,
      customersChange: 15.2,
      averageOrder: 271.03,
      averageOrderChange: 4.2,
      monthlySales: {
        labels: [
          "ม.ค.",
          "ก.พ.",
          "มี.ค.",
          "เม.ย.",
          "พ.ค.",
          "มิ.ย.",
          "ก.ค.",
          "ส.ค.",
          "ก.ย.",
          "ต.ค.",
          "พ.ย.",
          "ธ.ค.",
        ],
        values: [
          42000, 38000, 45000, 40000, 52000, 48000, 50000, 55000, 48000, 52000,
          58000, 52000,
        ],
      },
    },
  };

  // Mock top products
  const topProducts = [
    { name: "โรบัค 1000", sold: 42, revenue: 42000 },
    { name: "โรบัค 400", sold: 35, revenue: 14000 },
    { name: "โรบัค 10000", sold: 12, revenue: 120000 },
    { name: "โรบัค 800", sold: 28, revenue: 22400 },
    { name: "บัตร STEAM", sold: 15, revenue: 7500 },
  ];

  // Mock latest order
  const latestOrder = {
    id: 5421,
    productName: "โรบัค 1000",
    price: 1000,
    date: new Date().toISOString(),
  };

  // Mock latest sold product
  const latestSoldProduct = {
    name: "บัตร STEAM",
    quantity: 2,
    date: new Date().toISOString(),
  };

  // Mock best sales day
  const bestDay = {
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    revenue: 8500,
    orders: 12,
  };

  return {
    shop,
    analytics,
    topProducts,
    latestOrder,
    latestSoldProduct,
    bestDay,
  };
}
