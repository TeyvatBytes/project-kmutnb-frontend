<script>
	import SpinningText from "$lib/components/ui/spinning-text/SpinningText.svelte";
    import Navbar from '$lib/components/Navbar.svelte';
    import Copyright from '$lib/components/Copyright.svelte';
    import Ad from "$lib/components/Ad.svelte";
	let { children } = $props();
</script>

<Navbar/>
    <div class="max-w-7xl mx-auto px-6 min-h-screen">
        {@render children()}
        <div class="end-0">

        <Ad />
        </div>
        <Copyright />
    </div>
