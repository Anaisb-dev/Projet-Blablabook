<script>
    import { Checkbox } from "bits-ui";
    import Icon from "@iconify/svelte";

    let checked = false;
</script>

<div class="flex items-center justify-center gap-3">
    <Checkbox.Root
        id="terms"
        name="terms"
        bind:checked
        class="w-[25px] h-[25px] border rounded-md flex items-center justify-center bg-white"
    >
        {#if checked}
            <Icon icon="mdi:check" class="w-4 h-4" />
        {/if}
    </Checkbox.Root>

    <label for="terms" class="text-sm"> J’accepte les conditions générales d’utilisation </label>
</div>
