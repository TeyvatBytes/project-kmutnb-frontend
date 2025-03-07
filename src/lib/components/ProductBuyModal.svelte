<script>
    import { Package2 } from "lucide-svelte";
    import { Modal } from "./ui/modal";
    import { Label } from "./ui/label";
    import { Button } from "./ui/button";
    import { Input } from "./ui/input";
    import ProductBuyModal from "./ProductBuyModal.svelte";
    import { Separator } from "./ui/separator";

    let { open = $bindable(), product } = $props();

    let quantity = $state(1);
</script>

<Modal bind:open class="p-0">
    <div
        class="flex place-items-center border-b border-border px-4 pb-4 sm:pt-4"
    >
        <h2 class="text-2xl font-semibold">{product.name}</h2>
    </div>
    <div class="grid grid-col-1 md:grid-cols-2 gap-4 p-4">
        <img src={product.image} class="rounded-lg" alt="Product" />
        <div>
            <div class="text-3xl font-bold">
                {product.name}
            </div>
            <div class="text-xl">
                ราคา <span class="text-blue-600 font-bold"
                    >{product.price.toFixed(2)}</span
                > บาท
            </div>
        </div>
        <Separator />
        <p class="text-sm">{product.description}</p>
        <Separator />
        <div>
            <Label>จำนวนสินค้า</Label>
            <Input type="number" bind:value={quantity} />
        </div>

        <div class="flex flex-col gap-3">
            <div class="flex justify-between">
                <div>ค่าสินค้า</div>
                <div>
                    {(product.price * quantity).toFixed(2)} บาท
                </div>
            </div>
            <div class="flex justify-between">
                <div>ค่าธรรมเนียม 3%</div>
                <div>
                    {(product.price * 0.03).toFixed(2)} บาท
                </div>
            </div>
            <div class="flex justify-between">
                <div class="text-blue-600 font-bold text-xl">ทั้งหมด</div>
                <div class="text-blue-600 font-bold text-xl">
                    {(product.price * quantity + product.price * 0.03).toFixed(
                        2,
                    )} บาท
                </div>
            </div>
        </div>
    </div>
    <Button type="submit" class="m-4 p-8 bg-blue-600 font-bold text-xl"
        >ซื้อสินค้า</Button
    >
</Modal>
