<script lang="ts">
    import ShopCard from "$lib/components/ShopCard.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import { Input } from "$lib/components/ui/input";

    import * as Select from "$lib/components/ui/select";
    import ProductCard from "./ProductCard.svelte";
    import ShopProductTab from "./ShopProductTab.svelte";
    import ShopContactTab from "./ShopContactTab.svelte";
    import ShopReviewTab from "./ShopReviewTab.svelte";
    import ShopPolicyTab from "./ShopPolicyTab.svelte";

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

    let tabs = [
        {
            id: "products",
            name: "สินค้า",
        },
        {
            id: "contact",
            name: "ติดต่อ",
        },
        {
            id: "review",
            name: "รีวิว",
        },
        {
            id: "policy",
            name: "เงื่อนไข",
        },
    ];
    let selectTab = $state("products");
    let { products, shop } = $props();
</script>

<div class="flex gap-10 text-md text-muted-foreground border-b-2 border-muted">
    {#each tabs as tab}
        {#if tab.id === selectTab}
            <button
                class="text-sky-500 border-b-2 border-sky-300 px-4 transition-all"
                >{tab.name}</button
            >
        {:else}
            <button
                onclick={() => (selectTab = tab.id)}
                class="hover:text-accent-foreground border-b-2 border-transparent transition-all px-4"
                >{tab.name}</button
            >
        {/if}
    {/each}
</div>
{#if selectTab === "products"}
    <ShopProductTab {products} {shop} />
{:else if selectTab === "contact"}
    <ShopContactTab {shop} />
{:else if selectTab === "review"}
    <ShopReviewTab {shop} />
{:else if selectTab === "policy"}
    <ShopPolicyTab {shop} />
{/if}
