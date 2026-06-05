<script>

if (window.location.pathname === "/" && !window.location.hash) {
  window.location.hash = "#/";
} // Permet d'avoir la meme URL qd on charge le site et qd on clique sur la page d'accueil

  import Router from "svelte-spa-router";
  import Layout from "./lib/components/layout/Layout.svelte";
  import HomePage from "./lib/components/HomePage/HomePage.svelte";
  import LibrarySection from "./lib/components/LibrarySection/LibrarySection.svelte";
  import BookDetail from "./lib/components/LibrarySection/BookDetail.svelte";
  import RegisterForm from "./lib/components/RegisterForm/RegisterForm.svelte";
  import LoginForm from "./lib/components/LoginForm/LoginForm.svelte";
  import Account from "./lib/components/Account/Account.svelte";
  import Settings from "./lib/components/Account/Settings.svelte";
  import NotFound from "./lib/components/NotFound/NotFound.svelte";
  import ContactForm from "./lib/components/ContactForm/ContactForm.svelte";
  import FAQ from "./lib/components/FAQ/FAQ.svelte";
  import ConfirmAccount from "./lib/components/ConfirmAccount/ConfirmAccount.svelte";
  import LegalNotice from "./lib/components/LegalNotice/LegalNotice.svelte"; // Page des mentions légales
  import GeneralTermsAndConditions from "./lib/components/GeneralTermsAndConditions/GeneralTermsAndConditions.svelte"; // Page des CGU
  import PrivacyPolicy from "./lib/components/PrivacyPolicy/PrivacyPolicy.svelte"; // Page de la politique de confidentialité
  import CookiesPolicy from "./lib/components/CookiesPolicy/CookiesPolicy.svelte"; // Redirige vers la même page que la politique de confidentialité

  const routes = {
    "/": HomePage,
    "/books": LibrarySection,
    "/books/:id": BookDetail,
    "/register": RegisterForm,
    "/login": LoginForm,
    "/profile": Account,
    "/settings": Settings,
    "/contact": ContactForm,
    "/faq": FAQ,
    "/confirm": ConfirmAccount,
    "/mentions-legales": LegalNotice,
    "/cgu": GeneralTermsAndConditions,
    "/privacy-policy": PrivacyPolicy,
    "/cookies-policy": CookiesPolicy, // Redirige vers la même page que la politique de confidentialité
    "*": NotFound // Route pour les pages non trouvées
  };
</script>

<Layout>
  <Router {routes} />
</Layout>