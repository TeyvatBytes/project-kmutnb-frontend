<script>
    import { ChevronDown } from "lucide-svelte";

    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        <Button class="flex items-center" variant="outline">
            <img
                src="http://github.com/chanios.png"
                class="rounded-full"
                alt="chanios"
                width="30"
            />
            chanios
            <div class="text-muted-foreground">
                <ChevronDown />
            </div>
        </Button></DropdownMenu.Trigger
    >
    <DropdownMenu.Content>
        <DropdownMenu.Group>
            <DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Profile</DropdownMenu.Item>
            <DropdownMenu.Item>Billing</DropdownMenu.Item>
            <DropdownMenu.Item>Team</DropdownMenu.Item>
            <DropdownMenu.Item>Subscription</DropdownMenu.Item>
        </DropdownMenu.Group>
    </DropdownMenu.Content>
</DropdownMenu.Root>
