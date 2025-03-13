<script>
  import { ModeWatcher } from "mode-watcher";


  import { Toaster } from "$lib/components/ui/sonner";
    import '../app.css';
	let { children } = $props();
</script>


<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:site_name" content="SellVat">
    <meta property="og:locale" content="th_TH">
    <meta name="theme-color" content="#2563eb">
</svelte:head>

<Toaster />

<ModeWatcher />
{@render children()}
