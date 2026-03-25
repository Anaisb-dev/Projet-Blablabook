import api from "../src/lib/api";

export const registerUser = async (user) => {
    return await api("/auth/register", "POST", user);
};