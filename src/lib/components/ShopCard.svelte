<script lang="ts">
    import { Separator } from "$lib/components/ui/separator";
    import { Star } from "lucide-svelte";
    import SpinningText from "$lib/components/ui/spinning-text/SpinningText.svelte";

    let { shop } = $props();
</script>

<div class="border bg-accent rounded-lg p-5 overflow-hidden relative">
    <div class="absolute bottom-0 right-0 block lg:hidden">
        <SpinningText
            class="text-5xl font-extrabold text-muted-foreground"
            children="ParadoxyShop888 • Paradoxy • Sextoy •"
        ></SpinningText>
    </div>
    <div class="lg:flex grid justify-between gap-10">
        <div class="flex gap-5">
            <img
                src="https://github.com/ParaDoxy8k.png"
                class="rounded-xl"
                width="85"
                alt=""
            />
            <div class="flex justify-between flex-col py-2">
                <div
                    class="text-xl font-bold text-sky-400 bg-sky-50 w-fit border rounded-lg p-1 px-2"
                >
                    {shop.name}
                </div>
                <div class="text-muted-foreground">
                    {shop.description}
                </div>
            </div>
        </div>
        <Separator class="lg:block hidden" orientation="vertical" />

        <div class="flex justify-between flex-col py-2">
            <div class="text-muted-foreground">ขายสินค้าไปแล้ว</div>
            <div class="font-bold text-xl">{shop._count.orders} ชิ้น</div>
        </div>
        <Separator class="lg:block hidden" orientation="vertical" />
        <div class="flex justify-between flex-col py-2">
            <div class="text-muted-foreground">คุณภาพของสินค้า</div>
            <div class="flex gap-3 items-center">
                <div class="font-bold text-xl">
                    {(shop.review || 5.0).toFixed(1)}
                </div>
                <div class="flex gap-3 items-center">
                    {#each { length: 5 } as _}
                        <Star class="fill-yellow-200" />
                    {/each}
                </div>
                <div>(13 รีวิว)</div>
            </div>
        </div>
    </div>
</div>
