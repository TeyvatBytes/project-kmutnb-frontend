<!--
	jsrepo 1.39.0
	Installed from github/ieedan/shadcn-svelte-extras
	3-7-2025
-->

<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';

	let {
		shouldScaleBackground = true,
		open = $bindable(false),
		activeSnapPoint = $bindable(null),
		...restProps
	}: DrawerPrimitive.RootProps = $props();
</script>

<DrawerPrimitive.Root {shouldScaleBackground} bind:open bind:activeSnapPoint {...restProps} />
