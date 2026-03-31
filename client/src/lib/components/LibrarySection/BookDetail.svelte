<script>
    import { onMount } from "svelte";
    import {
        getBookDetail,
        addBookToPersonalLibrary,
    } from "../../../../services/bookService.js";
    import { authStore } from "../store/auth.svelte";

    export let params; // vient de la route
    export let bookId = null; // optionnel, si tu passes directement depuis props

    let idToUse = bookId || params?.id; // Priorité au prop, sinon route
    let book = null;
    let loading = true;
    let error = "";
    let message = "";

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
            message = "Tu dois être connecté !";
            return;
        }

        try {
            await addBookToPersonalLibrary(idToUse);
            message = "Livre ajouté à ta bibliothèque";
            window.location.href = "/#/books";
        } catch (err) {
            console.error(err);
            message = "Erreur lors de l'ajout";
        }
    }

    function goBack() {
        window.history.back();
    }
</script>

{#if loading}
    <p class="text-center">Chargement du livre...</p>
{:else if error}
    <p class="text-center text-red-500">{error}</p>
    <button class="mt-4 underline p-4 cursor-pointer" on:click={goBack}
        >Retour à la liste</button
    >
{:else}
    <button class="mb-4 underline p-4 cursor-pointer" on:click={goBack}
        >← Retour à la liste</button
    >

    <div class="max-w-4xl mx-auto p-4">
        <div class="mb-4">
            <div class="flex items-start justify-between gap-2">
                <div class="text-center md:text-left">
                    <h2 class="text-2xl font-bold">{book.title}</h2>

                    {#if book.authors}
                        <p class="text-sm text-gray-600 mt-1">
                            Auteur(s) : {book.authors.join(", ")}
                        </p>
                    {/if}
                </div>

                <button
                    class="rounded-xl border px-3 py-2 text-sm bg-[#BF9075] text-[#FFF7F1] flex items-center justify-center gap-1"
                    on:click={handleAdd}
                >
                    <span class="text-lg font-bold md:hidden">+</span>
                    <span class="hidden md:inline"
                        >Ajouter à ma bibliothèque</span
                    >
                </button>
                {#if message}
                    <p class="text-green-600 mt-2">{message}</p>
                {/if}
            </div>
        </div>

        <div class="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
            {#if book.cover_image}
                <img
                    src={book.cover_image}
                    alt={book.title}
                    class="w-48 aspect-[2/3] rounded-xl object-cover mx-auto md:mx-0 mb-2 md:mb-0"
                />
            {/if}

            <div class="md:flex-1">
                {#if book.year || book.page_number}
                    <p class="text-sm mb-2">
                        {#if book.year}Année : {book.year}{/if}
                        {#if book.year && book.page_number}
                            •
                        {/if}
                        {#if book.page_number}Pages : {book.page_number}{/if}
                    </p>
                {/if}

                {#if book.genres && book.genres.length}
                    <p class="text-sm mb-2">
                        Genre(s) : {book.genres.join(", ")}
                    </p>
                {/if}

                <h3 class="text-sm font-semibold mt-4 mb-1">Résumé</h3>
                <p class="text-sm leading-relaxed">{book.summary}</p>
            </div>
        </div>
    </div>
{/if}
