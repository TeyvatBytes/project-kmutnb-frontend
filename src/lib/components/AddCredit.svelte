<script>
    import { Modal } from "$lib/components/ui/modal";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "./ui/input";
    import { Separator } from "./ui/separator";
    import { CircleCheck, ShieldCheck } from "lucide-svelte";
    import { Label } from "./ui/label";
    import { onMount } from "svelte";
    import FormInput from "./FormInput.svelte";
    import { client, getMe } from "$lib/api";
    import { formInputToJson } from "$lib/utils";
    import { toast } from "svelte-sonner";
    import { invalidateAll } from "$app/navigation";

    let { open = $bindable() } = $props();

    let methods = [
        {
            id: "aungpao",
            name: "Aungpao",
            icon: "/assets/imgs/truewalletsquare.jpg",
            description: "ชำระด้วย Aungpao",
            fee: 2.9,
            class: "bg-white",
            inputs: [
                {
                    id: "link",
                    label: "ลิ้งอั่งเปา",
                    type: "text",
                    value: "",
                    placeholder: "กรอกลิ้งอั่งเปา",
                },
            ],
            action: async (inputsData) => {
                const { data, error } =
                    await client.api.v1.payments[
                        "truewallet-aungpao"
                    ].topup.post(inputsData);

                if (error?.value?.message) {
                    if (error.value.message === "INVAILD_VOUCHER")
                        toast.error("ลิ้งซองไม่ถูกต้อง");
                    else if (
                        error.value.message === "VOUCHER_OUT_OF_STOCK" ||
                        error.value.message === "TARGET_USER_REDEEMED"
                    )
                        toast.error("ซองถูกใช้ไปแล้ว");
                    else toast.error(error.value.message);
                    return;
                }

                if (data) {
                    toast.success(`เติมเงิน ${data.amount} บาทแล้ว`);
                }
                return data;
            },
        },
        {
            id: "promptpay",
            name: "PromptPay",
            icon: "/assets/imgs/promptpaysquare.png",
            description: "ชำระด้วย PromptPay",
            class: "bg-[#113566]",
            fee: 1.0,
            disabled: true,
            inputs: [
                {
                    id: "amount",
                    label: "จำนวนเงิน",
                    type: "number",
                    value: "",
                    placeholder: "กรอกจำนวนเงิน",
                },
            ],
            action: () => {
                // Implement PromptPay payment logic here
            },
        },
        {
            id: "credit",
            name: "Credit Card",
            icon: "/assets/imgs/visa.png",
            description: "ชำระด้วยบัตรเครดิต",
            class: "bg-[#064396]",
            fee: 1.0,
            disabled: true,
            action: () => {
                // Implement Credit Card payment logic here
            },
        },
    ];

    let loading = $state(false);
    async function handleMethodSelect() {
        loading = true;
        try {
            if (selectedMethod) {
                const ok = await selectedMethod.action(
                    formInputToJson(selectedMethod.inputs),
                );
                if (ok) {
                    open = false;
                    await getMe();
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            loading = false;
        }
    }

    let selectedMethodId = $state(null);
    let selectedMethod = $derived(
        methods.find((method) => method.id === selectedMethodId),
    );

    let amount = $state(null);
</script>

<Modal bind:open {loading} class="p-4 lg:px-8">
    <div class="flex place-items-center sm:pt-4">
        <h2 class="text-2xl font-semibold">เพิ่มเครดิต</h2>
    </div>
    <div class="py-4 flex flex-col gap-5">
        <div class="flex flex-col gap-3">
            {#each methods as method}
                <button
                    onclick={() => (selectedMethodId = method.id)}
                    disabled={method.disabled}
                    class="rounded-xl text-left {method.disabled
                        ? 'grayscale'
                        : ''} flex p-5 gap-10 items-center {selectedMethodId ===
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
                        <div class="text-muted-foreground">
                            ค่าธรรมเนียม {method.fee.toFixed(2)}%
                        </div>
                    </div>
                    <div>
                        {#if selectedMethodId === method.id}
                            <CircleCheck class="text-blue-600" />
                        {/if}
                    </div>
                </button>
            {/each}
        </div>
        <div class="p-6 rounded-lg bg-green-100 dark:bg-green-900 flex gap-3">
            <ShieldCheck />เรารับประกันความปลอดภัยของข้อมูลของคุณ
        </div>
        {#if selectedMethod?.inputs}
            <FormInput inputs={selectedMethod.inputs} />
        {/if}
        <Button
            onclick={handleMethodSelect}
            class="bg-blue-600 p-6 text-white font-bold">เติมเครดิต</Button
        >
    </div>
</Modal>
