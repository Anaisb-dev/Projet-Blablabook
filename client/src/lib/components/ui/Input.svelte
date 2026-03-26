<script>
    export let type = "text";
    export let placeholder = "";
    export let value = "";
</script>

<input
    {type}
    bind:value
    {placeholder}
    class="flex items-center gap-2 border rounded-xl w-[300px] h-[40px] bg-white mx-auto mb-4 p-4"
/>
