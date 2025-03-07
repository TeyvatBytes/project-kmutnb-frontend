<script lang="ts">
    import ShopCard from "$lib/components/ShopCard.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import { Input } from "$lib/components/ui/input";

    import * as Select from "$lib/components/ui/select";
    import ProductCard from "./ProductCard.svelte";

    // let products = [
    //     {
    //         id: 1,
    //         name: "หีเด็ก",
    //         price: 100,
    //         stock: 10,
    //         category: "รหัส",
    //         description: "หีเด็ก",
    //         image: "https://down-th.img.susercontent.com/file/d6f258dfed905e66f90258e2d5ed6917",
    //     },
    //     {
    //         id: 2,
    //         name: "หีเด็ก",
    //         price: 100,
    //         stock: 5,
    //         category: "รหัส",
    //         description: "หีเด็ก",
    //         image: "https://static.trueplookpanya.com/tppy/member/m_557500_560000/559387/cms/images/%E0%B8%8A%E0%B8%B8%E0%B8%94%E0%B9%80%E0%B8%94%E0%B8%A3%E0%B8%AA%E0%B9%80%E0%B8%94%E0%B9%87%E0%B8%81%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%AB%E0%B8%8D%E0%B8%B4%E0%B8%87_02.jpg",
    //     },
    //     {
    //         id: 3,
    //         name: "หีเด็ก",
    //         price: 100,
    //         stock: 10,
    //         category: "รหัส",
    //         description: "หีเด็ก",
    //         image: "https://inwfile.com/s-cu/riemhv.jpg",
    //     },
    //     {
    //         id: 4,
    //         name: "หีเด็ก",
    //         price: 100,
    //         stock: 10,
    //         category: "รหัส",
    //         description: "หีเด็ก",
    //         image: "https://s.isanook.com/ns/0/ui/1863/9319794/chomismaterialgirl_1700658293_3241679174246346870_4275583_0.jpg",
    //     },
    //     {
    //         id: 5,
    //         name: "หีเด็ก",
    //         price: 100,
    //         stock: 10,
    //         category: "รหัส",
    //         description: "หีเด็ก",
    //         image: "https://s.alicdn.com/@sc04/kf/Hfbb4c1b647b945948bc482d5a4bd5877u.jpg_720x720q50.jpg",
    //     },
    //     {
    //         id: 6,
    //         name: "หีเด็ก",
    //         price: 100,
    //         stock: 10,
    //         category: "รหัส",
    //         description: "หีเด็ก",
    //         image: "https://img.lazcdn.com/g/ff/kf/S2e5b07a698824e2f939b74c3c92b62c43.jpg_720x720q80.jpg",
    //     },
    //     {
    //         id: 7,
    //         name: "หีเด็ก",
    //         price: 100,
    //         stock: 10,
    //         category: "รหัส",
    //         description: "หีเด็ก",
    //         image: "https://down-th.img.susercontent.com/file/35f38038cfd3f5a1e13c0e928e4efc8e",
    //     },
    //     {
    //         id: 8,
    //         name: "หีเด็ก",
    //         price: 100,
    //         category: "รหัส",
    //         description: "หีเด็ก",
    //         image: "https://static.trueplookpanya.com/tppy/member/m_557500_560000/559387/cms/images/%E0%B8%8A%E0%B8%B8%E0%B8%94%E0%B9%80%E0%B8%94%E0%B8%A3%E0%B8%AA%E0%B9%80%E0%B8%94%E0%B9%87%E0%B8%81%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%AB%E0%B8%8D%E0%B8%B4%E0%B8%87_13.jpg",
    //     },
    // ];

    let { products, shop } = $props();
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

    {#each products as product}
        <ProductCard {shop} {product} />
    {/each}
</div>
