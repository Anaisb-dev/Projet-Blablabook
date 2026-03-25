<script>
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    import { getBookDetail } from "../../../../services/bookService.js";

    export let bookId;

    let book = null;
    let loading = true;
    let error = "";

    const dispatch = createEventDispatcher();

    onMount(async () => {
        try {
            book = await getBookDetail(bookId);
        } catch (err) {
            console.error(err);
            error = "Impossible de charger le détail du livre.";
        } finally {
            loading = false;
        }
    });

    function goBack() {
        dispatch("back");
    }
</script>

{#if loading}
    <p class="text-center">Chargement du livre...</p>
{:else if error}
    <p class="text-center text-red-500">{error}</p>
    <button class="mt-4 underline" on:click={goBack}>Retour à la liste</button>
{:else}
    <button class="mb-4 underline" on:click={goBack}>← Retour à la liste</button>

    <div class="max-w-3xl mx-auto p-4 flex gap-6">
        {#if book.cover_image}
            <img
                src={book.cover_image}
                alt={book.title}
                class="w-48 aspect-[2/3] rounded-xl object-cover"
            />
        {/if}

        <div>
            <h2 class="text-2xl font-bold mb-2">{book.title}</h2>

            {#if book.authors}
                <p class="text-sm text-gray-600 mb-2">
                    Auteur(s) : {book.authors.join(", ")}
                </p>
            {/if}

            {#if book.year}
                <p class="text-sm mb-1">Année : {book.year}</p>
            {/if}

            {#if book.page_number}
                <p class="text-sm mb-4">Pages : {book.page_number}</p>
            {/if}

            <p class="text-sm leading-relaxed">{book.summary}</p>
        </div>
    </div>
{/if}