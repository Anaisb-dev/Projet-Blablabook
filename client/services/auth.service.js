import api from "../src/lib/api";
import { clearAuth, setAuth } from "../src/lib/components/store/auth.svelte";

// Inscription
export const registerUser = async ({ username, email, password, confirmPassword }) => {
    const data = await api("/api/auth/register", "POST", { username, email, password, confirmPassword });
    return data;
};

// Login
export const loginUser = async (identifier, password) => {
    const data = await api("/api/auth/login", "POST", { identifier, password });

    console.log("USER RECU :", data.user); 

    if (data.jwt && data.user) {
        setAuth(data.user, data.jwt);
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