<script>
  import Router from "svelte-spa-router";
  import Layout from "./lib/components/layout/Layout.svelte";
  import HomePage from "./lib/components/HomePage/HomePage.svelte";
  import LibrarySection from "./lib/components/LibrarySection/LibrarySection.svelte";
  import BookDetail from "./lib/components/LibrarySection/BookDetail.svelte";
  import RegisterForm from "./lib/components/RegisterForm/RegisterForm.svelte";
  import LoginForm from "./lib/components/LoginForm/LoginForm.svelte";
  import Account from "./lib/components/Account/Account.svelte";
  import Setting from "./lib/components/Account/Setting.svelte";
  import NotFound from "./lib/components/NotFound/NotFound.svelte";
  import ContactForm from "./lib/components/ContactForm/ContactForm.svelte";
  import FAQ from "./lib/components/FAQ/FAQ.svelte";

  const routes = {
    "/": HomePage,
    "/books": LibrarySection,
    "/books/:id": BookDetail,
    "/register": RegisterForm,
    "/login": LoginForm,
    "/profile": Account,
    "/settings": Setting,
    "/contact": ContactForm,
    "/faq": FAQ,
    "*": NotFound // Route pour les pages non trouvées
  };
</script>

<Layout>
  <Router {routes} />
</Layout>