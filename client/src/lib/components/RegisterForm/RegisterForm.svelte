<script>
    import Input from "../ui/Input.svelte";
    import PasswordInput from "../ui/PasswordInput.svelte";
    import Button from "../ui/Button.svelte";
    import { registerUser } from "../../../../services/auth.service.js";

    let username = "";
    let email = "";
    let password = "";
    let confirmPassword = "";
    let error = "";
    let success = "";
    let loading = false;

    const handleSubmit = async () => {
        error = "";
        success = "";

        if (password !== confirmPassword) {
            error = "Les mots de passe ne correspondent pas";
            return;
        }

        loading = true;

        try {
            await registerUser({ username, email, password, confirmPassword });
        window.location.href = "users/#/profile";
        } catch (err) {
            console.error("Erreur inscription :", err);
            error = err.message || "Erreur lors de l'inscription";
        } finally {
            loading = false;
        }
    };
</script>

<form on:submit|preventDefault={handleSubmit}>
    <h1 class="text-2xl font-bold mb-4 text-center p-10">Créer un compte</h1>

    {#if error}
        <p class="text-red-500 text-center mb-4">{error}</p>
    {/if}

    {#if success}
        <p class="text-green-500 text-center mb-4">{success}</p>
    {/if}

    <p class="text-center">Pseudo</p>
    <Input bind:value={username} />

    <p class="text-center">Email</p>
    <Input bind:value={email} />

    <p class="text-center">Mot de passe</p>
    <PasswordInput bind:value={password} />

    <p class="text-center">Confirmer le mot de passe</p>
    <PasswordInput bind:value={confirmPassword} />

    <Button btnType="submit" disabled={loading}>
        {#if loading}Création...{:else}Créer un compte{/if}
    </Button>

    <p class="text-center text-sm mt-4">
        Vous avez déjà un compte ?
        <a href="/#/login" class="text-[#590212] hover:underline">Connectez-vous</a>
    </p>
</form>
