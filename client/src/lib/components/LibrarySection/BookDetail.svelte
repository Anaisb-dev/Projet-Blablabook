
<!-- PAGE DÉTAIL D'UN LIVRE                                      -->
<!-- Affiche toutes les informations d'un livre                  -->
<!-- Accessible depuis la bibliothèque publique ou le carousel   -->


<script>
    import { onMount } from "svelte";
    // Fonctions d'appel à l'API back-end
    import { getBookDetail, addBookToPersonalLibrary } from "../../../../services/bookService.js";
    // Store global contenant les infos de l'utilisateur connecté
    import { authStore } from "../store/auth.svelte";

    // Props reçues depuis le router Svelte SPA
    export let params;          // Paramètres de la route (ex: /books/:id)
    export let bookId = null;   // ID optionnel si passé directement en prop

    // On priorise le prop bookId, sinon on utilise l'id de la route
    let idToUse = bookId || params?.id;

    // États du composant
    let book = null;       // Données du livre récupérées depuis l'API
    let loading = true;    // Indique si les données sont en cours de chargement
    let error = "";        // Message d'erreur si la requête échoue
    let message = "";      // Message de retour après l'ajout à la bibliothèque
    let added = false;     // Passe à true après un ajout réussi (change le bouton)

    // Génère une couleur unique basée sur le titre du livre
    // Même logique que BookCard pour la cohérence visuelle
    function getColorFromTitle(title) {
        const colors = ["#590212", "#2C3E50", "#8B4513", "#4A4A6A", "#2E4057", "#6B4226", "#3D2B1F"];
        const index = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        return colors[index];
    }

    // onMount : s'exécute une seule fois au chargement du composant
    // On récupère les détails du livre depuis l'API Google Books via notre back-end
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
            // Dans tous les cas (succès ou erreur), on arrête le chargement
            loading = false;
        }
    });

    // Ajoute le livre à la bibliothèque personnelle de l'utilisateur connecté
    async function handleAdd() {
        // Vérification : l'utilisateur doit être connecté
        if (!authStore.user) {
            message = "Tu dois être connecté pour ajouter un livre !";
            return;
        }
        try {
            await addBookToPersonalLibrary(idToUse);
            message = "Livre ajouté à ta bibliothèque ! 🎉";
            added = true; // On change l'état pour afficher le bouton "Ajouté"
        } catch (err) {
            console.error(err);
            message = "Erreur lors de l'ajout";
        }
    }

    // Retourne à la page précédente dans l'historique du navigateur
    function goBack() {
        window.history.back();
    }

    // Variable réactive : bgColor se recalcule automatiquement quand book change
    $: bgColor = book ? getColorFromTitle(book.title) : "#2C3E50";
</script>



<!-- ÉTATS D'AFFICHAGE -->

<!-- État 1 : Chargement en cours -->
{#if loading}
    <div class="flex items-center justify-center min-h-[50vh]">
        <p class="text-center" style="color: #BF9075;">Chargement du livre...</p>
    </div>

<!-- État 2 : Erreur lors du chargement -->
{:else if error}
    <div class="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <p class="text-center text-red-500">{error}</p>
        <button
            class="underline cursor-pointer"
            style="color: #BF9075;"
            on:click={goBack}
        >← Retour à la liste</button>
    </div>

<!-- État 3 : Données chargées avec succès -->
{:else}

    <!-- Bouton retour en haut de page -->
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

        <!-- Layout principal -->
        <!-- flex-col sur mobile, flex-row sur desktop (md:flex-row) -->
        <div class="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

            <!-- COUVERTURE GÉNÉRIQUE STYLE VINTAGE -->
            <!-- flex-shrink-0 : empêche la couverture de rétrécir sur desktop -->
            <div class="flex-shrink-0 mx-auto md:mx-0">
                <div
                    class="w-48 sm:w-56 aspect-[2/3] rounded-xl flex items-center justify-center p-4 shadow-md"
                    style="background-color: {bgColor};"
                >
                    <!-- Cadre intérieur -->
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
                        <!-- Logo BLABLABOOK en haut -->
                        <div style="text-align: center; width: 100%;">
                            <div style="width: 20px; height: 1px; background: #BF9075; margin: 0 auto 4px;"></div>
                            <p style="font-size: 8px; color: #BF9075; margin: 0; letter-spacing: 2px;">✦ BLABLABOOK ✦</p>
                            <div style="width: 20px; height: 1px; background: #BF9075; margin: 4px auto 0;"></div>
                        </div>

                        <!-- Titre tronqué si trop long -->
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

                        <!-- Premier auteur en bas -->
                        <div style="text-align: center; width: 100%;">
                            <div style="width: 40px; height: 1px; background: rgba(255,255,255,0.3); margin: 0 auto 6px;"></div>
                            <p style="font-size: 9px; color: rgba(255,255,255,0.6); margin: 0;">
                                {book.authors?.[0] || "Auteur inconnu"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- INFORMATIONS DU LIVRE -->
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

                <!-- Badges de métadonnées : année, pages, genres -->
                <!-- slice(0, 2) : on affiche max 2 genres pour ne pas surcharger -->
                <div class="flex flex-wrap gap-3">
                    {#if book.year}
                        <span class="px-3 py-1 rounded-full text-sm border" style="border-color: #F2E0D0; color: #590212;">
                            📅 {book.year}
                        </span>
                    {/if}
                    {#if book.page_number}
                        <span class="px-3 py-1 rounded-full text-sm border" style="border-color: #F2E0D0; color: #590212;">
                            📖 {book.page_number} pages
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

                <!-- Bouton d'ajout à la bibliothèque -->
                <!-- Change d'apparence après ajout réussi pour éviter les doublons -->
                {#if !added}
                    <button
                        class="w-full sm:w-auto px-6 py-3 rounded-2xl text-sm font-medium transition hover:opacity-80 cursor-pointer"
                        style="background: #590212; color: #FFF7F1;"
                        on:click={handleAdd}
                    >
                        + Ajouter à ma bibliothèque
                    </button>
                {:else}
                    <!-- Confirmation visuelle après ajout -->
                    <div
                        class="w-full sm:w-auto px-6 py-3 rounded-2xl text-sm font-medium text-center"
                        style="background: #F2E0D0; color: #590212;"
                    >
                        ✓ Ajouté à ta bibliothèque
                    </div>
                {/if}

                <!-- Message de retour (succès en vert, erreur en rouge) -->
                {#if message}
                    <p class="text-sm" style="color: {added ? '#2E7D32' : '#C62828'};">
                        {message}
                    </p>
                {/if}

                <!-- Résumé du livre -->
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
    /* Adaptation des couleurs pour le mode sombre */
    :global(body.dark-mode) h1,
    :global(body.dark-mode) h2 { color: #BF9075; }
    :global(body.dark-mode) p { color: #FFF7F1; }
</style>