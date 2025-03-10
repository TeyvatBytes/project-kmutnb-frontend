<script>
    import {
        ArrowLeft,
        ChevronsLeft,
        ChevronsUp,
        CircleAlert,
        LoaderCircle,
        Package2,
        ShieldAlert,
    } from "lucide-svelte";
    import {
        blur,
        crossfade,
        draw,
        fade,
        fly,
        scale,
        slide,
    } from "svelte/transition";
    import { gfmPlugin } from "svelte-exmarkdown/gfm";
    import { Modal } from "$lib/components/ui/modal";
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Separator } from "$lib/components/ui/separator";

    import Markdown from "svelte-exmarkdown";
    import { onMount } from "svelte";
    const { data } = $props();
    let quantity = $state(1);

    let total_price = $derived(data.product.price * quantity);
    let fee = $derived(total_price * 0.03);
    let final_price = $derived(total_price + fee);
    const plugins = [gfmPlugin()];

    let showBuyModel = $state(false);

    let loading = $state(false);
    function buyProduct() {
        loading = true;
        setTimeout(() => {
            loading = false;
        }, 2000);
    }
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
        <Button
            onclick={() => {
                showBuyModel = true;
            }}
            type="submit"
            class="w-full p-7 bg-blue-600 font-bold text-xl">ซื้อสินค้า</Button
        >
    </div>
</div>

<Modal bind:open={showBuyModel} class="p-4">
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
        <div>
            <div class="flex place-items-center px-4 pb-4 sm:pt-4">
                <h2 class="text-2xl font-semibold">
                    ยืนยันการซื้อ {data.product.name}
                </h2>
            </div>
            <div class="px-4 pb-4 flex flex-col gap-5">
                <div class="border rounded-lg p-3 gap-5 flex items-center">
                    <img
                        src={data.product.image}
                        class="rounded-lg"
                        width="80"
                        alt=""
                    />
                    <div class="flex flex-auto justify-between flex-col py-3">
                        <div class="text-xl">
                            {data.product.name}
                        </div>
                        <div class="text-blue-600 font-bold">
                            ราคา {data.product.price} บาท
                        </div>
                    </div>
                    <div class="px-4 font-bold">{quantity} ชิ้น</div>
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
                        <div class="text-blue-600 font-bold text-xl">
                            ทั้งหมด
                        </div>
                        <div class="text-blue-600 font-bold text-xl">
                            {final_price.toFixed(2)} บาท
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <div
                        class="p-6 rounded-lg text-sm text-gray-600 bg-gray-100 text-left items-center flex gap-3"
                    >
                        <ShieldAlert />
                        <div>
                            เมื่อคุณกดซื้อสินค้าคุณได้ยอมรับเงื่อนไขของ
                            <a class="border-b-2" href="/">SellVat</a>
                            และของ
                            <a class="border-b-2" href="/">{data.shop.name}</a>
                        </div>
                    </div>
                    <Button
                        onclick={buyProduct}
                        type="submit"
                        class="p-8 bg-blue-600 font-bold text-xl"
                        >ยืนยันการสั่งซื้อ</Button
                    >
                </div>
            </div>
        </div>
    {/if}
</Modal>
