<script>
    // ============================================================
    // IMPORTS — On importe les composants et fonctions dont on a besoin
    // ============================================================

    // SearchBar : le composant barre de recherche (le champ + bouton loupe)
    import SearchBar from "../ui/SearchBar.svelte";

    // BookGrid : le composant qui affiche la grille de livres
    import BookGrid from "./BookGrid.svelte";

    // BookDetail : le composant qui affiche le détail d'un livre (non utilisé ici pour l'instant)
    import BookDetail from "./BookDetail.svelte";

    // addBookToPersonalLibrary : fonction pour ajouter un livre à la bibliothèque de l'utilisateur
    import { addBookToPersonalLibrary } from "../../../../services/bookService.js";

    // onMount : fonction Svelte qui s'exécute automatiquement quand le composant est chargé dans la page
    import { onMount } from "svelte";

    // searchBooks : fonction qui appelle l'API pour chercher des livres par mot-clé
    // getRandomBooks : fonction qui récupère une sélection aléatoire de livres pour la page d'accueil
    import {
        searchBooks,
        getRandomBooks,
    } from "../../../../services/bookService.js";

    // ============================================================
    // VARIABLES RÉACTIVES — Svelte met à jour l'affichage automatiquement quand elles changent
    // ============================================================

    // La valeur tapée dans la barre de recherche (non utilisée directement ici, gérée par l'événement)
    let query = "";

    // Le tableau de livres à afficher dans la grille
    let books = [];

    // Indique si une requête est en cours (pour afficher "Chargement...")
    let loading = false;

    // ============================================================
    // FONCTIONS
    // ============================================================

    /**
     * handleSearch — Lancée quand l'utilisateur soumet une recherche
     * @param {string} searchQuery - Le mot-clé saisi par l'utilisateur
     * 
     * On utilise "searchQuery" et non "query" pour éviter un conflit
     * avec la variable "query" déclarée plus haut.
     */
    async function handleSearch(searchQuery) {
        // Si la recherche est vide, on ne fait rien
        if (!searchQuery) return;

        loading = true;                          // On affiche "Chargement..."
        books = await searchBooks(searchQuery);  // On appelle l'API avec le mot-clé
        loading = false;                         // On cache "Chargement..."
    }

    /**
     * handleSelect — Lancée quand l'utilisateur clique sur un livre
     * La logique de sélection est gérée directement dans BookGrid,
     * cette fonction existe ici pour éviter une erreur Svelte.
     */
    function handleSelect(event) {
        // La sélection est gérée par le composant BookGrid en interne
    }

    /**
     * onMount — S'exécute une seule fois, au chargement de la page
     * On récupère une sélection aléatoire de livres pour afficher
     * quelque chose dès l'arrivée sur la bibliothèque.
     */
    onMount(async () => {
        loading = true;
        books = await getRandomBooks(); // Livres aléatoires au démarrage
        loading = false;
    });

    /**
     * handleAdd — Lancée quand l'utilisateur clique sur "+" pour ajouter un livre
     * @param {CustomEvent} event - L'événement Svelte contenant l'id du livre
     */
    async function handleAdd(event) {
        const id = event.detail.id; // On récupère l'id du livre depuis l'événement

        try {
            await addBookToPersonalLibrary(id); // On appelle l'API pour sauvegarder le livre
            alert("Livre ajouté !");
        } catch (e) {
            console.error(e);
            alert("Erreur ajout");
        }
    }
</script>

<!-- ============================================================ -->
<!-- TEMPLATE — Ce que l'utilisateur voit dans le navigateur      -->
<!-- ============================================================ -->

<!-- Titre de la page -->
<h1 class="text-2xl font-bold mb-4 text-center p-10"> Bibliothèque </h1>

<!-- Barre de recherche centrée -->
<!-- "on:search" écoute l'événement émis par SearchBar quand l'utilisateur soumet une recherche -->
<!-- "e.detail.query" contient le mot-clé saisi -->
<div class="flex justify-center mb-10">
    <SearchBar on:search={(e) => handleSearch(e.detail.query)} />
</div>

<!-- Affichage conditionnel selon l'état de la page -->
{#if loading}
    <!-- En cours de chargement -->
    <p class="text-center text-gray-500">Chargement...</p>

{:else if books.length > 0}
    <!-- Des livres ont été trouvés → on affiche la grille -->
    <!-- "on:select" et "on:add" écoutent les événements remontés par BookGrid -->
    <BookGrid {books} on:select={handleSelect} on:add={handleAdd} />

{:else}
    <!-- Aucun livre trouvé (recherche sans résultat) -->
    <p class="text-center text-gray-500">Aucun livre trouvé.</p>
{/if}