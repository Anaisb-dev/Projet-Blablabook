<!-- JS -->
<script>
    import { DropdownMenu } from "bits-ui";
    import Icon from "@iconify/svelte";    
    </script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger class="text-2xl">
        ☰
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-[100vw] h-[100vh] p-10 flex flex-col gap-4 bg-[#FFF7F1]">
        <DropdownMenu.Item class="flex items-center p-4 justify-center gap-1 border rounded-3xl">
            <Icon icon="ph:house" />
            Accueil
        </DropdownMenu.Item>
        <DropdownMenu.Item class="flex items-center p-4 justify-center gap-1 border rounded-3xl">
            <a href="/#/library">
            <Icon icon="ph:books-thin" />
            Bibliothèque
            </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item class="flex items-center p-4 justify-center gap-1 border rounded-3xl">
            <a href="/#/login">
            <Icon icon="ph:sign-in" />
            Se Connecter
            </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item class="flex items-center p-4 justify-center gap-1 border rounded-3xl">
            <a href="/#/register">
            <Icon icon="ph:user-plus" />
            Créer un compte
            </a>
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>