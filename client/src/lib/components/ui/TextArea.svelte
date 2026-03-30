<script>
    export let value = "";
    export let placeholder = "Présentez-vous en quelques mots…";
</script>

<textarea
    bind:value
    {placeholder}
    class="flex items-center gap-2 border rounded-xl w-[300px] h-[200px] bg-white mx-auto mb-4 p-4 text-justify">
</textarea>
