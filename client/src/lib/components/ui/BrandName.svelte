<script>
</script>

<!-- text-2xl sur mobile, text-4xl sur tablette, text-5xl sur desktop -->
<p class="text-2xl sm:text-4xl lg:text-5xl font-bold brand-name">
    <span class="blabla">Blabla</span><span class="book">Book</span>
</p>

<style>
    .blabla { color: #BF9075; }
    .book { color: #590212; }

    :global(body.dark-mode) .blabla { color: #bf9075; }
    :global(body.dark-mode) .book { color: #9a5c64; }
</style>