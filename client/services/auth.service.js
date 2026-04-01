import api from "../src/lib/api";
import { setAuth } from "../src/lib/components/store/auth.svelte";

// Inscription
export const registerUser = async ({ username, email, password, confirmPassword }) => {
    const data = await api("/api/auth/register", "POST", { username, email, password, confirmPassword });
    return data;
};

// Login
export const loginUser = async (identifier, password) => {
    const data = await api("/api/auth/login", "POST", { identifier, password });

    if (data.jwt) {
        // 1. stocker le token
        localStorage.setItem("token", data.jwt);

        // 2. récupérer le user à jour depuis la BDD
        const user = await api("/api/users/settings", "GET");

        // 3. mettre à jour le store
        setAuth(user, data.jwt);
    }

    return data;
};

// Logout
export const logoutUser = () => {
    localStorage.removeItem("token");
    setAuth(null, null); // Supprime les informations utilisateur et le token
};