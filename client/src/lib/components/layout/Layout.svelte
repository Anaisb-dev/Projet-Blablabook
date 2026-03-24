<script>
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
</script>

<div class="min-h-screen flex flex-col">
    <Header />
    <!-- Contenu entre Header et Footer -->
        <main class="flex-1">
            <slot /> <!-- Slot = emplacement où s’affiche le contenu passé dans <Layout> -->
        </main>
    <Footer />
</div>