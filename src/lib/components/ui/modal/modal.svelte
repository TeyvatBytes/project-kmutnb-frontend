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
    import { LoaderCircle } from 'lucide-svelte';

	type Props = {
		open?: boolean;
		class?: string;
		hideClose?: boolean;
		loading?: boolean;
		children: Snippet<[]>;
	};

	const isDesktop = new MediaQuery('(min-width: 768px)');

	let {
		open = $bindable(false),
		children,
		class: className = undefined,
		loading = $bindable(false),
		hideClose = false
	}: Props = $props();
</script>

{#if isDesktop.current}
	<Dialog.Root bind:open>
		<Dialog.Content class={cn('sm:max-w-xl', className)} {hideClose}>
		{#if loading}
    		<div class="w-full h-96 flex justify-center items-center">
                <div
                    class="flex flex-auto flex-col justify-center items-center gap-3"
                >
                    <LoaderCircle class="text-blue-600 size-20 animate-spin" />
                    กำลังทำรายการ
                </div>
            </div>
        {:else}
            {@render children()}
		{/if}
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Content class={cn('', className)}>
		{#if loading}
    		<div class="w-full h-96 flex justify-center items-center">
                <div
                    class="flex flex-auto flex-col justify-center items-center gap-3"
                >
                    <LoaderCircle class="text-blue-600 size-20 animate-spin" />
                    กำลังทำรายการ
                </div>
            </div>
        {:else}
            {@render children()}
    {/if}
		</Drawer.Content>
	</Drawer.Root>
{/if}
