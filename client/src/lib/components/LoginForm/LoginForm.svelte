<script>
    import Input from "../ui/Input.svelte";
    import PasswordInput from "../ui/PasswordInput.svelte";
    import Button from "../ui/Button.svelte";
    import { loginUser } from "../../../../services/auth.service.js";

    let identifier = "";
    let password = "";
    let errorMessage = "";
    let loading = false;

    const handleLogin = async () => {
        if (!identifier || !password) {
            errorMessage = "Merci de remplir tous les champs";
            return;
        }

        loading = true;
        errorMessage = "";

        try {
            await loginUser(identifier.toString(), password.toString());
        window.location.hash = "/profile";
        } catch (err) {
            console.error("Erreur login :", err);
            errorMessage = err.message || "Identifiants invalides";
        } finally {
            loading = false;
        }
    };
</script>

<h1 class="text-2xl font-bold mb-4 text-center p-10">Connexion</h1>

{#if errorMessage}
    <p class="text-red-500 text-center mb-4">{errorMessage}</p>
{/if}

<p class="text-center">Nom d'utilisateur ou email</p>
<Input placeholder="Entrez votre identifiant" bind:value={identifier} />

<p class="text-center">Mot de passe</p>
<PasswordInput bind:value={password} />

<Button on:click={handleLogin} disabled={loading}>
    {#if loading}Connexion...{:else}Se connecter{/if}
</Button>
