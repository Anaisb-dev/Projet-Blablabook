// import api from "../src/lib/api";

// export const registerUser = async (username, email, password) => {
//     return await api("/auth/register", "POST", {username, email, password});
// };

// export const loginUser = async (username, password) => {
//     const { token } = await api("/auth/login", "POST" , {username, password});
//     console.log(token)
//     const user = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     }).then((res) => res.json());
//     console.log(token, user)
//     return { token, user };

//     //return { token };
// };


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

    if (data.jwt && data.user) {
        setAuth(data.user, data.jwt);
    }

    return data;
};

// Logout
export const logoutUser = () => {
    localStorage.removeItem("token");
};