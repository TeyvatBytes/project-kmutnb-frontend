<script lang="ts">
    import { DollarSign } from "lucide-svelte";
</script>

<button class="flex items-center rounded-lg overflow-hidden text-xs group">
    <div
        class="bg-orange-200 group-hover:bg-orange-300 px-3 py-2 transition-colors"
    >
        คงเหลือ 100.00 บาท
    </div>
    <div
        class="flex items-center group-hover:bg-accent bg-orange-500 px-3 py-2 text-white transition-colors"
    >
        เติมเงิน
        <DollarSign class="w-4 h-4" />
    </div>
</button>
