<script lang="ts">
    import ShopCard from "$lib/components/ShopCard.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import { Input } from "$lib/components/ui/input";

    import * as Select from "$lib/components/ui/select";
    import ShopShow from "$lib/components/ShopShow.svelte";
    import SpinningText from "$lib/components/ui/spinning-text/SpinningText.svelte";

    const { data } = $props();
</script>

<div class="grid gap-10">
    <ShopCard shop={data.shop} />
    <ShopShow shop={data.shop} products={data.shop.products} />
</div>
