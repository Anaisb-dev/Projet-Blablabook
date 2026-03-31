<!-- JS -->
<script>
    import { DropdownMenu } from "bits-ui";
    import Icon from "@iconify/svelte";    
    import { authStore, clearAuth } from "../store/auth.svelte";
    import { push } from "svelte-spa-router";

    function logout() {
        clearAuth();
        push("/#/login");
    }
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger class="text-2xl">
        ☰
    </DropdownMenu.Trigger>

    <DropdownMenu.Content class="w-[100vw] h-[100vh] p-10 flex flex-col gap-4 bg-[#FFF7F1]">
        <DropdownMenu.Item class="flex items-center p-4 justify-center gap-1 border rounded-3xl">
            <a href="/" class="flex items-center justify-center gap-2 w-full">
                <Icon icon="ph:house" />
                Accueil
            </a>
        </DropdownMenu.Item>

        <DropdownMenu.Item class="flex items-center p-4 justify-center gap-1 border rounded-3xl">
            <a href="/#/books" class="flex items-center justify-center gap-2 w-full">
                <Icon icon="ph:books-thin" />
                Bibliothèque
            </a>
        </DropdownMenu.Item>

        {#if authStore.token}

            <DropdownMenu.Item class="flex items-center p-4 justify-center gap-1 border rounded-3xl">
                <a href="/#/profile" class="flex items-center justify-center gap-2 w-full">
                    <Icon icon="game-icons:read" />
                    Ma Bibliothèque
                </a>
            </DropdownMenu.Item>

            <DropdownMenu.Item
                class="flex items-center p-4 justify-center gap-2 border rounded-3xl cursor-pointer"
                onclick={() => {
                    logout();
                    push("/");
                }}>
                <Icon icon="ph:sign-out" />
                Se déconnecter
            </DropdownMenu.Item>

        {:else}

            <DropdownMenu.Item class="flex items-center p-4 justify-center gap-1 border rounded-3xl">
                <a href="/#/login" class="flex items-center justify-center gap-2 w-full">
                    <Icon icon="ph:sign-in" />
                    Se connecter
                </a>
            </DropdownMenu.Item>

            <DropdownMenu.Item class="flex items-center p-4 justify-center gap-1 border rounded-3xl">
                <a href="/#/register" class="flex items-center justify-center gap-2 w-full">
                    <Icon icon="ph:user-plus" />
                    Créer un compte
                </a>
            </DropdownMenu.Item>

        {/if}

    </DropdownMenu.Content>
</DropdownMenu.Root>