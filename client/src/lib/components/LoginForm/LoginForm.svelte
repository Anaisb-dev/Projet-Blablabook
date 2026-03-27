<script>
    import Input from "../ui/Input.svelte";
    import PasswordInput from "../ui/PasswordInput.svelte";
    import Button from "../ui/Button.svelte";
    import { loginUser } from "../../../../services/auth.service.js";

    let username = "";
    let password = "";
    let loading = false;
    let errorMessage = "";

    async function handleLogin() {
        if (!username || !password) {
            errorMessage = "Merci de remplir tous les champs";
            return;
        }

        loading = true;
        errorMessage = "";

        try {
            const data = await loginUser({ username, password });
            localStorage.setItem("token", data.token);
            window.location.href = "/profile";
        } catch (err) {
            errorMessage = err.message || "Erreur lors de la connexion";
        } finally {
            loading = false;
        }
    }
</script>

<h1 class="text-2xl font-bold mb-4 text-center p-10">Connexion</h1>

{#if errorMessage}
    <p class="text-red-500 text-center mb-4">{errorMessage}</p>
{/if}

<p class="text-center">Nom d'utilisateur</p>
<Input placeholder="Entrez votre username" bind:value={username} />

<p class="text-center">Mot de passe</p>
<PasswordInput bind:value={password} />

<Button on:click={handleLogin} active={loading}>
    {#if loading}Connexion...{:else}Se connecter{/if}
</Button>
