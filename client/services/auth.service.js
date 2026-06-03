import api from "../src/lib/api";
import { clearAuth, setAuth } from "../src/lib/components/store/auth.svelte";

// Inscription
export const registerUser = async ({ username, email, password, confirmPassword }) => {
    const data = await api("/api/auth/register", "POST", { username, email, password, confirmPassword },{ withAuth: false });
    return data;
};

// Login
export const loginUser = async (identifier, password) => {
    const data = await api("/api/auth/login", "POST", { identifier, password },{ withAuth: false });

    if (data.jwt) {
        // 1. stocker le token
        localStorage.setItem("token", data.jwt);

        // 2. récupérer le user à jour depuis la BDD
        const user = await api("/api/users/settings", "GET");

        // 3. mettre à jour le store
        setAuth(user, data.jwt);
    }
    console.log(data.user, data.jwt);
    return data;
};

// Logout
export const logoutUser = () => {
    clearAuth();
}; // Ici, la déconnexion de la session déclenche la fonction clearAuth, à savoir :
// - la suppression du token dans le localStorage ainsi que l'user qui y est rattaché
// - restaure ces deux données au statut de NULL
