<script>
    import { invalidateAll } from "$app/navigation";
    import { client } from "$lib/api";
    import ShopCard from "$lib/components/ShopCard.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Modal } from "$lib/components/ui/modal";
    import {
        ArrowLeft,
        ChevronsLeft,
        Lightbulb,
        ShieldCheck,
    } from "lucide-svelte";
    import { toast } from "svelte-sonner";

    let { data } = $props();

    let loading = $state(false);
    let showShopCreateModal = $state(false);
    let description = $state("");
    let logo = $state("");
    let slug = $state("");
    let name = $state("");

    async function handleCreateShop() {
        loading = true;
        try {
            const { data, error } = await client.api.v1.shops.post({
                description,
                logo,
                slug,
                name,
            });
            console.log(data);
            toast.success("สร้างร้านค้าสำเร็จ");
            window.location.reload();
        } catch (error) {
            toast.error("เกิดข้อผิดพลาดในการสร้างร้านค้า");
        } finally {
            loading = false;
        }
    }
</script>

<div class="flex flex-col gap-5 mt-5">
    <div class="flex justify-between">
        <a href="/seller"><ArrowLeft /></a>

        <div class="text-2xl font-bold">
            ร้านค้าทั้งหมด ({data.shops?.length || 0})
        </div>
        <Button onclick={() => (showShopCreateModal = true)}
            >สร้างร้านค้า</Button
        >
    </div>
    <div class="grid grid-cols-1 gap-5">
        {#each data.shops as shop}
            <ShopCard href="/seller/shops/{shop.id}" {shop} />
        {/each}
    </div>
</div>
<Modal {loading} bind:open={showShopCreateModal} class="p-8">
    <div class="flex place-items-center sm:pt-4">
        <h2 class="text-2xl font-semibold">สร้างร้านค้า</h2>
    </div>
    <div class="flex flex-col gap-3">
        <div
            class="p-6 rounded-lg bg-green-100 dark:bg-green-900 flex gap-3 text-primary"
        >
            <Lightbulb />คุณสามารถเปลี่ยนชื่อร้านค้าในภายหลังได้
        </div>

        <Label>ชื่อร้าน</Label>
        <Input placeholder="ร้านโรบัคสุดเจ๋ง" bind:value={name} />

        <Label>คำอธิบายร้านค้า</Label>
        <Input
            placeholder="ร้านเราเปิดมามากว่า 2 ปี..."
            bind:value={description}
        />

        <Label>logo</Label>
        <Input placeholder="http://...." bind:value={logo} />

        <Label>ชื่อสั้นๆร้าน(ภาษาอังกฤษพิมเล็กเท่านั้า)</Label>
        <Input placeholder="my-shop...." bind:value={slug} />
        <Button
            onclick={handleCreateShop}
            class="bg-blue-600 font-bold text-white p-6">สร้างร้านค้า</Button
        >
    </div>
</Modal>
