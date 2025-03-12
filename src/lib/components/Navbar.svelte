<script lang="ts">
    import { DollarSign } from "lucide-svelte";
    import NavbarBalance from "./NavbarBalance.svelte";
    import NavbarAvatar from "./NavbarAvatar.svelte";

    import { onMount } from "svelte";

    let { title = "SellVat", href = "/" } = $props();
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
        ? 'bg-background shadow-sm'
        : 'bg-background'}"
>
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a class="text-3xl font-extrabold text-primary" {href}>{title}</a>
        <NavbarAvatar />
    </div>
</div>
