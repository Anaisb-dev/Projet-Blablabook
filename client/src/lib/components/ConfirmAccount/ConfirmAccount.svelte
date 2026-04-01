<script>
    import { onMount } from "svelte";

    let message = "Confirmation en cours...";

    onMount(async () => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        try {
            const res = await fetch(
                `http://localhost:3000/#/confirm?token=${token}`,
            );

            const data = await res.json();
            message = data.message;

            setTimeout(() => {
                window.location.href = "#/login";
            }, 2000);

        } catch (err) {
            message = "Erreur lors de la confirmation ❌";
        }
    });
</script>

<h1>{message}</h1>
