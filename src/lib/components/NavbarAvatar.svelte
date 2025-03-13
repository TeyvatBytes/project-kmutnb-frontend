<script>
    import { ChevronDown } from "lucide-svelte";

    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
    import AddCredit from "./AddCredit.svelte";
    import { logout } from "$lib/api";
    import { userStore } from "$lib/store/auth";
    import ModeSwitchButton from "./ModeSwitchButton.svelte";
    import { page } from "$app/state";

    let showCreditModal = $state(false);
</script>

<div class="flex gap-3">
    <ModeSwitchButton />
    {#if $userStore}
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button class="flex items-center" variant="outline">
                    <img
                        src="http://github.com/chanios.png"
                        class="rounded-full"
                        alt="chanios"
                        width="30"
                    />
                    {$userStore.username} -
                    {$userStore.balance.toFixed(2)} บาท
                    <div class="text-muted-foreground">
                        <ChevronDown />
                    </div>
                </Button></DropdownMenu.Trigger
            >
            <DropdownMenu.Content>
                <DropdownMenu.Group>
                    <DropdownMenu.GroupHeading
                        >@{$userStore.username}</DropdownMenu.GroupHeading
                    >
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item onclick={() => (showCreditModal = true)}
                        >เพิ่มเครดิต</DropdownMenu.Item
                    >
                    <a href="/@me/orders">
                        <DropdownMenu.Item>ออเดอร์</DropdownMenu.Item>
                    </a>
                    <DropdownMenu.Item onclick={logout} class="text-red-600"
                        >ออกจากระบบ</DropdownMenu.Item
                    >
                    <DropdownMenu.Separator />
                    <a href="/seller">
                        <DropdownMenu.Item>ร้านของคุณ</DropdownMenu.Item></a
                    >
                </DropdownMenu.Group>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
        <AddCredit bind:open={showCreditModal} />
    {:else}
        <div class="flex gap-4 items-center">
            <Button
                href="/login?returnUrl={encodeURIComponent(page.url.href)}"
                variant="outline"
                class="border text-sm">เข้าสู่ระบบ</Button
            >
            <Button
                class="text-primary-foreground text-sm"
                href="/register?returnUrl={encodeURIComponent(page.url.href)}"
                >สมัครใช้งาน</Button
            >
        </div>
    {/if}
</div>
