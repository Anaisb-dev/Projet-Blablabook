
<!-- MENU HAMBURGER — Version mobile et tablette                  -->
<!-- S'affiche quand on clique sur le bouton ☰ dans le header    -->
<!-- Composant Bits UI : gestion automatique ouverture/fermeture  -->


<!-- JS -->
<script>
    // DropdownMenu : composant Bits UI qui gère l'ouverture/fermeture du menu
    import { DropdownMenu } from "bits-ui";
    // Icon : composant pour afficher des icônes depuis la librairie Iconify
    import Icon from "@iconify/svelte";
    // authStore : store global qui contient le token JWT si l'utilisateur est connecté
    // clearAuth : fonction qui supprime le token et déconnecte l'utilisateur
    import { authStore, clearAuth } from "../store/auth.svelte";
    // push : fonction de navigation programmatique du router Svelte
    import { push } from "svelte-spa-router";

    // Fonction de déconnexion :
    // 1. On redirige vers l'accueil
    // 2. On supprime le token JWT avec un léger délai pour éviter les conflits
    function logout() {
        push("/#/");
        setTimeout(() => clearAuth(), 0);
    }
</script>

<DropdownMenu.Root>

    <!-- Bouton ☰ qui ouvre/ferme le menu -->
    <!-- outline-none : supprime le contour bleu du navigateur au clic -->
    <DropdownMenu.Trigger class="text-2xl outline-none focus:outline-none cursor-pointer">
        ☰
    </DropdownMenu.Trigger>

    <!-- Contenu du menu — s'affiche en plein écran sur mobile -->
    <!-- z-50 : s'affiche par-dessus tous les autres éléments de la page -->
    <DropdownMenu.Content
        class="w-[100vw] h-[100vh] p-10 flex flex-col gap-4 bg-[#FFF7F1] z-50"
    >

        <!-- Lien vers la page d'accueil — toujours visible -->
        <DropdownMenu.Item
            class="flex items-center p-4 justify-center gap-1 border rounded-3xl outline-none focus:outline-none cursor-pointer"
        >
            <a href="/" class="flex items-center justify-center gap-2 w-full">
                <Icon icon="ph:house" />
                Accueil
            </a>
        </DropdownMenu.Item>

        <!-- Lien vers la bibliothèque publique — toujours visible -->
        <DropdownMenu.Item
            class="flex items-center p-4 justify-center gap-1 border rounded-3xl outline-none focus:outline-none cursor-pointer"
        >
            <a href="/#/books" class="flex items-center justify-center gap-2 w-full">
                <Icon icon="ph:books-thin" />
                Bibliothèque
            </a>
        </DropdownMenu.Item>

        <!-- Liens conditionnels selon l'état de connexion -->
        <!-- authStore.token existe → utilisateur connecté -->
        <!-- authStore.token absent → utilisateur non connecté -->
        {#if authStore.token}

            <!-- Utilisateur connecté : affiche Ma Bibliothèque et Se déconnecter -->
            <DropdownMenu.Item
                class="flex items-center p-4 justify-center gap-1 border rounded-3xl outline-none focus:outline-none cursor-pointer"
            >
                <a href="/#/profile" class="flex items-center justify-center gap-2 w-full">
                    <Icon icon="game-icons:read" />
                    Ma Bibliothèque
                </a>
            </DropdownMenu.Item>

            <!-- Bouton de déconnexion : appelle la fonction logout() définie dans le script -->
            <DropdownMenu.Item
                class="flex items-center p-4 justify-center gap-2 border rounded-3xl outline-none focus:outline-none cursor-pointer"
                onclick={logout}
            >
                <Icon icon="ph:sign-out" />
                Se déconnecter
            </DropdownMenu.Item>

        {:else}

            <!-- Utilisateur non connecté : affiche Se connecter et Créer un compte -->
            <DropdownMenu.Item
                class="flex items-center p-4 justify-center gap-1 border rounded-3xl outline-none focus:outline-none cursor-pointer"
            >
                <a href="/#/login" class="flex items-center justify-center gap-2 w-full">
                    <Icon icon="ph:sign-in" />
                    Se connecter
                </a>
            </DropdownMenu.Item>

            <DropdownMenu.Item
                class="flex items-center p-4 justify-center gap-1 border rounded-3xl outline-none focus:outline-none cursor-pointer"
            >
                <a href="/#/register" class="flex items-center justify-center gap-2 w-full">
                    <Icon icon="ph:user-plus" />
                    Créer un compte
                </a>
            </DropdownMenu.Item>

        {/if}

    </DropdownMenu.Content>
</DropdownMenu.Root>