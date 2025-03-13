<script>
  import { ModeWatcher } from "mode-watcher";


  import { Toaster } from "$lib/components/ui/sonner";
    import '../app.css';
	let { children } = $props();
</script>


<svelte:head>
    <meta charset="UTF-8">
    <title>SellVat | ระบบร้านค้าออนไลน์ครบวงจร จัดการสินค้า การขาย และการจัดส่งในที่เดียว</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="เริ่มต้นธุรกิจออนไลน์กับ SellVat - ระบบร้านค้าออนไลน์ครบวงจร รองรับการจัดการสินค้า ชำระเงินหลายช่องทาง วิเคราะห์ยอดขาย และระบบจัดส่งอัตโนมัติ เริ่มต้นฟรี พร้อมให้คำปรึกษา 24/7">
    <meta name="keywords" content="ระบบร้านค้าออนไลน์, e-commerce, ขายของออนไลน์, จัดการสินค้า, ระบบจัดส่ง, วิเคราะห์ยอดขาย, SellVat">
    <meta name="author" content="TeyvatBytes Inc.">
    <meta name="robots" content="index, follow">

    <!-- Open Graph Tags -->
    <meta property="og:title" content="SellVat | ระบบร้านค้าออนไลน์ครบวงจร จัดการสินค้า การขาย และการจัดส่งในที่เดียว">
    <meta property="og:description" content="เริ่มต้นธุรกิจออนไลน์ง่ายๆ กับ SellVat ระบบที่ครบครันสำหรับธุรกิจทุกขนาด ใช้งานง่าย มีฟีเจอร์ครบวงจร เริ่มต้นฟรี">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.sellvat.com/">
    <meta property="og:image" content="https://www.sellvat.com/assets/ogg.png">
    <meta property="og:image:alt" content="SellVat - ระบบร้านค้าออนไลน์">
    <meta property="og:site_name" content="SellVat">
    <meta property="og:locale" content="th_TH">

    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="SellVat | ระบบร้านค้าออนไลน์ครบวงจร">
    <meta name="twitter:description" content="เริ่มต้นธุรกิจออนไลน์ง่ายๆ กับ SellVat ระบบที่ครบครันสำหรับธุรกิจทุกขนาด ใช้งานง่าย มีฟีเจอร์ครบวงจร เริ่มต้นฟรี">
    <meta name="twitter:image" content="https://www.sellvat.com/assets/ogg.png">

    <!-- Additional SEO Tags -->
    <link rel="canonical" href="https://www.sellvat.com/">
    <meta name="theme-color" content="#4F46E5">
</svelte:head>

<Toaster />

<ModeWatcher />
{@render children()}
