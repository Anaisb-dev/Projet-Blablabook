<script>
    import { Toggle } from "bits-ui";
    import Icon from "@iconify/svelte";

    let unlocked = false;
    export let value = "";

    $: code = unlocked ? value : "••••";

</script>

<div class="flex items-center gap-2 border rounded-xl w-[300px] h-[40px] bg-white mx-auto mb-4 p-4">
    <input
        type={unlocked ? "text" : "password"}
        placeholder="Entrez votre mot de passe"
        bind:value
        class="flex-1 outline-none bg-transparent"
    />

    <Toggle.Root
        aria-label="toggle code visibility"
        bind:pressed={unlocked}
        
    >
        <Icon icon="material-symbols-light:lock-outline" />
    </Toggle.Root>
</div>
