<script>
	import Footer from '$lib/components/Footer.svelte';
	import SpinningText from "$lib/components/ui/spinning-text/SpinningText.svelte";
  import Navbar from '$lib/components/Navbar.svelte';
  import '../app.css';
	let { children } = $props();
</script>

<Navbar/>
<div class="grid px-2 md:grid-cols-9 bg-background pt-5 w-full justify-between items-center">
    <div class="col-span-7 col-start-2">
        {@render children()}
    </div>
</div>
<Footer />
