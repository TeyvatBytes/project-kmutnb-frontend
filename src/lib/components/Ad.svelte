<script>
    import BorderBeam from "./ui/border-beam/BorderBeam.svelte";
    import { Button } from "./ui/button";
</script>

<div class="mt-10">
    <div class="text-muted-foreground">โฆษณา</div>
    <div
        class="relative border py-16 rounded-lg overflow-hidden group group-hover:bg-accent transition-colors"
    >
        <div class="flex items-center justify-center flex-col gap-8">
            <div class="flex flex-col justify-center items-center gap-3">
                <div class="text-3xl font-bold">
                    อยากมีร้านเป็นของตัวเองใช่ไหมหละ?
                </div>
                <p>
                    เริ่มต้นธุรกิจออนไลน์ของคุณวันนี้กับ SellVat
                    ระบบร้านค้าออนไลน์ที่ใช้งานง่าย
                </p>
            </div>
            <Button class="text-xl p-6 px-14">สร้างร้านเลย!</Button>
        </div>
    </div>
</div>
