<script>
    import BorderBeam from "./ui/border-beam/BorderBeam.svelte";
    import { Button } from "./ui/button";
</script>

<div class="mt-10">
    <div class="text-muted-foreground">โฆษณา</div>
    <div
        class="text-5xl font-bold relative border py-28 rounded-lg overflow-hidden"
    >
        <BorderBeam size={250} duration={5} />
        <div class="flex items-center justify-center flex-col gap-8">
            อยากมีร้านเป็นของตัวเองใช่ไหมหละ?
            <Button class="text-2xl p-7 px-14 font-bold">สร้างร้านเลย!</Button>
        </div>
    </div>
</div>
