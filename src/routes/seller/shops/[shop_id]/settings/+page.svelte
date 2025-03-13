<script lang="ts">
    import { client } from "$lib/api";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { ArrowLeft, Link } from "lucide-svelte";
    import { onMount } from "svelte";
    import { toast } from "svelte-sonner";

    let { data } = $props();

    onMount(() => {
        console.log(data);
    });

    let name = $state(data.shop.name);
    let slug = $state(data.shop.slug);
    let logo = $state(data.shop.logo);
    let description = $state(data.shop.description);

    async function handleSave(event: SubmitEvent) {
        event.preventDefault();
        try {
            const { data: success, error } = await client.api.v1.shops[
                data.shop.id
            ].put({
                name,
                slug,
                logo,
                description,
            });
            if (error?.data?.error) return toast.error(error.data.error);
            toast.success("Shop settings saved");
        } catch (error) {
            toast.warning("Error saving shop settings:", error);
        }
    }
</script>

<div class="flex flex-col gap-5 mt-5">
    <div class="flex items-center gap-4">
        <a
            href="/seller/shops/{data.shop.id}"
            class="hover:bg-accent transition-colors p-2 rounded-full"
        >
            <ArrowLeft size={20} />
        </a>
        <h1 class="text-2xl font-bold">ตั้งค่าร้านค้า {data.shop?.name}</h1>
    </div>

    <form
        onsubmit={handleSave}
        class="bg-background rounded-lg shadow border p-6 flex flex-col gap-4"
    >
        <div class="text-2xl font-bold">ตั้งค่าร้านค้า</div>
        <div class="flex flex-col gap-4">
            <Label class="w-full">ชื่อร้านของคุณ</Label>
            <Input bind:value={name} />

            <Label class="w-full">โลโก้ร้านของคุณ</Label>
            <Input bind:value={logo} />

            <Label class="w-full">ชื่อสั้นร้านของคุณ</Label>
            <Input bind:value={slug} />

            <Label class="w-full">คำอธิบายร้านคุณ</Label>
            <Input bind:value={description} />

            <Button
                type="submit"
                class="p-5 w-full text-white font-bold bg-blue-600"
                >บันทึกร้านค้า</Button
            >
        </div>
    </form>
</div>
