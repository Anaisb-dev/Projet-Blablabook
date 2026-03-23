<!-- JS -->
<script>
    import { Avatar, DropdownMenu } from "bits-ui";
    import Icon from "@iconify/svelte";
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        ☰
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
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