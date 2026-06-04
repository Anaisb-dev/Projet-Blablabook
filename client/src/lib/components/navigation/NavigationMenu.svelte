<script>
    import { authStore, clearAuth } from "../store/auth.svelte";
    import { push } from "svelte-spa-router";

    function logout() {
        clearAuth();
        push("/");
    }
</script>

<nav class="navigation-menu">
    <ul class="flex items-center gap-4">
        <li><a href="#/">Accueil</a></li>
        <li><a href="#/books">Bibliothèque</a></li>
        {#if authStore.token}
            <li><a href="#/profile">Mon Compte</a></li>
            <li>
                <a href="#/" onclick={logout}>Se déconnecter</a>
            </li>
        {:else}
            <li><a href="#/login">Se connecter</a></li>
            <li><a href="#/register">Créer un compte</a></li>
        {/if}
    </ul>
</nav>