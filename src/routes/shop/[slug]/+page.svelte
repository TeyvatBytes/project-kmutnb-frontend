<script lang="ts">
    import ShopCard from "$lib/components/ShopCard.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import { Input } from "$lib/components/ui/input";

    import * as Select from "$lib/components/ui/select";
    import ShopShow from "$lib/components/ShopShow.svelte";
    import SpinningText from "$lib/components/ui/spinning-text/SpinningText.svelte";
    import { userStore } from "$lib/store/auth.js";
    import { Button } from "$lib/components/ui/button";

    const { data } = $props();
</script>

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
