<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import { client } from "$lib/api.js";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";

    import * as Select from "$lib/components/ui/select";
    import { Modal } from "$lib/components/ui/modal";
    import {
        ArrowLeft,
        Package,
        ShoppingBag,
        DollarSign,
        Users,
        Tag,
        TrendingUp,
        Settings,
        Link,
        Wallet,
        ShieldCheck,
        Ghost,
    } from "lucide-svelte";
    import { toast } from "svelte-sonner";
    import ThaiBahtText from "thai-baht-text";

    let { data } = $props();

    // Format number as Thai Baht
    function formatCurrency(amount) {
        return new Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
            minimumFractionDigits: 2,
        }).format(amount);
    }

    let openWithdrawModal = $state(false);
    let loadingWithdraw = $state(false);

    let withdrawlMethods = [
        "พร้อมเพย์",
        "ธนาคารกรุงเทพ",
        "ธนาคารกสิกรไทย",
        "ธนาคารกรุงไทย",
        "ธนาคารทหารไทย",
        "ธนาคารไทยพาณิชย์",
        "ธนาคารกรุงศรีอยุธยา",
        "ธนาคารเกียรตินาคิน",
        "ธนาคารซีไอเอ็มบีไทย",
        "ธนาคารทิสโก้",
        "ธนาคารธนชาต",
        "ธนาคารยูโอบี",
        "ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย)",
        "ธนาคารไทยเครดิตเพื่อรายย่อย",
        "ธนาคารแลนด์ แอนด์ เฮาส์ ",
        "ธนาคารไอซีบีซี (ไทย)",
        "ธนาคารพัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย",
        "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร",
        "ธนาคารเพื่อการส่งออกและนำเข้าแห่งประเทศไทย",
        "ธนาคารออมสิน",
        "ธนาคารอาคารสงเคราะห์",
        "ธนาคารอิสลามแห่งประเทศไทย",
        "ธนาคารแห่งประเทศจีน",
        "ธนาคารซูมิโตโม มิตซุย ทรัสต์ (ไทย)",
        "ธนาคารฮ่องกงและเซี้ยงไฮ้แบงกิ้งคอร์ปอเรชั่น จำกัด",
    ];
    let selectedWithdrawlMethod = $state(null);
    let withdrawlBankNumber = $state("");
    let withdrawlBankName = $state("");
    let withdrawlAmount = $state(0);
    async function handleWithdraw(event: SubmitEvent) {
        event.preventDefault();
        loadingWithdraw = true;
        try {
            if (!withdrawlBankName || !withdrawlAmount || !withdrawlBankNumber)
                return toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
            const { data: result, error } = await client.api.v1.shops[
                data.shop.id
            ].withdrawl.post({
                amount: withdrawlAmount,
                detail: `ธนาคาร: ${selectedWithdrawlMethod}
เลขบัญชี: ${withdrawlBankNumber}
ชื่อบัญชี: ${withdrawlBankName}`,
            });

            if (error?.data?.error) {
                toast.error(error.data.error);
            } else {
                toast.success("ส่งคำขอถอนเงินสำเร็จแล้ว");
            }
            await invalidateAll();
        } catch (error) {
            console.error(error);
            toast.error("เกิดข้อผิดพลาดในการขอถอนเงิน");
        } finally {
            loadingWithdraw = false;
            openWithdrawModal = false;
        }
    }
</script>

<div class="flex flex-col gap-5 mt-5">
    <div class="flex items-center gap-4">
        <a
            href="/seller/shops"
            class="hover:bg-accent transition-colors p-2 rounded-full"
        >
            <ArrowLeft size={20} />
        </a>
        <h1 class="text-2xl font-bold">{data.shop.name}</h1>
    </div>

    <div
        class="bg-background border rounded-lg shadow p-6 flex items-center gap-4"
    >
        <div class="rounded-full bg-green-100 p-3">
            <Wallet class="text-green-600" size={24} />
        </div>
        <Label class="w-full">ยอดเงินในร้านของคุณ</Label>
        <div class="flex flex-col">
            <div class="flex gap-3 items-center text-xl font-bold">
                <span class="text-blue-600"
                    >{data.shop.balance.toFixed(2)}฿</span
                >
            </div>
            <div class="text-xs text-primary/60">
                {data.shop.balance
                    ? `(${ThaiBahtText(data.shop.balance)})`
                    : ""}
            </div>
        </div>

        <Button
            onclick={() => (openWithdrawModal = true)}
            class="bg-blue-600 text-white p-6 font-bold">ทำเริ่องถอนเงิน</Button
        >
    </div>
    <div
        class="bg-background border rounded-lg shadow p-6 flex items-center gap-4"
    >
        <Link class="size-10" />
        <Label class="w-full">ลิ้งร้านของคุณ</Label>
        <Input value="sellvat.com/shop/{data.shop.slug}/" />
    </div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
            class="bg-background border rounded-lg shadow p-6 flex items-center gap-4"
        >
            <div class="rounded-full bg-purple-100 p-3">
                <DollarSign class="text-purple-600" size={24} />
            </div>
            <div>
                <p class="text-sm text-muted-foreground">ยอดขายทั้งหมด</p>
                <p class="font-bold text-xl">
                    {formatCurrency(data.shop.balance)}
                </p>
            </div>
        </div>

        <div
            class="bg-background border rounded-lg shadow p-6 flex items-center gap-4"
        >
            <div class="rounded-full bg-blue-100 p-3">
                <ShoppingBag class="text-blue-600" size={24} />
            </div>
            <div>
                <p class="text-sm text-muted-foreground">คำสั่งซื้อทั้งหมด</p>
                <p class="font-bold text-xl">{data.shop._count.orders}</p>
            </div>
        </div>

        <div
            class="bg-background border rounded-lg shadow p-6 flex items-center gap-4"
        >
            <div class="rounded-full bg-orange-100 p-3">
                <Package class="text-orange-600" size={24} />
            </div>
            <div>
                <p class="text-sm text-muted-foreground">สินค้าทั้งหมด</p>
                <p class="font-bold text-xl">{data.shop._count.products}</p>
            </div>
        </div>
    </div>

    <!-- Navigation Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <a
            href="/seller/shops/{data.shop.id}/products"
            class="bg-background border rounded-lg shadow p-6 hover:bg-accent transition-colors"
        >
            <Tag size={24} class="mb-3 text-primary" />
            <h3 class="font-semibold">จัดการสินค้า</h3>
            <p class="text-sm text-muted-foreground mt-1">
                เพิ่ม/แก้ไขสินค้าและสต็อก
            </p>
        </a>

        <a
            href="/seller/shops/{data.shop.id}/orders"
            class="bg-background border rounded-lg shadow p-6 hover:bg-accent transition-colors"
        >
            <ShoppingBag size={24} class="mb-3 text-primary" />
            <h3 class="font-semibold">คำสั่งซื้อ</h3>
            <p class="text-sm text-muted-foreground mt-1">
                จัดการคำสั่งซื้อทั้งหมด
            </p>
        </a>

        <a
            href="/seller/shops/{data.shop.id}/analytics"
            class="bg-background border rounded-lg shadow p-6 hover:bg-accent transition-colors"
        >
            <TrendingUp size={24} class="mb-3 text-primary" />
            <h3 class="font-semibold">วิเคราะห์</h3>
            <p class="text-sm text-muted-foreground mt-1">
                สถิติและรายงานยอดขาย
            </p>
        </a>

        <a
            href="/seller/shops/{data.shop.id}/settings"
            class="bg-background border rounded-lg shadow p-6 hover:bg-accent transition-colors"
        >
            <Settings size={24} class="mb-3 text-primary" />
            <h3 class="font-semibold">ตั้งค่าร้านค้า</h3>
            <p class="text-sm text-muted-foreground mt-1">แก้ไขข้อมูลร้านค้า</p>
        </a>
    </div>

    <!-- Recent Orders -->
    <div class="bg-background mt-4">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">คำสั่งซื้อล่าสุด</h2>
            <a
                href="/seller/shops/{data.shop.id}/orders"
                class="text-blue-600 text-sm hover:underline">ดูทั้งหมด</a
            >
        </div>

        {#if data.recentOrders && data.recentOrders.length > 0}
            <div class="overflow-x-auto rounded-lg border">
                <table class="min-w-full">
                    <thead class="bg-muted">
                        <tr>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >เลขที่สั่งซื้อ</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >สินค้า</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >จำนวน</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >ราคา</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >วันที่</th
                            >
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >สถานะ</th
                            >
                        </tr>
                    </thead>
                    <tbody class="bg-background">
                        {#each data.recentOrders as order}
                            <tr>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground"
                                    >#{order.id}</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-muted-foreground"
                                    >{order.product_name}</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground"
                                    >{order.quantity}</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground"
                                    >{formatCurrency(order.price)}</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground"
                                >
                                    {new Date(
                                        order.createdAt,
                                    ).toLocaleDateString("th-TH")}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                        {order.status === 'SUCCESS'
                                            ? 'bg-green-100 text-green-800'
                                            : order.status === 'PENDING'
                                              ? 'bg-yellow-100 text-yellow-800'
                                              : 'bg-red-100 text-red-800'}"
                                    >
                                        {order.status === "SUCCESS"
                                            ? "สำเร็จ"
                                            : order.status === "PENDING"
                                              ? "รอดำเนินการ"
                                              : order.status === "CANCELLED"
                                                ? "ยกเลิก"
                                                : "ยกเลิกและคืนเงิน"}
                                    </span>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {:else}
            <p class="text-muted-foreground text-center py-4">
                ยังไม่มีคำสั่งซื้อ
            </p>
        {/if}
    </div>
</div>

<Modal
    bind:open={openWithdrawModal}
    loading={loadingWithdraw}
    class="p-4 lg:px-8"
>
    <div class="flex place-items-center sm:pt-4">
        <h2 class="text-2xl font-semibold">ทำเริ่องถอนเงิน</h2>
    </div>
    <form onsubmit={handleWithdraw} class="py-4 flex flex-col gap-5">
        <div>
            คุณสามารถทำเรื่องถอนเงินได้เดือนละ 2 ครั้งและต้องรับทราบ <a
                class="border-b text-gray-600"
                href="/policy">เงื่อนไขการถอนเงิน</a
            >
        </div>
        <div
            class="border rounded-lg p-5 flex gap-5 items-center hover:bg-accent transition-colors"
        >
            <Ghost />
            <div>
                <Label>โควต้าเดือนนี้</Label>
                <div>
                    เหลือ <span class="text-blue-600 font-bold">2</span> ครั้ง
                </div>
            </div>
        </div>
        <div>
            <Label>ธนาคารที่ต้องการถอน</Label>
            <Select.Root type="single" bind:value={selectedWithdrawlMethod}>
                <Select.Trigger
                    >{selectedWithdrawlMethod || "เลือกธนาคาร"}</Select.Trigger
                >
                <Select.Content>
                    {#each withdrawlMethods as method}
                        <Select.Item value={method}>{method}</Select.Item>
                    {/each}
                </Select.Content>
            </Select.Root>
        </div>

        <div>
            <Label>เลขบัญชี</Label>
            <Input
                bind:value={withdrawlBankNumber}
                type="text"
                placeholder="526493..."
            />
        </div>
        <div>
            <Label>ชื่อบัญชี</Label>
            <Input
                bind:value={withdrawlBankName}
                type="text"
                placeholder="ยิ่งลักษณ์ ชินวั..."
            />
        </div>

        <div>
            <Label>จำนวนเงินที่ต้องการถอน</Label>
            <Input
                type="number"
                min="0"
                max="1000000"
                placeholder="จำนวนเงิน"
            />
        </div>
        <div
            class="p-6 rounded-lg bg-green-100 dark:bg-green-900 text-primary flex gap-3"
        >
            <ShieldCheck />เราจะโอนเงินให้คุณภายใน 24 ชั่วโมง
        </div>

        <Button type="submit" class="bg-blue-600 text-white p-6 font-bold"
            >ถอนเงิน</Button
        >
    </form>
</Modal>
