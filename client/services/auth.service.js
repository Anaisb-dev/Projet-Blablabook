import api from "../api/src/lib/api.js";

export const registerUser = async (user) => {
    return await api("/auth/register", "POST", user);
};