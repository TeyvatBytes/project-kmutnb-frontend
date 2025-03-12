<script>
    import { invalidateAll } from "$app/navigation";
    import { client } from "$lib/api";
    import { Button } from "$lib/components/ui/button";
    import * as Select from "$lib/components/ui/select";
    import { Input } from "$lib/components/ui/input";
    import { Modal } from "$lib/components/ui/modal";
    import {
        ArrowLeft,
        Search,
        ShoppingBag,
        Filter,
        Download,
        Eye,
        ExternalLink,
        FileText,
        Clipboard,
    } from "lucide-svelte";
    import { toast } from "svelte-sonner";

    let { data } = $props();

    // Search and filter state
    let searchQuery = $state("");
    let statusFilter = $state("ALL");
    let dateRange = $state({
        start: "",
        end: "",
    });

    // Order details modal
    let showOrderDetailsModal = $state(false);
    let currentOrder = $state(null);

    function openOrderDetails(order) {
        currentOrder = order;
        showOrderDetailsModal = true;
    }

    // Copy order data to clipboard
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("คัดลอกไปยังคลิปบอร์ดแล้ว");
        } catch (err) {
            toast.error("ไม่สามารถคัดลอกได้");
            console.error("Failed to copy: ", err);
        }
    }

    // Format number as Thai Baht
    function formatCurrency(amount) {
        return new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
            minimumFractionDigits: 2,
        }).format(amount);
    }

    // Format date for display
    function formatDate(dateString) {
        return new Date(dateString).toLocaleString("th-TH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    // Get status badge style
    function getStatusBadgeStyle(status) {
        switch (status) {
            case "SUCCESS":
                return "bg-green-100 text-green-800";
            case "PENDING":
                return "bg-yellow-100 text-yellow-800";
            case "CANCELLED":
                return "bg-red-100 text-red-800";
            case "CANCELLED_REFUND":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    }

    // Get Thai status text
    function getThaiStatus(status) {
        switch (status) {
            case "SUCCESS":
                return "สำเร็จ";
            case "PENDING":
                return "รอดำเนินการ";
            case "CANCELLED":
                return "ยกเลิก";
            case "CANCELLED_REFUND":
                return "ยกเลิกและคืนเงิน";
            default:
                return status;
        }
    }

    // Apply filters
    let filteredOrders = $derived(
        data.orders.filter((order) => {
            // Search filter
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                order.id.toString().includes(searchLower) ||
                order.product.name.toLowerCase().includes(searchLower) ||
                order.user.username.toLowerCase().includes(searchLower);

            // Status filter
            const matchesStatus =
                statusFilter === "ALL" || order.status === statusFilter;

            // Date range filter
            let matchesDateRange = true;
            if (dateRange.start) {
                const startDate = new Date(dateRange.start);
                const orderDate = new Date(order.createdAt);
                matchesDateRange = orderDate >= startDate;
            }
            if (dateRange.end) {
                const endDate = new Date(dateRange.end);
                endDate.setHours(23, 59, 59, 999); // End of day
                const orderDate = new Date(order.createdAt);
                matchesDateRange = matchesDateRange && orderDate <= endDate;
            }

            return matchesSearch && matchesStatus && matchesDateRange;
        }),
    );

    // Export orders to CSV
    function exportOrdersCSV() {
        // Create CSV content
        let csvContent =
            "เลขที่สั่งซื้อ,ชื่อผู้ซื้อ,สินค้า,จำนวน,ราคา,สถานะ,วันที่\n";

        filteredOrders.forEach((order) => {
            const row = [
                order.id,
                order.user.username,
                `"${order.product.name}"`,
                order.quantity,
                order.price,
                getThaiStatus(order.status),
                formatDate(order.createdAt),
            ].join(",");

            csvContent += row + "\n";
        });

        // Create a blob and download link
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute(
            "download",
            `orders-${data.shop.slug}-${new Date().toISOString().slice(0, 10)}.csv`,
        );
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>

<div class="flex flex-col gap-5 mt-5">
    <div class="flex items-center gap-4">
        <a
            href="/seller/shops/{data.shop.id}"
            class="hover:bg-accent transition-colors p-2 rounded-full"
        >
            <ArrowLeft size={20} />
        </a>
        <h1 class="text-2xl font-bold">คำสั่งซื้อทั้งหมด</h1>
    </div>

    <!-- Filters and search -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div class="relative">
            <Search
                size={18}
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
                type="text"
                placeholder="ค้นหาตามเลขที่สั่งซื้อ, สินค้า, ผู้ซื้อ..."
                class="pl-10"
                bind:value={searchQuery}
            />
        </div>

        <!-- Status filter -->
        <div>
            <Select.Root type="single" class="h-full" bind:value={statusFilter}>
                <Select.Trigger class="h-full">{statusFilter}</Select.Trigger>
                <Select.Content>
                    <Select.Item value="ALL">ทุกสถานะ</Select.Item>
                    <Select.Item value="SUCCESS">สำเร็จ</Select.Item>
                    <Select.Item value="PENDING">รอดำเนินการ</Select.Item>
                    <Select.Item value="CANCELLED">ยกเลิก</Select.Item>
                    <Select.Item value="CANCELLED_REFUND"
                        >ยกเลิกและคืนเงิน</Select.Item
                    >
                </Select.Content>
            </Select.Root>
        </div>

        <!-- Date range filter -->
        <div class="grid grid-cols-2 gap-2">
            <Input
                type="date"
                placeholder="จากวันที่"
                bind:value={dateRange.start}
            />
            <Input
                type="date"
                placeholder="ถึงวันที่"
                bind:value={dateRange.end}
            />
        </div>
    </div>

    <!-- Export option -->
    <div class="flex justify-between items-center">
        <p class="text-gray-500">
            แสดง {filteredOrders.length} จาก {data.orders.length} รายการ
        </p>

        {#if filteredOrders.length > 0}
            <Button
                variant="outline"
                onclick={exportOrdersCSV}
                class="flex items-center gap-2"
            >
                <Download size={16} />
                ส่งออก CSV
            </Button>
        {/if}
    </div>

    <!-- Orders table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
        {#if filteredOrders.length > 0}
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
                                >ผู้ซื้อ</th
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
                                >สถานะ</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >วันที่</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >การจัดการ</th
                            >
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        {#each filteredOrders as order}
                            <tr>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                >
                                    #{order.id}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {order.user.username}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                >
                                    {order.product.name}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {order.quantity}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {formatCurrency(order.price)}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        class={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeStyle(order.status)}`}
                                    >
                                        {getThaiStatus(order.status)}
                                    </span>
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {formatDate(order.createdAt)}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                >
                                    <button
                                        class="text-blue-600 hover:text-blue-900"
                                        onclick={() => openOrderDetails(order)}
                                        title="ดูรายละเอียด"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {:else}
            <div class="py-12 text-center">
                <ShoppingBag size={48} class="mx-auto text-gray-400 mb-3" />
                <h3 class="text-lg font-medium text-gray-900">
                    ไม่พบคำสั่งซื้อ
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                    {searchQuery ||
                    statusFilter !== "ALL" ||
                    dateRange.start ||
                    dateRange.end
                        ? "ไม่พบคำสั่งซื้อที่ตรงกับตัวกรอง กรุณาลองเปลี่ยนตัวกรอง"
                        : "ยังไม่มีคำสั่งซื้อในร้านค้านี้"}
                </p>
            </div>
        {/if}
    </div>
</div>

<!-- Order Details Modal -->
<Modal bind:open={showOrderDetailsModal} class="p-8 max-w-3xl">
    {#if currentOrder}
        <h2 class="text-2xl font-semibold mb-4">
            รายละเอียดคำสั่งซื้อ #{currentOrder.id}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Customer Details -->
            <div>
                <h3 class="text-lg font-medium mb-2">ข้อมูลลูกค้า</h3>
                <div class="bg-gray-50 p-4 rounded-md">
                    <p>
                        <span class="font-semibold">ชื่อผู้ใช้:</span>
                        {currentOrder.user.username}
                    </p>
                    <p>
                        <span class="font-semibold">ID ผู้ใช้:</span>
                        {currentOrder.user_id}
                    </p>
                </div>
            </div>

            <!-- Order Details -->
            <div>
                <h3 class="text-lg font-medium mb-2">ข้อมูลคำสั่งซื้อ</h3>
                <div class="bg-gray-50 p-4 rounded-md">
                    <p>
                        <span class="font-semibold">วันที่สั่งซื้อ:</span>
                        {formatDate(currentOrder.createdAt)}
                    </p>
                    <p>
                        <span class="font-semibold">สถานะ:</span>
                        <span
                            class={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeStyle(currentOrder.status)}`}
                        >
                            {getThaiStatus(currentOrder.status)}
                        </span>
                    </p>
                    <p>
                        <span class="font-semibold">ราคารวม:</span>
                        {formatCurrency(currentOrder.price)}
                    </p>
                </div>
            </div>
        </div>

        <!-- Product Details -->
        <h3 class="text-lg font-medium mb-2">สินค้าที่สั่งซื้อ</h3>
        <div class="bg-white border border-gray-200 rounded-md mb-6">
            <div class="grid grid-cols-3 p-4 border-b">
                <div class="col-span-2">
                    <p class="font-medium text-lg">
                        {currentOrder.product.name}
                    </p>
                    <p class="text-sm text-gray-500">
                        {currentOrder.product.description}
                    </p>
                </div>
                <div class="text-right">
                    <p class="font-semibold">
                        {formatCurrency(currentOrder.product.price)} × {currentOrder.quantity}
                    </p>
                    <p class="text-lg font-bold">
                        {formatCurrency(currentOrder.price)}
                    </p>
                </div>
            </div>
        </div>

        <!-- Order Data (Stock) -->
        <h3 class="text-lg font-medium mb-2">
            ข้อมูลสินค้า
            <button
                class="text-blue-600 hover:text-blue-900 ml-2"
                onclick={() => copyToClipboard(currentOrder.data)}
                title="คัดลอกข้อมูล"
            >
                <Clipboard size={16} />
            </button>
        </h3>
        <div class="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
            <pre
                class="font-mono text-sm whitespace-pre-wrap">{currentOrder.data}</pre>
        </div>

        <div class="flex justify-end">
            <Button onclick={() => (showOrderDetailsModal = false)}>ปิด</Button>
        </div>
    {/if}
</Modal>
