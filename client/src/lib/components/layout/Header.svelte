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
    <!-- Logo et Nom de la Marque -->
    <div class="flex items-center gap-2">
        <LogoIcon width={70} height={48} />
    </div>

    <div class="absolute left-1/2 -translate-x-1/2">
        <BrandName />
    </div>

    <!-- Theme et Menu de navigation mobile, tablette et desktop -->
    <div class="flex items-center gap-4">
        <ThemeToggle />

        <!-- Mobile et tablette -->
        <div class="block lg:hidden"> <!-- lg = 1024px (invisible en grand écran)-->
            <DropdownMenu />
        </div>

        <!-- Desktop -->
        <div class="hidden lg:block"> <!-- invisible en petit écran, visible en grand écran -->
            <NavigationMenu />
        </div>
    </div>
</header>

