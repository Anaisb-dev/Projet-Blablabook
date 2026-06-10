<script>
    import { onMount } from "svelte";
    import { getBookDetail, addBookToPersonalLibrary } from "../../../../services/bookService.js";
    import { authStore } from "../store/auth.svelte";

    export let params;
    export let bookId = null;

    let idToUse = bookId || params?.id;
    let book = null;
    let loading = true;
    let error = "";
    let message = "";
    let added = false;

    // Génère une couleur de fond unique basée sur le titre (même logique que BookCard)
    function getColorFromTitle(title) {
        const colors = ["#590212", "#2C3E50", "#8B4513", "#4A4A6A", "#2E4057", "#6B4226", "#3D2B1F"];
        const index = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        return colors[index];
    }

    onMount(async () => {
        if (!idToUse) {
            error = "ID du livre manquant";
            loading = false;
            return;
        }
        try {
            book = await getBookDetail(idToUse);
        } catch (err) {
            console.error(err);
            error = "Impossible de charger le détail du livre.";
        } finally {
            loading = false;
        }
    });

    async function handleAdd() {
        if (!authStore.user) {
            message = "Tu dois être connecté pour ajouter un livre !";
            return;
        }
        try {
            await addBookToPersonalLibrary(idToUse);
            message = "Livre ajouté à ta bibliothèque ! 🎉";
            added = true;
        } catch (err) {
            console.error(err);
            message = "Erreur lors de l'ajout";
        }
    }

    function goBack() {
        window.history.back();
    }

    $: bgColor = book ? getColorFromTitle(book.title) : "#2C3E50";
</script>

<!-- Chargement -->
{#if loading}
    <div class="flex items-center justify-center min-h-[50vh]">
        <p class="text-center" style="color: #BF9075;">Chargement du livre...</p>
    </div>

<!-- Erreur -->
{:else if error}
    <div class="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p class="text-center text-red-500">{error}</p>
        <button
            class="underline cursor-pointer"
            style="color: #BF9075;"
            on:click={goBack}
        >← Retour à la liste</button>
    </div>

<!-- Contenu du livre -->
{:else}
    <!-- Bouton retour -->
    <div class="px-4 sm:px-8 pt-6">
        <button
            class="flex items-center gap-2 text-sm cursor-pointer hover:opacity-70 transition"
            style="color: #590212;"
            on:click={goBack}
        >
            ← Retour à la liste
        </button>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-8 py-6">

        <!-- Layout principal : couverture + infos -->
        <div class="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

            <!-- Couverture générique style vintage -->
            <div class="flex-shrink-0 mx-auto md:mx-0">
                <div
                    class="w-48 sm:w-56 aspect-[2/3] rounded-xl flex items-center justify-center p-4 shadow-md"
                    style="background-color: {bgColor};"
                >
                    <div style="
                        width: 100%;
                        height: 100%;
                        border: 1px solid rgba(255,255,255,0.25);
                        border-radius: 4px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-between;
                        padding: 16px 12px;
                        box-sizing: border-box;
                    ">
                        <!-- Logo BLABLABOOK -->
                        <div style="text-align: center; width: 100%;">
                            <div style="width: 20px; height: 1px; background: #BF9075; margin: 0 auto 4px;"></div>
                            <p style="font-size: 8px; color: #BF9075; margin: 0; letter-spacing: 2px;">✦ BLABLABOOK ✦</p>
                            <div style="width: 20px; height: 1px; background: #BF9075; margin: 4px auto 0;"></div>
                        </div>

                        <!-- Titre sur la couverture -->
                        <p style="
                            font-size: 13px;
                            font-weight: 500;
                            color: #FFF7F1;
                            text-align: center;
                            margin: 0;
                            line-height: 1.5;
                            padding: 0 4px;
                            max-height: 120px;
                            overflow: hidden;
                        ">
                            {book.title.length > 50 ? book.title.slice(0, 50) + "…" : book.title}
                        </p>

                        <!-- Auteur -->
                        <div style="text-align: center; width: 100%;">
                            <div style="width: 40px; height: 1px; background: rgba(255,255,255,0.3); margin: 0 auto 6px;"></div>
                            <p style="font-size: 9px; color: rgba(255,255,255,0.6); margin: 0;">
                                {book.authors?.[0] || "Auteur inconnu"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Informations du livre -->
            <div class="flex-1 flex flex-col gap-4">

                <!-- Titre et auteurs -->
                <div>
                    <h1 class="text-2xl sm:text-3xl font-bold mb-2" style="color: #590212;">
                        {book.title}
                    </h1>
                    {#if book.authors?.length}
                        <p class="text-base" style="color: #BF9075;">
                            {book.authors.join(", ")}
                        </p>
                    {/if}
                </div>

                <!-- Métadonnées : année, pages, genre -->
                <div class="flex flex-wrap gap-3">
                    {#if book.year}
                        <span class="px-3 py-1 rounded-full text-sm border" style="border-color: #F2E0D0; color: #590212;">
                            Année {book.year}
                        </span>
                    {/if}
                    {#if book.page_number}
                        <span class="px-3 py-1 rounded-full text-sm border" style="border-color: #F2E0D0; color: #590212;">
                            {book.page_number} pages
                        </span>
                    {/if}
                    {#if book.genres?.length}
                        {#each book.genres.slice(0, 2) as genre}
                            <span class="px-3 py-1 rounded-full text-sm border" style="border-color: #F2E0D0; color: #590212;">
                                {genre}
                            </span>
                        {/each}
                    {/if}
                </div>

                <!-- Bouton ajouter à la bibliothèque -->
                {#if !added}
                    <button
                        class="w-full sm:w-auto px-6 py-3 rounded-2xl text-sm font-medium transition hover:opacity-80 cursor-pointer"
                        style="background: #590212; color: #FFF7F1;"
                        on:click={handleAdd}
                    >
                        + Ajouter à ma bibliothèque
                    </button>
                {:else}
                    <div
                        class="w-full sm:w-auto px-6 py-3 rounded-2xl text-sm font-medium text-center"
                        style="background: #F2E0D0; color: #590212;"
                    >
                        ✓ Ajouté à ta bibliothèque
                    </div>
                {/if}

                <!-- Message retour -->
                {#if message}
                    <p class="text-sm" style="color: {added ? '#2E7D32' : '#C62828'};">
                        {message}
                    </p>
                {/if}

                <!-- Résumé -->
                <div>
                    <h2 class="text-base font-semibold mb-2" style="color: #590212;">Résumé</h2>
                    <p class="text-sm leading-relaxed" style="color: #4B3B3B;">
                        {book.summary || "Pas de description disponible."}
                    </p>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    :global(body.dark-mode) h1,
    :global(body.dark-mode) h2,
    :global(body.dark-mode) button { color: #BF9075; }
    :global(body.dark-mode) p { color: #FFF7F1; }
</style>