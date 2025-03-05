<script>
	import Footer from '$lib/components/Footer.svelte';
	import SpinningText from "$lib/components/ui/spinning-text/SpinningText.svelte";
  import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<Navbar/>
    <div class="max-w-7xl mx-auto px-6">
        {@render children()}
    </div>
<Footer />
