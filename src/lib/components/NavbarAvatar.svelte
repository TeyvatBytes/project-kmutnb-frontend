<script>
    import { ChevronDown } from "lucide-svelte";

    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
    import AddCredit from "./AddCredit.svelte";
    import { logout } from "$lib/api";
    import { userStore } from "$lib/store/auth";

    let showCreditModal = $state(false);
</script>

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
                <DropdownMenu.GroupHeading>@chanios</DropdownMenu.GroupHeading>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onclick={() => (showCreditModal = true)}
                    >เพิ่มเครดิต</DropdownMenu.Item
                >
                <DropdownMenu.Item>ออเดอร์</DropdownMenu.Item>
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
            href="/login"
            variant="outline"
            class="border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
            >เข้าสู่ระบบ</Button
        >
        <Button
            class="bg-gray-900 hover:bg-gray-800 text-white text-sm"
            href="/register">สมัครใช้งาน</Button
        >
    </div>
{/if}
