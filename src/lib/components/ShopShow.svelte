<script lang="ts">
    import ShopCard from "$lib/components/ShopCard.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import { Input } from "$lib/components/ui/input";

    import * as Select from "$lib/components/ui/select";
    import ProductCard from "./ProductCard.svelte";
</script>

<div class="flex gap-10 text-md text-muted-foreground border-b-2 border-muted">
    <button class="text-sky-500 border-b-2 border-sky-300 px-4">สินค้า</button>
    <button class="hover:text-accent-foreground transition-colors"
        >ติดต่อ</button
    >
    <button class="hover:text-accent-foreground transition-colors">รีวิว</button
    >
    <button class="hover:text-accent-foreground transition-colors"
        >เงื่อนไข</button
    >
</div>
<div class="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 w-full gap-5">
    <Input class="p-6 md:col-span-2" placeholder="ค้นหาสินค้า..." />

    <Select.Root type="single" class="h-full">
        <Select.Trigger class="h-full">หมวดหมู่</Select.Trigger>
        <Select.Content>
            <Select.Item value="light">ทั้งหมด</Select.Item>
            <Select.Item value="dark">เย็ดหี</Select.Item>
            <Select.Item value="system">หี</Select.Item>
        </Select.Content>
    </Select.Root>

    <Select.Root type="single" class="h-full">
        <Select.Trigger class="h-full">เรียงโดย Default</Select.Trigger>
        <Select.Content>
            <Select.Item value="system">ยอดนิยม</Select.Item>
            <Select.Item value="dark">จำนวนสต็อก</Select.Item>
            <Select.Item value="light">วันที่ลง</Select.Item>
        </Select.Content>
    </Select.Root>

    {#each { length: 8 } as _}
        <ProductCard />
    {/each}
</div>
