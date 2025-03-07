<!--
	jsrepo 1.39.0
	Installed from github/ieedan/shadcn-svelte-extras
	3-7-2025
-->

<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import { cn } from '../../../utils/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DrawerPrimitive.OverlayProps = $props();
</script>

<DrawerPrimitive.Overlay
	bind:ref
	class={cn('fixed inset-0 z-50 bg-black/80', className)}
	{...restProps}
/>
