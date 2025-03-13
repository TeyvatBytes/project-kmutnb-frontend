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
