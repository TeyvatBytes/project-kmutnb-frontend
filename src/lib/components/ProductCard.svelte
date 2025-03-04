<script>
    import { Package2 } from "lucide-svelte";
</script>

<a class="border rounded-lg group" href="#">
    <div
        class="bg-background h-36 w-full flex items-center justify-center text-sky-500 relative"
    >
        <div
            class="absolute top-2 right-3 bg-accent/50 transition-colors group-hover:bg-accent px-2 rounded-lg text-primary"
        >
            รหัส
        </div>
        <Package2 class="w-10 h-10 group-hover:scale-125 transition-all" />
    </div>
    <div
        class="p-2 flex gap-3 justify-between flex-col bg-accent/50 transition-colors group-hover:bg-accent"
    >
        <div>หีเด็ก</div>
        <div class="flex justify-between">
            <div>
                <span class="text-sky-500 font-bold text-md">50.00 บาท</span>
            </div>

            <div>
                สต็อก
                <span class="text-green-500 text-md">254+</span>
            </div>
        </div>
    </div>
</a>
