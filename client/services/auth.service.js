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

    console.log("USER RECU :", data.user); 

    if (data.jwt && data.user) {
        setAuth(data.user, data.jwt);
    }

    return data;
};

// Logout
export const logoutUser = () => {
    localStorage.removeItem("token");
};
