<script>
    import { onMount } from "svelte";

    let message = "Confirmation en cours...";

    onMount(async () => {
    const hash = window.location.hash;

    const queryIndex = hash.indexOf("?");
    const queryString = queryIndex !== -1 ? hash.substring(queryIndex + 1) : "";

    const params = new URLSearchParams(queryString);
    const token = params.get("token");

    console.log("TOKEN 👉", token);

    if (!token) {
        message = "Token introuvable";
        return;
    }

    try {
        const url = `${import.meta.env.VITE_API_URL}/api/auth/confirm?token=${token}`;
        console.log("FETCH URL 👉", url);

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("STATUS 👉", res.status);

        const data = await res.json();
        console.log("DATA 👉", data);

        message = data.message;

        if (res.ok) {
            setTimeout(() => {
                window.location.href = "#/login";
            }, 2000);
        }

    } catch (err) {
        console.error("FETCH ERROR 👉", err);
        message = "Erreur lors de la confirmation ❌";
    }
});
</script>

<h1>{message}</h1>
