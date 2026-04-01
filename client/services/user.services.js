import api from "../src/lib/api";
import { setAuth } from "../src/lib/components/store/auth.svelte";

// Récupérer les infos de l'utilisateur connecté
export const getUser = async () => {
    return await api("/users/settings", "GET");
};


// Modifier les informations de l'utilisateur connecté
export const updateUser = async (data) => {
    const response = await api("/users/settings", "PATCH", data);

    if (response) {
        setAuth(response, localStorage.getItem("token"));
    }

    return response;
};

// Modifier le mot de passe de l'utilisateur connecté
export const updatePassword = async (password, confirmPassword) => {
    return await api("/users/password", "PATCH", {
        password,
        confirmPassword
    });
};

// Supprimer l'utilisateur connecté
export const deleteUser = async () => {
    return await api("/users/profile", "DELETE");
};



