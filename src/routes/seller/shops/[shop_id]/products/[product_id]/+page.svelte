<script>
    import { invalidateAll } from "$app/navigation";
    import { client } from "$lib/api";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Modal } from "$lib/components/ui/modal";
    import { Textarea } from "$lib/components/ui/textarea";
    import {
        ArrowLeft,
        Plus,
        Package,
        Tag,
        Clipboard,
        Upload,
        Trash2,
        AlertTriangle,
        Info,
        Check,
    } from "lucide-svelte";
    import { toast } from "svelte-sonner";

    let { data } = $props();

    // Stock management state
    let loading = $state(false);
    let showAddStockModal = $state(false);

    // Stock entries (text area with one entry per line)
    let stockEntries = $state("");

    // Array from textarea
    let stockLines = $derived(
        stockEntries.split("\n").filter((line) => line.trim() !== ""),
    );

    // For multiple items deletion
    let selectedStocks = $state([]);
    let selectAll = $state(false);

    // Copy stock data to clipboard
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("คัดลอกไปยังคลิปบอร์ดแล้ว");
        } catch (err) {
            toast.error("ไม่สามารถคัดลอกได้");
            console.error("Failed to copy: ", err);
        }
    }

    // Add stock items
    async function handleAddStock() {
        if (stockLines.length === 0) {
            toast.error("กรุณาเพิ่มข้อมูลสต็อกอย่างน้อย 1 รายการ");
            return;
        }

        loading = true;
        try {
            const { data: result } = await client.api.v1.shops[
                data.shop.id
            ].products[data.product.id].stock.post({
                stocks: stockLines,
            });

            toast.success(`เพิ่มสต็อกสำเร็จ ${result.count} รายการ`);
            stockEntries = "";
            showAddStockModal = false;
            await invalidateAll();
        } catch (error) {
            console.error(error);
            toast.error("เกิดข้อผิดพลาดในการเพิ่มสต็อก");
        } finally {
            loading = false;
        }
    }

    // Toggle all selections
    function handleToggleSelectAll() {
        if (selectAll) {
            selectedStocks = data.stockData.stocks.map((stock) => stock.id);
        } else {
            selectedStocks = [];
        }
    }

    // Toggle selection for a single stock item
    function handleToggleSelect(stockId) {
        if (selectedStocks.includes(stockId)) {
            selectedStocks = selectedStocks.filter((id) => id !== stockId);
        } else {
            selectedStocks = [...selectedStocks, stockId];
        }
    }

    // Delete selected stock items
    let showDeleteSelectedModal = $state(false);

    async function handleDeleteSelected() {
        if (selectedStocks.length === 0) return;

        loading = true;
        try {
            // This endpoint would need to be added to your backend
            const { data: result } = await client.api.v1.shops[
                data.shop.id
            ].products[data.product.id].stock.bulk_delete.post({
                stockIds: selectedStocks,
            });

            toast.success(`ลบสต็อกสำเร็จ ${selectedStocks.length} รายการ`);
            selectedStocks = [];
            selectAll = false;
            showDeleteSelectedModal = false;
            await invalidateAll();
        } catch (error) {
            console.error(error);
            toast.error("เกิดข้อผิดพลาดในการลบสต็อก");
        } finally {
            loading = false;
        }
    }

    // Stock import/export
    function exportStocks() {
        const stockData = data.stockData.stocks
            .map((stock) => stock.data)
            .join("\n");
        copyToClipboard(stockData);
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
</script>

<div class="flex flex-col gap-5 mt-5">
    <div class="flex items-center gap-4">
        <a
            href="/seller/shops/{data.shop.id}/products"
            class="hover:bg-gray-100 p-2 rounded-full"
        >
            <ArrowLeft size={20} />
        </a>
        <h1 class="text-2xl font-bold">จัดการสต็อก {data.product.name}</h1>
    </div>

    <!-- Product info card -->
    <div
        class="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
    >
        <div class="md:col-span-1">
            {#if data.product.image}
                <img
                    src={data.product.image}
                    alt={data.product.name}
                    class="w-full h-48 object-cover rounded-lg"
                />
            {:else}
                <div
                    class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center"
                >
                    <Package size={64} class="text-gray-400" />
                </div>
            {/if}
        </div>

        <div class="md:col-span-2">
            <h2 class="text-2xl font-bold">{data.product.name}</h2>
            <p class="text-gray-500 mt-2">{data.product.description}</p>

            <div class="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <p class="text-sm text-gray-500">ราคา</p>
                    <p class="font-semibold text-lg">
                        {new Intl.NumberFormat("th-TH", {
                            style: "currency",
                            currency: "THB",
                        }).format(data.product.price)}
                    </p>
                </div>

                <div>
                    <p class="text-sm text-gray-500">หมวดหมู่</p>
                    <p class="font-semibold">
                        {#if data.product.category}
                            <span
                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                                <Tag size={12} class="mr-1" />
                                {data.product.category}
                            </span>
                        {:else}
                            <span class="text-gray-400">ไม่มีหมวดหมู่</span>
                        {/if}
                    </p>
                </div>

                <div>
                    <p class="text-sm text-gray-500">จำนวนที่ขายแล้ว</p>
                    <p class="font-semibold">
                        {data.product._count?.order || 0} รายการ
                    </p>
                </div>

                <div>
                    <p class="text-sm text-gray-500">สต็อกที่เหลือ</p>
                    <p class="font-semibold">
                        {data.stockData.stockCount} ชิ้น
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Stock management actions -->
    <div class="flex flex-wrap justify-between items-center gap-4">
        <div class="text-lg font-semibold">
            สต็อกทั้งหมด: {data.stockData.stockCount} รายการ
        </div>

        <div class="flex flex-wrap gap-2">
            {#if data.stockData.stocks.length > 0}
                <Button
                    variant="outline"
                    on:click={exportStocks}
                    class="flex items-center gap-2"
                >
                    <Clipboard size={16} />
                    ส่งออกสต็อกทั้งหมด
                </Button>
            {/if}

            <Button
                on:click={() => (showAddStockModal = true)}
                class="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
                <Plus size={16} />
                เพิ่มสต็อก
            </Button>

            {#if selectedStocks.length > 0}
                <Button
                    variant="destructive"
                    on:click={() => (showDeleteSelectedModal = true)}
                    class="flex items-center gap-2"
                >
                    <Trash2 size={16} />
                    ลบสต็อกที่เลือก ({selectedStocks.length})
                </Button>
            {/if}
        </div>
    </div>

    <!-- Stock table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
        {#if data.stockData.stocks.length > 0}
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left">
                                <div class="flex items-center">
                                    <input
                                        type="checkbox"
                                        bind:checked={selectAll}
                                        on:change={handleToggleSelectAll}
                                        class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </div>
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >รหัสสต็อก</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >ข้อมูลสินค้า</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >สร้างเมื่อ</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >การจัดการ</th
                            >
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        {#each data.stockData.stocks as stock}
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedStocks.includes(
                                                stock.id,
                                            )}
                                            on:change={() =>
                                                handleToggleSelect(stock.id)}
                                            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </div>
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    #{stock.id}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <div
                                        class="font-mono text-gray-600 bg-gray-50 p-2 rounded max-w-md overflow-x-auto"
                                    >
                                        {stock.data}
                                    </div>
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {formatDate(stock.createdAt)}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <button
                                        class="text-blue-600 hover:text-blue-900 mr-3"
                                        on:click={() =>
                                            copyToClipboard(stock.data)}
                                        title="คัดลอกข้อมูล"
                                    >
                                        <Clipboard size={18} />
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {:else}
            <div class="py-12 text-center">
                <Package size={48} class="mx-auto text-gray-400 mb-3" />
                <h3 class="text-lg font-medium text-gray-900">
                    ไม่มีสต็อกสินค้า
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                    กดปุ่ม "เพิ่มสต็อก" เพื่อเพิ่มสต็อกใหม่
                </p>
            </div>
        {/if}
    </div>
</div>

<!-- Add Stock Modal -->
<Modal bind:open={showAddStockModal} {loading} class="p-8 max-w-2xl">
    <div class="flex place-items-center sm:pt-4">
        <h2 class="text-2xl font-semibold">เพิ่มสต็อกสินค้า</h2>
    </div>

    <div class="flex flex-col gap-4 mt-4">
        <div
            class="p-4 bg-blue-50 text-blue-800 rounded-md flex items-start gap-3"
        >
            <Info class="flex-shrink-0 mt-0.5" size={18} />
            <div>
                <p class="font-medium">คำแนะนำการเพิ่มสต็อก</p>
                <p class="text-sm mt-1">
                    แต่ละบรรทัดจะถูกเพิ่มเป็นสต็อก 1 รายการ
                    ควรเป็นข้อมูลที่ลูกค้าสามารถใช้งานได้ เช่น รหัสสินค้า,
                    รหัสเติมเงิน, ข้อมูลบัญชี เป็นต้น
                </p>
            </div>
        </div>

        <div class="flex flex-col gap-2">
            <Label>ข้อมูลสต็อก (แต่ละบรรทัด = 1 สต็อก)</Label>
            <Textarea
                placeholder="รหัสสินค้า 1&#10;รหัสสินค้า 2&#10;รหัสสินค้า 3&#10;..."
                bind:value={stockEntries}
                rows={10}
                class="font-mono"
            />
            <p class="text-sm text-gray-500">
                {stockLines.length} รายการที่จะเพิ่ม
            </p>
        </div>

        <div class="flex justify-end gap-2 mt-4">
            <Button
                variant="outline"
                on:click={() => (showAddStockModal = false)}
            >
                ยกเลิก
            </Button>
            <Button
                on:click={handleAddStock}
                class="bg-blue-600 hover:bg-blue-700"
                disabled={stockLines.length === 0}
            >
                เพิ่มสต็อก {stockLines.length > 0
                    ? `(${stockLines.length} รายการ)`
                    : ""}
            </Button>
        </div>
    </div>
</Modal>

<!-- Delete Selected Confirmation Modal -->
<Modal bind:open={showDeleteSelectedModal} {loading} class="p-8 max-w-md">
    <div class="flex flex-col items-center text-center gap-4">
        <div class="rounded-full bg-red-100 p-3 mb-2">
            <AlertTriangle size={24} class="text-red-600" />
        </div>
        <h2 class="text-xl font-semibold">ยืนยันการลบสต็อก</h2>
        <p class="text-gray-500">
            คุณแน่ใจหรือไม่ว่าต้องการลบสต็อกที่เลือก {selectedStocks.length} รายการ?
            การดำเนินการนี้ไม่สามารถยกเลิกได้
        </p>

        <div class="flex justify-center gap-3 w-full mt-4">
            <Button
                variant="outline"
                on:click={() => (showDeleteSelectedModal = false)}
                class="flex-1"
            >
                ยกเลิก
            </Button>
            <Button
                on:click={handleDeleteSelected}
                class="bg-red-600 hover:bg-red-700 flex-1"
            >
                ลบสต็อก
            </Button>
        </div>
    </div>
</Modal>
