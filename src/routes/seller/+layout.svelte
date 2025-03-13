<script>
    import SpinningText from "$lib/components/ui/spinning-text/SpinningText.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Copyright from "$lib/components/Copyright.svelte";
    import Ad from "$lib/components/Ad.svelte";
    import { onMount } from "svelte";
    import { getMe } from "$lib/api";
    import { authRedirect, tokenStore } from "$lib/store/auth";
    import { goto } from "$app/navigation";
    let { children } = $props();

    onMount(() => {
      if(!$tokenStore) {
        authRedirect.set('/seller')
        return goto('/login')
      }
      getMe();
    });
</script>

<Navbar title="SellVat - หน้าผู้ขาย" href="/seller" />
<div class="max-w-7xl mx-auto px-6 min-h-screen">
    {@render children()}
    <Copyright />
</div>
