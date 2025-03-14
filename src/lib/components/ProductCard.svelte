<script>
    import { Package2 } from "lucide-svelte";
    import { Modal } from "./ui/modal";
    import { Label } from "./ui/label";
    import { Button } from "./ui/button";
    import { Input } from "./ui/input";
    import Decimal from "decimal.js";

    let { product, shop } = $props();
</script>

<a
    href="/shop/{shop.slug}/products/{product.id}"
    class="border rounded-lg group"
>
    <div
        class="bg-background h-40 w-full flex items-center justify-center text-sky-500 relative overflow-hidden"
    >
        <div
            class="absolute top-2 right-3 bg-accent/50 transition-colors group-hover:bg-accent px-2 rounded-lg text-primary"
        >
            {product.category}
        </div>
        {#if product.image}
            <img
                class="w-full h-full object-cover group-hover:scale-125 transition-all"
                src={product.image}
                alt=""
            />
        {:else}
            <Package2 class="w-10 h-10 group-hover:scale-125  transition-all" />
        {/if}
    </div>
    <div
        class="p-2 flex gap-3 text-left justify-between flex-col bg-accent/50 transition-colors group-hover:bg-accent"
    >
        <div>{product.name}</div>
        <div class="flex justify-between">
            <div>
                <span class="text-sky-500 font-bold text-md"
                    >{new Decimal(product.price).toFixed(2)} บาท</span
                >
            </div>

            <div>
                สต็อก
                <span class="text-green-500 text-md"
                    >{product._count.product_stock}+</span
                >
            </div>
        </div>
    </div>
</a>
