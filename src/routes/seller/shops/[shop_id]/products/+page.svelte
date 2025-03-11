<script>
    import { invalidateAll } from "$app/navigation";
    import { client } from "$lib/api";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Modal } from "$lib/components/ui/modal";
    import {
        ArrowLeft,
        Plus,
        Search,
        Edit,
        Trash2,
        Package,
        AlertTriangle,
    } from "lucide-svelte";
    import { toast } from "svelte-sonner";

    let { data } = $props();

    // Product creation/edit state
    let loading = $state(false);
    let showProductModal = $state(false);
    let isEditing = $state(false);
    let currentProductId = $state(null);

    // Product form fields
    let name = $state("");
    let description = $state("");
    let price = $state(0);
    let category = $state("");
    let image = $state("");

    // Search filter
    let searchQuery = $state("");

    // Reset form
    function resetForm() {
        name = "";
        description = "";
        price = 0;
        category = "";
        image = "";
        currentProductId = null;
        isEditing = false;
    }

    // Open modal for creating new product
    function openCreateModal() {
        resetForm();
        showProductModal = true;
    }

    // Open modal for editing product
    function openEditModal(product) {
        name = product.name;
        description = product.description;
        price = product.price;
        category = product.category || "";
        image = product.image || "";
        currentProductId = product.id;
        isEditing = true;
        showProductModal = true;
    }

    // Create or update product
    async function handleSaveProduct() {
        loading = true;
        try {
            if (isEditing) {
                // Update existing product
                const { data: updatedProduct } = await client.api.v1.shops[
                    data.shop.id
                ].products[currentProductId].put({
                    name,
                    description,
                    price: parseFloat(price),
                    category,
                    image,
                });
                toast.success("อัปเดตสินค้าสำเร็จ");
            } else {
                // Create new product
                const { data: newProduct } = await client.api.v1.shops[
                    data.shop.id
                ].products.post({
                    name,
                    description,
                    price: parseFloat(price),
                    category,
                    image,
                });
                toast.success("เพิ่มสินค้าสำเร็จ");
            }
            await invalidateAll();
            showProductModal = false;
        } catch (error) {
            console.error(error);
            toast.error(
                isEditing
                    ? "เกิดข้อผิดพลาดในการอัปเดตสินค้า"
                    : "เกิดข้อผิดพลาดในการเพิ่มสินค้า",
            );
        } finally {
            loading = false;
        }
    }

    // Delete product confirmation and logic
    let showDeleteModal = $state(false);
    let productToDelete = $state(null);

    function confirmDelete(product) {
        productToDelete = product;
        showDeleteModal = true;
    }

    async function handleDeleteProduct() {
        loading = true;
        try {
            // Product deletion endpoint needs to be added to your backend
            await client.api.v1.shops[data.shop.id].products[
                productToDelete.id
            ].delete();
            toast.success("ลบสินค้าสำเร็จ");
            await invalidateAll();
            showDeleteModal = false;
        } catch (error) {
            console.error(error);
            toast.error("เกิดข้อผิดพลาดในการลบสินค้า");
        } finally {
            loading = false;
        }
    }

    // Filtered products based on search
    let filteredProducts = $derived(
        data.products.filter(
            (product) =>
                product.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (product.category &&
                    product.category
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())) ||
                product.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
        ),
    );

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
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
            <a
                href="/seller/shops/{data.shop.id}"
                class="hover:bg-gray-100 p-2 rounded-full"
            >
                <ArrowLeft size={20} />
            </a>
            <h1 class="text-2xl font-bold">สินค้าทั้งหมด</h1>
        </div>
        <Button onclick={openCreateModal} class="bg-blue-600 hover:bg-blue-700">
            <Plus size={18} class="mr-2" />
            เพิ่มสินค้าใหม่
        </Button>
    </div>

    <!-- Search bar -->
    <div class="relative">
        <Search
            size={18}
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <Input
            type="text"
            placeholder="ค้นหาสินค้า..."
            class="pl-10"
            bind:value={searchQuery}
        />
    </div>

    <!-- Product table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
        {#if filteredProducts.length > 0}
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >รูปภาพ</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >ชื่อสินค้า</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >หมวดหมู่</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >ราคา</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >สต็อก</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >ยอดขาย</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >จัดการ</th
                            >
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        {#each filteredProducts as product}
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {#if product.image}
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            class="h-10 w-10 rounded-md object-cover"
                                        />
                                    {:else}
                                        <div
                                            class="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center"
                                        >
                                            <Package
                                                size={16}
                                                class="text-gray-500"
                                            />
                                        </div>
                                    {/if}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="font-medium text-gray-900">
                                        {product.name}
                                    </div>
                                    <div
                                        class="text-sm text-gray-500 truncate max-w-xs"
                                    >
                                        {product.description}
                                    </div>
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {product.category || "-"}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {formatCurrency(product.price)}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {#if product._count && product._count.product_stock > 0}
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                        >
                                            {product._count.product_stock} ชิ้น
                                        </span>
                                    {:else}
                                        <span
                                            class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                                        >
                                            สินค้าหมด
                                        </span>
                                    {/if}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {product._count ? product._count.order : 0} รายการ
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                >
                                    <div class="flex space-x-2">
                                        <a
                                            href="/seller/shops/{data.shop
                                                .id}/products/{product.id}"
                                            class="text-blue-600 hover:text-blue-900"
                                            title="จัดการสต็อก"
                                        >
                                            <Package size={18} />
                                        </a>
                                        <button
                                            class="text-gray-600 hover:text-gray-900"
                                            onclick={() =>
                                                openEditModal(product)}
                                            title="แก้ไขสินค้า"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            class="text-red-600 hover:text-red-900"
                                            onclick={() =>
                                                confirmDelete(product)}
                                            title="ลบสินค้า"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {:else}
            <div class="py-12 text-center">
                <Package size={48} class="mx-auto text-gray-400 mb-3" />
                <h3 class="text-lg font-medium text-gray-900">ไม่พบสินค้า</h3>
                <p class="mt-1 text-sm text-gray-500">
                    {searchQuery
                        ? "ไม่พบสินค้าที่ค้นหา ลองใช้คำค้นหาอื่น"
                        : 'ยังไม่มีสินค้าในร้านค้านี้ กดปุ่ม "เพิ่มสินค้าใหม่" เพื่อเริ่มขายสินค้า'}
                </p>
            </div>
        {/if}
    </div>
</div>

<!-- Product Create/Edit Modal -->
<Modal bind:open={showProductModal} {loading} class="p-8 max-w-2xl">
    <div class="flex place-items-center sm:pt-4">
        <h2 class="text-2xl font-semibold">
            {isEditing ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
        </h2>
    </div>
    <div class="flex flex-col gap-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
                <Label>ชื่อสินค้า *</Label>
                <Input placeholder="ชื่อสินค้า" bind:value={name} required />
            </div>

            <div class="flex flex-col gap-2">
                <Label>ราคา (บาท) *</Label>
                <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    bind:value={price}
                    required
                />
            </div>
        </div>

        <div class="flex flex-col gap-2">
            <Label>รายละเอียด *</Label>
            <Input
                placeholder="รายละเอียดสินค้า..."
                bind:value={description}
                required
            />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
                <Label>หมวดหมู่</Label>
                <Input placeholder="หมวดหมู่สินค้า" bind:value={category} />
            </div>

            <div class="flex flex-col gap-2">
                <Label>รูปภาพ (URL)</Label>
                <Input
                    placeholder="https://example.com/image.jpg"
                    bind:value={image}
                />
            </div>
        </div>

        <div class="flex justify-end gap-2 mt-4">
            <Button
                variant="outline"
                onclick={() => (showProductModal = false)}
            >
                ยกเลิก
            </Button>
            <Button
                onclick={handleSaveProduct}
                class="bg-blue-600 hover:bg-blue-700"
                disabled={!name || !description || price <= 0}
            >
                {isEditing ? "บันทึกการเปลี่ยนแปลง" : "เพิ่มสินค้า"}
            </Button>
        </div>
    </div>
</Modal>

<!-- Delete Confirmation Modal -->
<Modal bind:open={showDeleteModal} {loading} class="p-8 max-w-md">
    <div class="flex flex-col items-center text-center gap-4">
        <div class="rounded-full bg-red-100 p-3 mb-2">
            <AlertTriangle size={24} class="text-red-600" />
        </div>
        <h2 class="text-xl font-semibold">ยืนยันการลบสินค้า</h2>
        <p class="text-gray-500">
            คุณแน่ใจหรือไม่ว่าต้องการลบสินค้า "{productToDelete?.name}"?
            การดำเนินการนี้ไม่สามารถยกเลิกได้
        </p>

        <div class="flex justify-center gap-3 w-full mt-4">
            <Button
                variant="outline"
                onclick={() => (showDeleteModal = false)}
                class="flex-1"
            >
                ยกเลิก
            </Button>
            <Button
                onclick={handleDeleteProduct}
                class="bg-red-600 hover:bg-red-700 flex-1"
            >
                ลบสินค้า
            </Button>
        </div>
    </div>
</Modal>
