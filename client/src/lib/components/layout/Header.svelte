<script>
    import LogoIcon from "../ui/LogoIcon.svelte";
    import BrandName from "../ui/BrandName.svelte";
    import DropdownMenu from "../navigation/DropdownMenu.svelte";
    import NavigationMenu from "../navigation/NavigationMenu.svelte";
    import ThemeToggle from "../ui/ThemeToggle.svelte";
</script>

<header class="flex items-center justify-between p-4 border-b border-[#F2E0D0] relative z-50">

    <!-- Logo -->
    <div class="flex items-center">
        <a href="/">
            <LogoIcon width={48} height={36} />
        </a>
    </div>

    <!-- Nom de la marque centré -->
    <div class="absolute left-1/2 -translate-x-1/2">
        <a href="/"><BrandName /></a>
    </div>

    <!-- Theme + Navigation -->
    <div class="flex items-center gap-3">
        <ThemeToggle />

        <!-- Mobile et tablette (< 1024px) -->
        <div class="block lg:hidden">
            <DropdownMenu />
        </div>

        <!-- Desktop (>= 1024px) -->
        <div class="hidden lg:block">
            <NavigationMenu />
        </div>
    </div>
</header>