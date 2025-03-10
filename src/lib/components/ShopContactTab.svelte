<script>
    let { shop } = $props();
    import Markdown from "svelte-exmarkdown";

    let markdownContent =
        shop.contact ||
        `
- **Line Official**: @gameshop (อย่าลืมใส่ @ นำหน้า)
- **Facebook**: Facebook.com/TopupGameShop
- **เบอร์โทรศัพท์**: 099-123-4567 (เปิดให้บริการทุกวัน 10.00 - 22.00 น.)
- **อีเมล**: support@gameshoptopu.com
- **เว็บไซต์**: www.gameshoptopup.com

บริการของเรา:
- เติมเงินเกมออนไลน์ทุกค่าย
- ซื้อไอเทมเกมและสกินต่างๆ
- บัตรเติมเงินเกมราคาพิเศษ
- โปรโมชั่นพิเศษทุกเดือน

ติดต่อเราได้ตลอด 24 ชั่วโมง ผ่านช่องทางออนไลน์ กรณีเร่งด่วนสามารถติดต่อผ่านเบอร์โทรศัพท์ในเวลาทำการได้ครับ`;
</script>

<div class="p-3 border rounded-xl">
    <Markdown md={markdownContent} />
</div>
