<!-- JS-->
<script>
    import LogoIcon from "../ui/LogoIcon.svelte";
    import BrandName from "../ui/BrandName.svelte";
    import DropdownMenu from "../navigation/DropdownMenu.svelte";
    import NavigationMenu from "../navigation/NavigationMenu.svelte";
    import ThemeToggle from "../ui/ThemeToggle.svelte";

</script>

<!-- HTML -->
<LogoIcon width={70} height={48} />
<BrandName />
<ThemeToggle />*

<header>
    <!-- Version Mobile -->
    <div class="mobile">
        <DropdownMenu />
    </div>

    <!-- Version Desktop -->
    <div class="desktop">
        <NavigationMenu />
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
