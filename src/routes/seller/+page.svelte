<script>
    import { userStore } from "$lib/store/auth";
    import {
        DollarSign,
        Landmark,
        MessageCircleQuestion,
        Store,
    } from "lucide-svelte";
</script>

<div class="flex flex-col gap-3">
    <div class="w-full p-10 py-32 border rounded-lg text-5xl font-bold">
        👋 สวัสดี {$userStore.username}
    </div>
    <div class="grid grid-cols-2 gap-3">
        <a
            href="/seller/shops"
            class="relative border rounded-lg p-10 overflow-hidden h-48 group"
        >
            <div class="text-2xl font-bold">จัดการร้านค้าของคุณ</div>
            <Store
                class="absolute w-full h-full group-hover:scale-150 transition-all -rotate-6 text-gray-400"
            />
        </a>

        <a
            href="#"
            class="relative border rounded-lg p-10 overflow-hidden h-48 group opacity-40 cursor-not-allowed"
        >
            <div class="text-2xl font-bold">ตั้งค่าบัญชีการขาย</div>
            <DollarSign
                class="absolute w-full h-full group-hover:scale-150 transition-all -rotate-6 text-gray-400"
            />
        </a>

        <a
            href="#"
            class="relative col-span-2 border rounded-lg p-10 overflow-hidden h-48 group"
        >
            <div class="text-2xl font-bold">เรียนรู้การใช้งานระบบ</div>
            <MessageCircleQuestion
                class="absolute w-full h-full group-hover:scale-150 transition-all -rotate-6 text-gray-400"
            />
        </a>

        <div class="col-span-full text-xl font-bold">🛠️ โซนนักพัฒนา</div>
        <a
            href="/seller/withdrawl"
            class="relative col-span-2 border rounded-lg p-10 overflow-hidden h-48 group"
        >
            <div class="text-2xl font-bold">จัดการคำขอถอนเงิน</div>
            <Landmark
                class="absolute w-full h-full group-hover:scale-150 transition-all -rotate-6 text-gray-400"
            />
        </a>
    </div>
</div>
