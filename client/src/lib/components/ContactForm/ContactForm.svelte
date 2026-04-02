<script>
    import Input from "../ui/Input.svelte";
    import Button from "../ui/Button.svelte";
    import TextArea from "../ui/TextArea.svelte";
    import { sendContactMessage } from "../../../../services/contact.service.js";
    
    let email = "";
    let subject = "";
    let message = "";
    let error = "";
    let success = "";
    let loading = false;

    const handleSubmit = async () => {
        error = "";
        success = "";
        loading = true;

        try {
            await sendContactMessage({email, subject, message });
            success = "Message envoyé avec succès !";
            // Réinitialisation des champs
            email = "";
            subject = "";
            message = "";
        } catch (err) {
            console.error("Erreur message :", err);
            error = err.message || "Erreur lors de l'envoi du message";
        } finally {
            loading = false;
        }
    };

</script>

<form on:submit|preventDefault={handleSubmit}>
    <h1 class="text-2xl font-bold mb-4 text-center p-10">Contact</h1>

    {#if error}
        <p class="text-red-500 text-center mb-4">{error}</p>
    {/if}

    {#if success}
        <p class="text-green-500 text-center mb-4">{success}</p>
    {/if}

    <p class="text-center">Email</p>
    <Input bind:value={email} />

    <p class="text-center">Sujet</p>
    <Input bind:value={subject} />

    <p class="text-center">Message</p>
    <TextArea bind:value={message} />

    <Button btnType="submit" disabled={loading}>
        {#if loading}Envoi...{:else}Envoyer{/if}
    </Button>
</form>