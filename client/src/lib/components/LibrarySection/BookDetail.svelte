<script>
    import { onMount } from "svelte";
    import { getBookDetail } from "../../../../services/bookService.js";

    // params est fourni automatiquement par svelte-spa-router pour la route /books/:id
    export let params;

    let bookId;

    let book = null;
    let loading = true;
    let error = "";

    // récupère l'id depuis l'URL et charge le détail du livre
    onMount(async () => {
        bookId = params?.id;

        try {
            book = await getBookDetail(bookId);
        } catch (err) {
            console.error(err);
            error = "Impossible de charger le détail du livre.";
        } finally {
            loading = false;
        }
    });

    function addToPersonalLibrary() {
        // a faire : appeler l'API pour ajouter le livre à la bibliothèque perso
        console.log("Ajouter à ma bibliothèque", bookId);
    }
</script>

{#if loading}
    <p class="text-center">Chargement du livre...</p>
{:else if error}
    <p class="text-center text-red-500">{error}</p>
    <a class="mt-4 underline p-4 cursor-pointer inline-block" href="#/books">Retour à la liste</a>
{:else}
    <a class="mb-4 underline p-4 cursor-pointer inline-block" href="#/books">← Retour à la liste</a>

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
                    on:click={addToPersonalLibrary}
                >
                    <span class="text-lg font-bold md:hidden">+</span>
                    <span class="hidden md:inline">Ajouter à ma bibliothèque</span>
                </button>
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
                        {#if book.year && book.page_number} • {/if}
                        {#if book.page_number}Pages : {book.page_number}{/if}
                    </p>
                {/if}

                {#if book.genres && book.genres.length}
                    <p class="text-sm mb-2">Genre(s) : {book.genres.join(", ")}</p>
                {/if}

                <h3 class="text-sm font-semibold mt-4 mb-1">Résumé</h3>
                <p class="text-sm leading-relaxed">{book.summary}</p>
            </div>
        </div>
    </div>
{/if}