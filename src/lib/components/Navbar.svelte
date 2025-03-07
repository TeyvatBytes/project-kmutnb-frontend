<script lang="ts">
    import { DollarSign } from "lucide-svelte";
    import NavbarBalance from "./NavbarBalance.svelte";
    import NavbarAvatar from "./NavbarAvatar.svelte";
    import { page } from "$app/stores";

    import { onMount } from "svelte";

    let scrolled = $state(false);
    onMount(() => {
        const handleScroll = () => {
            scrolled = window.scrollY > 10;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });
</script>

<div
    class="py-4 w-full transition-all duration-300 sticky top-0 z-50 {scrolled
        ? 'bg-white shadow-sm'
        : 'bg-white'}"
>
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a class="font-bold text-xl" href="/shop/{$page.params.slug}"
            >BeerShop</a
        >
        <NavbarAvatar />
    </div>
</div>
