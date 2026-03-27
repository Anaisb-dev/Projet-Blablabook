<script>
  import Router from "svelte-spa-router";
  import Layout from "./lib/components/layout/Layout.svelte";
  import HomePage from "./lib/components/HomePage/HomePage.svelte";
  import LibrarySection from "./lib/components/LibrarySection/LibrarySection.svelte";
  import RegisterForm from "./lib/components/RegisterForm/RegisterForm.svelte";
  import LoginForm from "./lib/components/LoginForm/LoginForm.svelte";
  import Account from "./lib/components/Account/Account.svelte";

  const routes = {
    "/": HomePage,
    "/books": LibrarySection,
    "/register": RegisterForm,
    "/login": LoginForm,
    "*": HomePage // page 404a faire pour le moment on redirige vers l'accueil
    "/profile": Account,
    "*": LibrarySection // fallback (si aucune route ne correspond on affiche cette page à changer par une page 404)
  };
</script>

<Layout>
  <Router {routes} />
</Layout>