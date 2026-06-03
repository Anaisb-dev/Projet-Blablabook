<script>
    import { Popover } from "bits-ui";
    import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte"; // pour envoyer un événement au parent quand le statut change

    export let status;
    export let id;

    const dispatch = createEventDispatcher();

    function changeStatus(newStatus) {
        dispatch("changeStatus", { id, status: newStatus });
    }
</script>

<div class="absolute top-2 left-2 z-10">
    <Popover.Root>
        <Popover.Trigger>
            <button
                type="button"
                class="w-[110px] h-[40px] rounded-xl border bg-white flex items-center justify-center hover:bg-[#F2E0D0] cursor-pointer"
            >
                {#if status === "à lire"}
                    <Icon icon="solar:book-bold" class="w-5 h-5 mr-1" /> {status}
                {:else if status === "en cours"}
                    <Icon icon="mdi:book-open-page-variant" class="w-5 h-5 mr-1" /> {status}
                {:else if status === "lu"}
                    <Icon icon="garden:book-closed-fill-12" class="w-5 h-5 mr-1" /> {status}
                {/if}
            </button>
        </Popover.Trigger>

        <Popover.Portal>
            <Popover.Content class="bg-white rounded-lg shadow-lg w-[110px] z-[9999]">

                <button type="button" class="flex items-center gap-2 p-2 hover:bg-[#F2E0D0] w-full text-left cursor-pointer"
                    on:click={() => changeStatus("à lire")}>
                    <Icon icon="solar:book-bold" class="w-5 h-5" />
                    à lire
                </button>

                <button type="button" class="flex items-center gap-2 p-2 hover:bg-[#F2E0D0] w-full text-left cursor-pointer"
                    on:click={() => changeStatus("en cours")}>
                    <Icon icon="mdi:book-open-page-variant" class="w-5 h-5" />
                    en cours
                </button>

                <button type="button" class="flex items-center gap-2 p-2 hover:bg-[#F2E0D0] w-full text-left cursor-pointer"
                    on:click={() => changeStatus("lu")}>
                    <Icon icon="garden:book-closed-fill-12" class="w-5 h-5" />
                    lu
                </button>

            </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
</div>