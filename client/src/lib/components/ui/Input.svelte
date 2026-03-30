<script>
    import { createEventDispatcher } from 'svelte';
    export let type = "text";
    export let placeholder = "";
    export let value = "";

    const dispatch = createEventDispatcher();

    function handleInput(e) {
        value = e.target.value;
        dispatch('input', value); // envoie la valeur au parent
    }
</script>

<input
    {type}
    placeholder={placeholder}
    value={value}
    on:input={handleInput}
    class="flex items-center gap-2 border rounded-xl w-[300px] h-[40px] bg-white mx-auto mb-4 p-4"
/>
