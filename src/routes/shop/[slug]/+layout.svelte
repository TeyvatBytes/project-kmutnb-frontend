<script>
	import SpinningText from "$lib/components/ui/spinning-text/SpinningText.svelte";
    import Navbar from '$lib/components/Navbar.svelte';
    import Copyright from '$lib/components/Copyright.svelte';
    import Ad from "$lib/components/Ad.svelte";
    import { onMount } from "svelte";
    import { getMe } from "$lib/api";
	let { children,data } = $props();

	onMount(()=>{
		getMe();
	})
</script>

<Navbar title={data.shop.name} href={`/shop/${data.shop.slug}/`}/>
<div class="max-w-7xl mx-auto px-6 min-h-screen">
    {@render children()}
    <div class="end-0">
        <Ad />
    </div>
    <Copyright />
</div>
