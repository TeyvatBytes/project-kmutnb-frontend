<script>
    import Copyright from '$lib/components/Copyright.svelte';
    import NavbarAvatar from '$lib/components/NavbarAvatar.svelte';
    import { onMount } from 'svelte';

  let {children} = $props()


  let scrolled = $state(false);

  // Add scroll effect for navbar
  onMount(() => {
      const handleScroll = () => {
          scrolled = window.scrollY > 10;
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
  });

</script>

<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="เริ่มต้นธุรกิจออนไลน์กับ SellVat - ระบบร้านค้าออนไลน์ครบวงจร รองรับการจัดการสินค้า ชำระเงินหลายช่องทาง วิเคราะห์ยอดขาย และระบบจัดส่งอัตโนมัติ เริ่มต้นฟรี พร้อมให้คำปรึกษา 24/7">
    <meta name="keywords" content="ระบบร้านค้าออนไลน์, e-commerce, ขายของออนไลน์, จัดการสินค้า, ระบบจัดส่ง, วิเคราะห์ยอดขาย, SellVat">
    <meta name="author" content="TeyvatBytes Inc.">
    <meta name="robots" content="index, follow">

    <!-- Open Graph Tags -->
    <meta property="og:title" content="SellVat | ระบบร้านค้าออนไลน์ครบวงจร จัดการสินค้า การขาย และการจัดส่งในที่เดียว">
    <meta property="og:description" content="เริ่มต้นธุรกิจออนไลน์ง่ายๆ กับ SellVat ระบบที่ครบครันสำหรับธุรกิจทุกขนาด ใช้งานง่าย มีฟีเจอร์ครบวงจร เริ่มต้นฟรี">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://sellvat.com/">
    <meta property="og:image" content="https://sellvat.com/assets/imgs/ogg.png">
    <meta property="og:image:alt" content="SellVat - ระบบร้านค้าออนไลน์">

    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="SellVat | ระบบร้านค้าออนไลน์ครบวงจร">
    <meta name="twitter:description" content="เริ่มต้นธุรกิจออนไลน์ง่ายๆ กับ SellVat ระบบที่ครบครันสำหรับธุรกิจทุกขนาด ใช้งานง่าย มีฟีเจอร์ครบวงจร เริ่มต้นฟรี">
    <meta name="twitter:image" content="https://sellvat.com/assets/imgs/ogg.png">
</svelte:head>

<div class="min-h-screen flex flex-col bg-background text-primary">
    <!-- Navigation -->
    <header
        class="py-4 transition-all duration-300 sticky top-0 z-50 {scrolled
            ? 'bg-background shadow-sm'
            : 'bg-background'}"
    >
        <div class="max-w-7xl px-6 mx-auto flex justify-between items-center">
            <a href="/" class="text-3xl font-extrabold text-primary">SellVat</a>

            <nav class="hidden md:flex gap-8 text-sm items-center">
                <a
                    href="#features"
                    class="text-muted-foreground/60 hover:text-muted-foreground/80 transition-colors"
                    >ฟีเจอร์</a
                >
                <a
                    href="#testimonials"
                    class="text-muted-foreground/60 hover:text-muted-foreground/80 transition-colors"
                    >รีวิว</a
                >
                <a
                    href="#pricing"
                    class="text-muted-foreground/60 hover:text-muted-foreground/80 transition-colors"
                    >ราคา</a
                >
                <a
                    href="#contact"
                    class="text-muted-foreground/60 hover:text-muted-foreground/80 transition-colors"
                    >ติดต่อเรา</a
                >
            </nav>

            <NavbarAvatar />
        </div>
    </header>
    {@render children()}

    <!-- Footer -->
    <footer class="bg-background py-8 mt-auto">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-sm font-semibold mb-4">SellVat</h3>
                    <p class="text-xs text-gray-500 mb-4">
                        ระบบร้านค้าออนไลน์ที่ครบวงจรสำหรับธุรกิจทุกขนาด
                    </p>
                </div>

                <div>
                    <h3 class="text-sm font-semibold mb-4">ผลิตภัณฑ์</h3>
                    <ul class="space-y-2">
                        <li>
                            <a
                                href="#"
                                class="text-xs text-gray-500 hover:text-gray-900"
                                >ฟีเจอร์</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="text-xs text-gray-500 hover:text-gray-900"
                                >ราคา</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="text-xs text-gray-500 hover:text-gray-900"
                                >แพลตฟอร์ม</a
                            >
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-sm font-semibold mb-4">บริษัท</h3>
                    <ul class="space-y-2">
                        <li>
                            <a
                                href="#"
                                class="text-xs text-gray-500 hover:text-gray-900"
                                >เกี่ยวกับเรา</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="text-xs text-gray-500 hover:text-gray-900"
                                >ติดต่อเรา</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="text-xs text-gray-500 hover:text-gray-900"
                                >ข่าวสาร</a
                            >
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-sm font-semibold mb-4">ช่วยเหลือ</h3>
                    <ul class="space-y-2">
                        <li>
                            <a
                                href="#"
                                class="text-xs text-gray-500 hover:text-gray-900"
                                >ศูนย์ช่วยเหลือ</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="text-xs text-gray-500 hover:text-gray-900"
                                >เอกสาร</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="text-xs text-gray-500 hover:text-gray-900"
                                >นโยบาย</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
            <Copyright />
        </div>
    </footer>
</div>
