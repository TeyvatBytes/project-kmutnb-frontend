<script>
    import {
        ArrowLeft,
        Box,
        Check,
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
    import { client } from "$lib/api.js";
    import { toast } from "svelte-sonner";
    import { goto } from "$app/navigation";
    import { tokenStore } from "$lib/store/auth.js";
    import Decimal from "decimal.js";
    const { data } = $props();
    let quantity = $state(1);
    let price = new Decimal(data.product.price);

    let total_price = $derived(price.mul(quantity));
    let fee = $derived(total_price.mul(0.03));
    let final_price = $derived(total_price.plus(fee));
    const plugins = [gfmPlugin()];

    let showBuyModel = $state(false);
    let showBuySuccessModel = $state(false);

    let loading = $state(false);
    async function buyProduct() {
        loading = true;
        try {
            if (!$tokenStore) {
                toast.warning("กรุณาเข้าสู่ระบบเพื่อซื้อสินค้า");
                return goto(
                    `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`,
                );
            }
            const { data: buyData, error } = await client.api.v1.shops[
                data.shop.id
            ].products[data.product.id].buy.post({ quantity });
            if (error) return toast.error(error.value.error);

            toast.success(`ซื้อสินค้าสำเร็จ`);
            showBuySuccessModel = true;
        } catch (e) {
            console.error(e);
            toast.error("เกิดข้อผิดพลาดในการซื้อสินค้า");
        } finally {
            showBuyModel = false;
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>{data.product.name} | {data.shop.name}</title>
    <meta
        name="description"
        content="{data.product.name} | {data.product.description}"
    />
    <meta
        name="keywords"
        content="ระบบร้านค้าออนไลน์, e-commerce, ขายของออนไลน์, จัดการสินค้า, ระบบจัดส่ง, วิเคราะห์ยอดขาย, SellVat"
    />

    <!-- Open Graph Tags -->
    <meta
        property="og:title"
        content="{data.product.name} | {data.shop.name}"
    />
    <meta property="og:description" content={data.product.description} />
    <meta
        property="og:url"
        content="https://sellvat.com/shop/{data.shop.slug}/products/{data
            .product.id}/"
    />
    <meta property="og:image" content={data.product.image} />
    <meta property="og:image:alt" content={data.product.name} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta
        name="twitter:title"
        content="{data.product.name} | {data.shop.name}"
    />
    <meta name="twitter:description" content={data.product.description} />
    <meta name="twitter:image" content={data.product.image} />
    <link
        rel="canonical"
        href="https://sellvat.com/shop/{data.shop.slug}/products/{data.product
            .id}/"
    />
</svelte:head>

<div class="grid md:grid-cols-5 grid-cols-1 gap-3">
    <a
        href={`/shop/${data.shop.slug}`}
        class="md:col-span-5 flex gap-3 items-center hover:bg-accent transition-colors p-3 rounded-lg"
    >
        <ArrowLeft />
        <img src={data.shop.logo} width="50" class="rounded-lg" alt="" />
        <div class="font-bold text-2xl">{data.shop.name}</div>
    </a>
    <div class="md:col-span-3 border rounded-lg p-5 flex flex-col gap-10">
        <img
            src={data.product.image}
            alt={data.product.name}
            class="rounded-lg object-cover aspect-video"
        />
        <div>
            <h1 class="text-2xl font-bold">{data.product.name}</h1>

            <div class="text-xl">
                ราคา <span class="text-blue-600 font-bold"
                    >{new Decimal(price).toFixed(2)}</span
                > บาท
            </div>
        </div>
        <Separator />
        <div>
            <div class="font-bold text-xl py-2">คำอธิบายสินค้า</div>
            <Markdown
                md={data.product.description}
                {plugins}
                class="text-md mb-2"
            />
        </div>
        <!-- <Separator />
        <div>
            <div class="font-bold text-xl py-2">รีวิว</div>
        </div> -->
    </div>
    <div
        class="md:col-span-2 border rounded-lg p-5 flex flex-col gap-3 justify-between h-fit"
    >
        <div class="text-xl font-bold">ซื้อสินค้า</div>

        <div>
            <Label>จำนวนสินค้า</Label>
            <Input type="number" bind:value={quantity} min="1" />
        </div>
        <div class="flex gap-3 justify-between">
            <Button
                variant="outline"
                class="w-full"
                onclick={() => (quantity -= 10)}>-10</Button
            >
            <Button
                variant="outline"
                class="w-full"
                onclick={() => (quantity -= 1)}>-1</Button
            >
            <Button
                variant="outline"
                class="w-full"
                onclick={() => (quantity += 1)}>+1</Button
            >
            <Button
                variant="outline"
                class="w-full"
                onclick={() => (quantity += 10)}>+10</Button
            >
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

<Modal bind:open={showBuyModel} {loading} class="p-4">
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
                        ราคา {price} บาท
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
                    <div class="text-blue-600 font-bold text-xl">ทั้งหมด</div>
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
                    class="p-8 bg-blue-600 text-white font-bold text-xl"
                    >ยืนยันการสั่งซื้อ</Button
                >
            </div>
        </div>
    </div>
</Modal>

<Modal bind:open={showBuySuccessModel} {loading} class="p-4">
    <div class="flex flex-col items-center text-center gap-4 pt-4">
        <div class="rounded-full bg-green-100 dark:bg-green-950 p-3 mb-2">
            <Check size={24} class="text-green-600" />
        </div>
        <h2 class="text-xl font-semibold">ซื้อสินค้าสำเร็จแล้ว</h2>
        <p class="text-primary/60">เราได้จัดส่งสินค้าไปยังออเดอร์ของคุณแล้ว</p>

        <div class="flex flex-col justify-center gap-3 w-full mt-4">
            <Button
                onclick={() => goto("/@me/orders")}
                class="bg-blue-600 p-6 text-md font-bold">ดูออเดอร์</Button
            >
        </div>
    </div>
</Modal>
