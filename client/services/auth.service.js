import api from "../src/lib/api";

export const registerUser = async (user) => {
    return await api("/auth/register", "POST", user);
};

export const loginUser = async (username, password) => {
    return await api("/auth/login", "POST", { username, password });
};