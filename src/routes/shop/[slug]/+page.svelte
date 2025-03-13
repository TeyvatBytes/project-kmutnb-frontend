<script lang="ts">
    import ShopCard from "$lib/components/ShopCard.svelte";

    import ShopShow from "$lib/components/ShopShow.svelte";
    import { userStore } from "$lib/store/auth.js";
    import { Button } from "$lib/components/ui/button";

    const { data } = $props();
</script>

<svelte:head>
    <title>{data.shop.name}</title>
    <meta name="description" content={data.shop.description} />
    <meta
        name="keywords"
        content="ระบบร้านค้าออนไลน์, e-commerce, ขายของออนไลน์, จัดการสินค้า, ระบบจัดส่ง, วิเคราะห์ยอดขาย, SellVat"
    />

    <!-- Open Graph Tags -->
    <meta property="og:title" content={data.shop.name} />
    <meta property="og:description" content={data.shop.description} />
    <meta
        property="og:url"
        content="https://sellvat.com/shop/{data.shop.slug}/"
    />
    <meta property="og:image" content={data.shop.logo} />
    <meta property="og:image:alt" content={data.shop.name} />

    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={data.shop.name} />
    <meta name="twitter:description" content={data.shop.description} />
    <meta name="twitter:image" content={data.shop.logo} />

    <link rel="canonical" href="https://sellvat.com/shop/{data.shop.slug}/" />
</svelte:head>

<div class="grid gap-10">
    <ShopCard shop={data.shop} />
    {#if data.shop.owner.id === $userStore?.id}
        <div
            class="border p-5 bg-accent rounded-lg flex justify-between items-center"
        >
            <div>นี่คือร้านของคุณ</div>
            <Button href="/seller/shops/{data.shop.id}">จัดการร้าน</Button>
        </div>
    {/if}
    <ShopShow shop={data.shop} products={data.shop.products} />
</div>
