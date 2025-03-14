<script>
    import { Label } from "$lib/components/ui/label";
    import { Input } from "$lib/components/ui/input";

    let { inputs } = $props();
</script>

{#each inputs as input}
    <div>
        <Label for={input.id}>{input.label}</Label>
        <Input
            bind:value={input.value}
            placeholder={input.placeholder}
            type={input.type}
        />
    </div>
{/each}
