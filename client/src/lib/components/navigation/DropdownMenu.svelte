<!-- JS -->
<script>
    import { DropdownMenu } from "bits-ui";
    import Icon from "@iconify/svelte";    
    </script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger class="text-2xl">
        ☰
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-[90vw] h-[80vh]">
        <DropdownMenu.Item>
            <Icon icon="ph:house" />
            Accueil
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <Icon icon="ph:books-thin" />
            Bibliothèque
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <Icon icon="ph:sign-in" />
            Se Connecter
        </DropdownMenu.Item>
        <DropdownMenu.Item>
            <Icon icon="ph:user-plus" />
            Créer un compte
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>