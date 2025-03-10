<script>
    import { Input } from "$lib/components/ui/input";

    import * as Select from "$lib/components/ui/select";
    import ProductCard from "./ProductCard.svelte";
    let { products, shop } = $props();

    let selectedCategory = $state("ทั้งหมด");
    let searchQuery = $state("");

    let showProducts = $derived.by(() => {
        if (selectedCategory === "ทั้งหมด") {
            return products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        }
        return products
            .filter((product) => product.category === selectedCategory)
            .filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()),
            );
    });
</script>

<div class="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 w-full gap-5">
    <Input
        class="p-6 md:col-span-2"
        bind:value={searchQuery}
        placeholder="ค้นหาสินค้า..."
    />

    <Select.Root type="single" class="h-full" bind:value={selectedCategory}>
        <Select.Trigger class="h-full">{selectedCategory}</Select.Trigger>
        <Select.Content>
            <Select.Item value="ทั้งหมด">ทั้งหมด</Select.Item>
            {#each shop.categorys as category}
                <Select.Item value={category}>{category}</Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>

    <Select.Root type="single" class="h-full" disabled>
        <Select.Trigger class="h-full">เรียงโดย Default</Select.Trigger>
        <Select.Content>
            <Select.Item value="system">ยอดนิยม</Select.Item>
            <Select.Item value="dark">จำนวนสต็อก</Select.Item>
            <Select.Item value="light">วันที่ลง</Select.Item>
        </Select.Content>
    </Select.Root>

    {#each showProducts as product}
        <ProductCard {shop} {product} />
    {/each}
</div>
