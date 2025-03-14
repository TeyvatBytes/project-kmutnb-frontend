<script>
    import { Button } from "$lib/components/ui/button";
</script>

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
    <Button
        onclick={() => (step = 1)}
        class="p-6 bg-blue-600 text-white font-bold">เช็คสถานะ</Button
    >
</div>
