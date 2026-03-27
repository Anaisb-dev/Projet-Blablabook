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

// auth.service.js
// import api from "../src/lib/api";
// import { setAuth } from "../src/lib/component/store/auth.svelte";

// export const registerUser = async (username, email, password) => {
//     return await api("/auth/register", "POST", { username, email, password });
// };

// export const loginUser = async (identifier, password) => {
//     const data = await api("/auth/login", "POST", { identifier, password });

//     if (data.jwt && data.user) {
//         setAuth(data.user, data.jwt); // sauvegarde dans le store et localStorage
//     }

//     return data;
// };

// export const logoutUser = () => {
//     localStorage.removeItem("token");
// };