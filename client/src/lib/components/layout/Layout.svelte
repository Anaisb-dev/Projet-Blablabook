<!-- JS-->
<script>
    import LogoIcon from "../ui/LogoIcon.svelte";
    import BrandName from "../ui/BrandName.svelte";
    import DropdownMenu from "../navigation/DropdownMenu.svelte";
    import NavigationMenu from "../navigation/NavigationMenu.svelte";
    import ThemeToggle from "../ui/ThemeToggle.svelte";

</script>

<!-- HTML -->
<header class="flex items-center justify-between p-4">
    <!-- Gauche -->
    <div class="flex items-center gap-2">
        <LogoIcon width={70} height={48} />
    </div>

    <div class="absolute left-1/2 -translate-x-1/2">
        <BrandName />
    </div>

    <!-- Droite -->
    <div class="flex items-center gap-4">
        <ThemeToggle />

        <!-- Mobile -->
        <div class="block md:hidden">
            <DropdownMenu />
        </div>

        <!-- Desktop -->
        <div class="hidden md:block">
            <NavigationMenu />
        </div>
    </div>
</header>

<!-- CSS-->
<style>
    /* Version Mobile */
    .desktop {
        display: none;
    }

    .mobile {
        display: block;
    }

    /* Version Desktop */
    @media (min-width: 768px) {
        .mobile {
            display: none;
        }

        .desktop {
            display: block;
        }
    }
</style>
