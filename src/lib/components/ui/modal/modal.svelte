<!--
	jsrepo 1.39.0
	Installed from github/ieedan/shadcn-svelte-extras
	3-7-2025
-->

<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import * as Dialog from '../dialog/index.js';
	import * as Drawer from '../drawer/index.js';
	import type { Snippet } from 'svelte';
	import { cn } from '../../../utils/utils';

	type Props = {
		open?: boolean;
		class?: string;
		hideClose?: boolean;
		children: Snippet<[]>;
	};

	const isDesktop = new MediaQuery('(min-width: 768px)');

	let {
		open = $bindable(false),
		children,
		class: className = undefined,
		hideClose = false
	}: Props = $props();
</script>

{#if isDesktop.current}
	<Dialog.Root bind:open>
		<Dialog.Content class={cn('sm:max-w-xl', className)} {hideClose}>
			{@render children()}
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content class={cn('', className)}>
			{@render children()}
		</Drawer.Content>
	</Drawer.Root>
{/if}
