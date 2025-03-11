<!-- SellVat Landing Page with premium, minimal style showcasing features -->
<script>
    import { onMount } from "svelte";
    import { Button } from "$lib/components/ui/button";
    import Globe from "$lib/components/ui/globe/Globe.svelte";
    import Copyright from "$lib/components/Copyright.svelte";
    import NavbarAvatar from "$lib/components/NavbarAvatar.svelte";

    let scrolled = false;

    // Add scroll effect for navbar
    onMount(() => {
        const handleScroll = () => {
            scrolled = window.scrollY > 10;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    // Features data
    const features = [
        {
            title: "จัดการสินค้า",
            desc: "บริหารคลังสินค้าได้ง่ายด้วยระบบที่ใช้งานง่าย ติดตามสต็อกและยอดขายได้แบบเรียลไทม์",
            image: "https://files.catbox.moe/2jjnra.png",
        },
        {
            title: "รับชำระเงินออนไลน์",
            desc: "รองรับการชำระเงินหลายรูปแบบ ทั้งบัตรเครดิต, โอนเงิน, QR Payment และอื่นๆ",
            image: "https://files.catbox.moe/znt21k.png",
        },
        {
            title: "วิเคราะห์ยอดขาย",
            desc: "ดูรายงานสรุปยอดขายและวิเคราะห์พฤติกรรมผู้ซื้อด้วยแดชบอร์ดที่เข้าใจง่าย",
            image: "https://files.catbox.moe/9987kh.png",
        },
        {
            title: "การจัดส่งอัตโนมัติ",
            desc: "เชื่อมต่อกับระบบขนส่งหลักได้ทันที พิมพ์ใบส่งสินค้าและติดตามพัสดุได้ในคลิกเดียว",
            image: "https://files.catbox.moe/j6dao0.png",
        },
    ];

    // Testimonials data
    const testimonials = [
        {
            name: "คุณนภา",
            business: "ร้านเสื้อผ้าออนไลน์",
            quote: "SellVat ช่วยให้ธุรกิจของฉันเติบโตขึ้น 200% ในปีที่ผ่านมา ระบบใช้งานง่ายและมีฟังก์ชั่นครบครัน",
            avatar: "/assets/imgs/angela.jpg",
        },
        {
            name: "คุณสมชาย",
            business: "ร้านอาหารเสริม",
            quote: "ผมประหยัดเวลาในการจัดการร้านได้มากกว่า 10 ชั่วโมงต่อสัปดาห์ ระบบรายงานยอดขายช่วยให้วางแผนธุรกิจได้ดีขึ้น",
            avatar: "/assets/imgs/somchai.jpg",
        },
    ];

    // Pricing plans
    const plans = [
        {
            name: "เริ่มต้น",
            price: "0",
            period: "ฟรีตลอดไป",
            features: [
                "จำนวนสินค้าสูงสุด 100 รายการ",
                "จำนวนหมวดสต็อกต่อสินค้า 50 รายการ",
                "รองรับการชำระเงิน 3 ช่องทาง",
                "รายงานพื้นฐาน",
                "ไม่มีค่าธรรมเนียมเพิ่มเติม",
            ],
            highlight: false,
        },
        {
            name: "ธุรกิจ",
            price: "2300",
            period: "ต่อเดือน",
            features: [
                "จำนวนสินค้าและหมวดหมู่ไม่จำกัด",
                "รองรับการชำระเงินทุกช่องทาง",
                "รายงานธุรกิจขั้นสูง",
                "API สำหรับเชื่อมต่อระบบ",
                "ระบบโปรโมชั่นและส่วนลด",
            ],
            highlight: true,
        },
        {
            name: "องค์กร",
            price: "35000",
            period: "ต่อเดือน",
            features: [
                "ทุกอย่างในแพคเกจธุรกิจ",
                "ระบบจัดการหลายสาขา",
                "API สำหรับเชื่อมต่อระบบ",
                "ผู้ดูแลระบบส่วนตัว",
                "การฝึกอบรมเฉพาะทาง",
            ],
            highlight: false,
        },
    ];
</script>

<div class="min-h-screen flex flex-col bg-white text-gray-800">
    <!-- Navigation -->
    <header
        class="px-6 py-4 transition-all duration-300 sticky top-0 z-50 {scrolled
            ? 'bg-white shadow-sm'
            : 'bg-white'}"
    >
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <a href="/" class="text-2xl font-bold text-gray-900">SellVat</a>

            <nav class="hidden md:flex gap-8 text-sm items-center">
                <a
                    href="#features"
                    class="text-gray-600 hover:text-gray-900 transition-colors"
                    >ฟีเจอร์</a
                >
                <a
                    href="#testimonials"
                    class="text-gray-600 hover:text-gray-900 transition-colors"
                    >รีวิว</a
                >
                <a
                    href="#pricing"
                    class="text-gray-600 hover:text-gray-900 transition-colors"
                    >ราคา</a
                >
                <a
                    href="#contact"
                    class="text-gray-600 hover:text-gray-900 transition-colors"
                    >ติดต่อเรา</a
                >
            </nav>

            <NavbarAvatar />
        </div>
    </header>

    <!-- Hero Section -->
    <section class="py-12 md:py-20 border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col md:flex-row gap-10 items-center">
                <div class="w-full md:w-1/2">
                    <h1 class="text-4xl font-bold mb-4">
                        ระบบร้านค้าออนไลน์<br />ที่ครบครันสำหรับ<span
                            class="text-blue-600">ธุรกิจ</span
                        >ของคุณ
                    </h1>
                    <p class="text-gray-600 mb-8">
                        ทำให้การเป็นเจ้าของธุรกิจของคุณง่ายขึ้น
                        ด้วยโซลูชั่นที่ครบวงจร จัดการสินค้า, การขาย,
                        และการจัดส่งได้ในที่เดียว
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <Button
                            href="/login"
                            class="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3"
                            >เริ่มต้นใช้งานฟรี</Button
                        >
                        <Button
                            href="/shop/demo"
                            variant="outline"
                            class="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3"
                            >ชมการสาธิต</Button
                        >
                    </div>
                </div>
                <div class="w-full md:w-1/2">
                    <img
                        src="https://files.catbox.moe/2w7857.png"
                        alt="SellVat Dashboard"
                        class="rounded-lg shadow-sm w-full"
                    />
                </div>
            </div>
            <!-- <div
                class="flex gap-10 py-10 justify-center items-center flex-col mt-5"
            >
                <div class="text-md text-gray-600">
                    เชื่อถือด้วยพาร์ทเนอร์ทางธุรกิจทั่วประเทศ
                </div>
                <div class="flex gap-20 grayscale contrast-200">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/CP_Group_Logo.svg/800px-CP_Group_Logo.svg.png"
                        alt="CP"
                        width="60"
                    />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/CP_Group_Logo.svg/800px-CP_Group_Logo.svg.png"
                        alt="CP"
                        width="60"
                    />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/CP_Group_Logo.svg/800px-CP_Group_Logo.svg.png"
                        alt="CP"
                        width="60"
                    />
                </div>
            </div> -->
        </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div class="p-6">
                    <div class="text-3xl font-bold mb-1">10,000+</div>
                    <div class="text-sm text-gray-500">ร้านค้า</div>
                </div>
                <div class="p-6">
                    <div class="text-3xl font-bold mb-1">5 ล้าน</div>
                    <div class="text-sm text-gray-500">รายการขาย</div>
                </div>
                <div class="p-6">
                    <div class="text-3xl font-bold mb-1">99.9%</div>
                    <div class="text-sm text-gray-500">อัพไทม์</div>
                </div>
                <div class="p-6">
                    <div class="text-3xl font-bold mb-1">24/7</div>
                    <div class="text-sm text-gray-500">การสนับสนุน</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-16">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold mb-4">ฟีเจอร์หลัก</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                    ระบบร้านค้าออนไลน์ที่มีทุกสิ่งที่คุณต้องการเพื่อเริ่มต้น
                    เติบโต และขยายธุรกิจของคุณ
                </p>
            </div>

            <div class="space-y-16">
                {#each features as feature, i}
                    <div
                        class="flex flex-col md:flex-row gap-10 items-center {i %
                            2 ===
                        1
                            ? 'md:flex-row-reverse'
                            : ''}"
                    >
                        <div class="w-full md:w-1/2">
                            <img
                                src={feature.image}
                                alt={feature.title}
                                class="rounded-lg shadow-sm w-full"
                            />
                        </div>
                        <div class="w-full md:w-1/2">
                            <h3 class="text-2xl font-bold mb-3">
                                {feature.title}
                            </h3>
                            <p class="text-gray-600 mb-5">{feature.desc}</p>
                            <div
                                class="flex items-center text-sm text-gray-500"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 mr-2 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                <span>เรียนรู้เพิ่มเติม</span>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Testimonial Section -->
    <section id="testimonials" class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold mb-4">ลูกค้าของเรา</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                    ธุรกิจนับพันเลือกใช้ SellVat
                    สำหรับเปิดร้านค้าออนไลน์ของพวกเขา
                </p>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
                {#each testimonials as testimonial}
                    <div class="bg-white p-8 rounded-lg border border-gray-200">
                        <div class="flex items-start mb-4">
                            <div class="mr-4">
                                <div
                                    class="w-12 h-12 rounded-full overflow-hidden bg-gray-100"
                                >
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        class="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div>
                                <h4 class="font-bold">{testimonial.name}</h4>
                                <p class="text-sm text-gray-500">
                                    {testimonial.business}
                                </p>
                            </div>
                        </div>
                        <p class="text-gray-600">"{testimonial.quote}"</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-16">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold mb-4">แพคเกจราคา</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                    เลือกแพคเกจที่เหมาะกับขนาดธุรกิจของคุณ
                    เริ่มต้นฟรีและปรับเปลี่ยนได้ตลอด
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                {#each plans as plan}
                    <div
                        class="border {plan.highlight
                            ? 'border-gray-900'
                            : 'border-gray-200'} rounded-lg overflow-hidden bg-white"
                    >
                        <div
                            class="p-6 {plan.highlight
                                ? 'bg-gray-900 text-white'
                                : ''}"
                        >
                            <h3 class="text-xl font-bold mb-1">{plan.name}</h3>
                            <div class="flex items-baseline">
                                <span class="text-3xl font-bold"
                                    >฿{plan.price}</span
                                >
                                <span
                                    class="text-sm ml-2 {plan.highlight
                                        ? 'text-gray-300'
                                        : 'text-gray-500'}">{plan.period}</span
                                >
                            </div>
                        </div>
                        <div class="p-6">
                            <ul class="space-y-3">
                                {#each plan.features as feature}
                                    <li class="flex items-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5 mr-2 text-green-500 flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span class="text-sm text-gray-600"
                                            >{feature}</span
                                        >
                                    </li>
                                {/each}
                            </ul>
                            <div class="mt-6">
                                <Button
                                    class="{plan.highlight
                                        ? 'bg-gray-900 hover:bg-gray-800'
                                        : 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700'} w-full py-3 {plan.highlight
                                        ? 'text-white'
                                        : ''}"
                                >
                                    {plan.price === "0"
                                        ? "เริ่มต้นฟรี"
                                        : "เลือกแพคเกจ"}
                                </Button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- CTA Banner -->
    <section class="py-16 border-t border-gray-200 mt-8 bg-gray-50">
        <div class="max-w-3xl mx-auto text-center px-6">
            <h2 class="text-2xl font-semibold mb-4">
                อยากมีร้านเป็นของตัวเองใช่ไหมคะ?
            </h2>
            <p class="text-gray-600 mb-8">
                เริ่มต้นธุรกิจออนไลน์ของคุณวันนี้กับ SellVat
                ระบบร้านค้าออนไลน์ที่ใช้งานง่าย
            </p>
            <Button class="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3">
                สร้างร้านเลย!
            </Button>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white py-8 border-t border-gray-200 mt-auto">
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
