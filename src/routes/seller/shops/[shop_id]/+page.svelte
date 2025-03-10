<script>
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import {
        ArrowLeft,
        Package,
        ShoppingBag,
        DollarSign,
        Users,
        Tag,
        TrendingUp,
        Settings,
        Link,
    } from "lucide-svelte";

    let { data } = $props();

    // Format number as Thai Baht
    function formatCurrency(amount) {
        return new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
            minimumFractionDigits: 2,
        }).format(amount);
    }
</script>

<div class="flex flex-col gap-5 mt-5">
    <div class="flex items-center gap-4">
        <a href="/seller/shops" class="hover:bg-gray-100 p-2 rounded-full">
            <ArrowLeft size={20} />
        </a>
        <h1 class="text-2xl font-bold">{data.shop.name}</h1>
    </div>

    <div class="bg-white rounded-lg shadow p-6 flex items-center gap-4">
        <Link class="size-10" />
        <Label class="w-full">ลิ้งร้านของคุณ</Label>
        <Input value="sellvat.com/shop/{data.shop.slug}/" />
    </div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-lg shadow p-6 flex items-center gap-4">
            <div class="rounded-full bg-green-100 p-3">
                <DollarSign class="text-green-600" size={24} />
            </div>
            <div>
                <p class="text-sm text-gray-500">ยอดขายทั้งหมด</p>
                <p class="font-bold text-xl">
                    {formatCurrency(data.shop.balance)}
                </p>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 flex items-center gap-4">
            <div class="rounded-full bg-blue-100 p-3">
                <ShoppingBag class="text-blue-600" size={24} />
            </div>
            <div>
                <p class="text-sm text-gray-500">คำสั่งซื้อทั้งหมด</p>
                <p class="font-bold text-xl">{data.shop._count.orders}</p>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 flex items-center gap-4">
            <div class="rounded-full bg-purple-100 p-3">
                <Package class="text-purple-600" size={24} />
            </div>
            <div>
                <p class="text-sm text-gray-500">สินค้าทั้งหมด</p>
                <p class="font-bold text-xl">{data.shop._count.products}</p>
            </div>
        </div>
    </div>

    <!-- Navigation Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <a
            href="/seller/shops/{data.shop.id}/products"
            class="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition-colors"
        >
            <Tag size={24} class="mb-3 text-gray-700" />
            <h3 class="font-semibold">จัดการสินค้า</h3>
            <p class="text-sm text-gray-500 mt-1">เพิ่ม/แก้ไขสินค้าและสต็อก</p>
        </a>

        <a
            href="/seller/shops/{data.shop.id}/orders"
            class="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition-colors"
        >
            <ShoppingBag size={24} class="mb-3 text-gray-700" />
            <h3 class="font-semibold">คำสั่งซื้อ</h3>
            <p class="text-sm text-gray-500 mt-1">จัดการคำสั่งซื้อทั้งหมด</p>
        </a>

        <a
            href="/seller/shops/{data.shop.id}/analytics"
            class="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition-colors"
        >
            <TrendingUp size={24} class="mb-3 text-gray-700" />
            <h3 class="font-semibold">วิเคราะห์</h3>
            <p class="text-sm text-gray-500 mt-1">สถิติและรายงานยอดขาย</p>
        </a>

        <a
            href="/seller/shops/{data.shop.id}/settings"
            class="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition-colors"
        >
            <Settings size={24} class="mb-3 text-gray-700" />
            <h3 class="font-semibold">ตั้งค่าร้านค้า</h3>
            <p class="text-sm text-gray-500 mt-1">แก้ไขข้อมูลร้านค้า</p>
        </a>
    </div>

    <!-- Recent Orders -->
    <div class="bg-white rounded-lg shadow p-6 mt-4">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">คำสั่งซื้อล่าสุด</h2>
            <a
                href="/seller/shops/{data.shop.id}/orders"
                class="text-blue-600 text-sm hover:underline">ดูทั้งหมด</a
            >
        </div>

        {#if data.recentOrders && data.recentOrders.length > 0}
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >เลขที่สั่งซื้อ</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >สินค้า</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >จำนวน</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >ราคา</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >วันที่</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >สถานะ</th
                            >
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        {#each data.recentOrders as order}
                            <tr>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >#{order.id}</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                    >{order.product.name}</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >{order.quantity}</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >{formatCurrency(order.price)}</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {new Date(
                                        order.createdAt,
                                    ).toLocaleDateString("th-TH")}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                        {order.status === 'SUCCESS'
                                            ? 'bg-green-100 text-green-800'
                                            : order.status === 'PENDING'
                                              ? 'bg-yellow-100 text-yellow-800'
                                              : 'bg-red-100 text-red-800'}"
                                    >
                                        {order.status === "SUCCESS"
                                            ? "สำเร็จ"
                                            : order.status === "PENDING"
                                              ? "รอดำเนินการ"
                                              : order.status === "CANCELLED"
                                                ? "ยกเลิก"
                                                : "ยกเลิกและคืนเงิน"}
                                    </span>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {:else}
            <p class="text-gray-500 text-center py-4">ยังไม่มีคำสั่งซื้อ</p>
        {/if}
    </div>
</div>
