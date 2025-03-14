<script>
    import { getMe } from "$lib/api";
    import Navbar from "$lib/components/Navbar.svelte";
    import { onMount } from "svelte";
    let { children } = $props();

</script>

<Navbar href="/" />
{@render children()}
