<script>
    import ShopCard from "$lib/components/ShopCard.svelte";
    import { Button } from "$lib/components/ui/button";
    import { ArrowLeft, ChevronsLeft } from "lucide-svelte";

    let { data } = $props();
</script>

<div class="flex flex-col gap-5 mt-5">
    <div class="flex justify-between">
        <a href="/seller"><ArrowLeft /></a>

        <div class="text-2xl font-bold">
            ร้านค้าทั้งหมด ({data.shops.length})
        </div>
        <Button>สร้างร้านค้า</Button>
    </div>
    <div class="grid-cols-1">
        {#each data.shops as shop}
            <ShopCard href="/seller/shops/${shop.id}" {shop} />
        {/each}
    </div>
</div>
