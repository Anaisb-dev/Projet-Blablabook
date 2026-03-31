import api from "../src/lib/api";
import { setAuth } from "../src/lib/components/store/auth.svelte";

// Inscription + connexion automatique
export const registerUser = async ({ username, email, password, confirmPassword }) => {
    const data = await api("/auth/register", "POST", { username, email, password, confirmPassword });

    // Si le backend renvoie jwt + user
    if (data.jwt && data.user) {
        setAuth(data.user, data.jwt);
    }
    
    return data;
};

// Login
export const loginUser = async (identifier, password) => {
    const data = await api("/auth/login", "POST", { identifier, password });

    console.log("USER RECU :", data.user); 

    if (data.jwt) {
        // 1. stocker le token
        localStorage.setItem("token", data.jwt);

        // 2. récupérer le user à jour depuis la BDD
        const user = await api("/users/settings", "GET");

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