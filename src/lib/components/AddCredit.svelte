<script>
    import { Modal } from "$lib/components/ui/modal";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "./ui/input";
    import { Separator } from "./ui/separator";
    import { CircleCheck, ShieldCheck } from "lucide-svelte";
    import { Label } from "./ui/label";

    let { open = $bindable() } = $props();

    let methods = [
        {
            id: "promptpay",
            name: "PromptPay",
            icon: "/assets/imgs/promptpaysquare.png",
            description: "ชำระด้วย PromptPay",
            class: "bg-[#113566]",
            action: () => {
                // Implement PromptPay payment logic here
            },
        },
        {
            id: "truemoney",
            name: "TrueMoney Wallet",
            icon: "/assets/imgs/truewalletsquare.jpg",
            description: "ชำระด้วย TrueMoney Wallet",
            class: "bg-white",
            action: () => {
                // Implement TrueMoney Wallet payment logic here
            },
        },
        {
            id: "credit",
            name: "Credit Card",
            icon: "/assets/imgs/visa.png",
            description: "ชำระด้วยบัตรเครดิต",
            class: "bg-[#064396]",
            action: () => {
                // Implement Credit Card payment logic here
            },
        },
    ];

    let selectedMethod = $state(null);
    let amount = $state(null);
    let step = $state(1);
</script>

<Modal bind:open class="p-4 lg:px-8">
    <div class="flex place-items-center sm:pt-4">
        <h2 class="text-2xl font-semibold">เพิ่มเครดิต</h2>
    </div>
    <div class="py-4 flex flex-col gap-5">
        {#if step === 1}
            <div class="flex flex-col gap-3">
                {#each methods as method}
                    <button
                        onclick={() => (selectedMethod = method.id)}
                        class="rounded-xl text-left flex p-5 gap-10 items-center {selectedMethod ===
                        method.id
                            ? 'bg-blue-100 dark:bg-blue-950'
                            : 'hover:bg-accent'} transition-colors"
                    >
                        <img
                            class="object-contain {method.class} rounded-lg aspect-[13/9]"
                            src={method.icon}
                            width="80"
                            alt={method.name}
                        />
                        <div class="flex flex-auto flex-col justify-between">
                            <div class="text-xl font-bold">{method.name}</div>
                            <div class="text-gray-600 dark:text-gray-500">
                                ค่าธรรมเนียม 5.00%
                            </div>
                        </div>
                        <div>
                            {#if selectedMethod === method.id}
                                <CircleCheck class="text-blue-600" />
                            {/if}
                        </div>
                    </button>
                {/each}
            </div>
            <div
                class="p-6 rounded-lg bg-green-100 dark:bg-green-900 flex gap-3"
            >
                <ShieldCheck />เรารับประกันความปลอดภัยของข้อมูลของคุณ
            </div>

            <Label>จำนวนเงินที่ต้องการเติม</Label>
            <Input
                bind:value={amount}
                placeholder="กรอกจำนวนเงิน"
                type="number"
            />
            <Button
                onclick={() => (step = 2)}
                class="bg-blue-600 p-6 text-white font-bold">เติมเครดิต</Button
            >
        {:else}
            <img
                src="https://promptparse-api.vercel.app/api/truewallet/0971051957/{amount}?message={encodeURIComponent(
                    `เติม SellVat ${amount} บาท`,
                )}"
                alt=""
            />
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Button variant="outline" onclick={() => (step = 1)} class="p-6"
                    >เลือกช่องทางอื่น</Button
                >
                <Button onclick={() => (step = 1)} class="p-6 bg-blue-600 "
                    >เช็คสถานะ</Button
                >
            </div>
        {/if}
    </div>
</Modal>
