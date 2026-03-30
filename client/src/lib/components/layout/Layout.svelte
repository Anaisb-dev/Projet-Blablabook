<script>
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
    import LogoIcon from "../ui/LogoIcon.svelte";
    import BrandName from "../ui/BrandName.svelte";
    import DropdownMenu from "../navigation/DropdownMenu.svelte";
    import NavigationMenu from "../navigation/NavigationMenu.svelte";
    import ThemeToggle from "../ui/ThemeToggle.svelte";
    import { onMount } from "svelte";
    import { getAuth } from "../store/auth.svelte";


    onMount(() => {
        getAuth();
    });
    
</script>

<div class="min-h-screen flex flex-col">
    <Header />
    <!-- Contenu entre Header et Footer -->
        <main class="flex-1">
            <slot /> <!-- Slot = emplacement où s’affiche le contenu passé dans <Layout> -->
        </main>
    <Footer />
</div>