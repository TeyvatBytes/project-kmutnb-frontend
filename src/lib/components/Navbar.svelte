<script lang="ts">
    import { DollarSign } from "lucide-svelte";
    import NavbarBalance from "./NavbarBalance.svelte";
    import NavbarAvatar from "./NavbarAvatar.svelte";
</script>

<div class="border py-3 grid md:grid-cols-9 w-full px-2">
    <div class="md:col-span-7 md:col-start-2 flex justify-between items-center">
        <a class="font-bold text-xl" href="/">BeerShop</a>
        <NavbarAvatar />
    </div>
</div>
