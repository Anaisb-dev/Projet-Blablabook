<script>
    import { fly } from "svelte/transition";

    export let message = ""; // Message de la pop-up
    export let show = false; // affichage de la pop-up
    export let onClose = () => {}; // fermeture de la pop-up
</script>

{#if show}
    <div
        in:fly={{ y: 20, duration: 500 }}
        out:fly={{ y: -20, duration: 500 }}
        class="fixed bottom-5 right-5 bg-[#590212] text-white px-4 py-3 rounded-lg shadow-lg w-[300px]"
    >
        <div class="flex items-center justify-between gap-3">
            <span>{message}</span>
            <button
                class="underline cursor-pointer"
                on:click={onClose}
            >
                Fermer
            </button>
        </div>
    </div>
{/if}