<script>
    import {
        ArrowLeft,
        ChevronsLeft,
        ChevronsUp,
        Package2,
    } from "lucide-svelte";

    import { gfmPlugin } from "svelte-exmarkdown/gfm";
    import { Modal } from "$lib/components/ui/modal";
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Separator } from "$lib/components/ui/separator";

    import Markdown from "svelte-exmarkdown";
    const { data } = $props();
    let quantity = $state(1);

    let total_price = $derived(data.product.price * quantity);
    let fee = $derived(total_price * 0.03);
    let final_price = $derived(total_price + fee);
    const plugins = [gfmPlugin()];
</script>

<div class="grid md:grid-cols-5 grid-cols-1 gap-3">
    <a
        href={`/shop/${data.shop.slug}`}
        class="md:col-span-5 flex gap-3 items-center hover:bg-accent transition-colors p-3 rounded-lg"
    >
        <ArrowLeft />
        <img src={data.shop.logo} width="50" class="rounded-lg" alt="" />
        <div class="font-bold text-2xl">{data.shop.name}</div>
    </a>
    <div class="md:col-span-3 border rounded-lg p-5 flex flex-col gap-3">
        <h1 class="text-2xl font-bold">{data.product.name}</h1>

        <div class="text-xl">
            ราคา <span class="text-blue-600 font-bold"
                >{data.product.price.toFixed(2)}</span
            > บาท
        </div>
        <Separator />

        <Markdown
            md={data.product.description}
            {plugins}
            class="text-md mb-2"
        />
    </div>
    <div
        class="md:col-span-2 border rounded-lg p-5 flex flex-col gap-3 justify-between h-fit"
    >
        <div class="text-xl font-bold">ซื้อสินค้า</div>

        <div>
            <Label>จำนวนสินค้า</Label>
            <Input type="number" bind:value={quantity} />
        </div>

        <div class="flex flex-col gap-3">
            <div class="flex justify-between">
                <div>ค่าสินค้า({quantity} ชิ้น)</div>
                <div>
                    {total_price.toFixed(2)} บาท
                </div>
            </div>
            <div class="flex justify-between">
                <div>ค่าธรรมเนียม 3%</div>
                <div>
                    {fee.toFixed(2)} บาท
                </div>
            </div>
            <div class="flex justify-between">
                <div class="text-blue-600 font-bold text-xl">ทั้งหมด</div>
                <div class="text-blue-600 font-bold text-xl">
                    {final_price.toFixed(2)} บาท
                </div>
            </div>
        </div>
        <Button type="submit" class="w-full p-7 bg-blue-600 font-bold text-xl"
            >ซื้อสินค้า</Button
        >
    </div>
</div>
