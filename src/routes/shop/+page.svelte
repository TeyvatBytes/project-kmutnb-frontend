<script lang="ts">
    import ShopCard from "$lib/components/ShopCard.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import { Input } from "$lib/components/ui/input";

    import * as Select from "$lib/components/ui/select";
    import ShopShow from "$lib/components/ShopShow.svelte";
    import Ad from "$lib/components/Ad.svelte";
    import SpinningText from "$lib/components/ui/spinning-text/SpinningText.svelte";
</script>

<div class="grid gap-10">
    <ShopCard />
    <ShopShow />
    <Ad />
</div>
