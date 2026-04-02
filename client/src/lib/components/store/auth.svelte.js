export const authStore = $state({ user: null, token: null });


// LOGIN
export const setAuth = (/** @type {any} */ user, /** @type {string} */ token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    authStore.user = user;
    authStore.token = token;
};

// LOGOUT
export const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    authStore.user = null;
    authStore.token = null;
};

// LOGIN APRES REFRESH
export const getAuth = () => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");
    const user = userRaw ? JSON.parse(userRaw) : null;
    if (token && user) {
        // Ici on veut que le token et le user soit présent
        if (isTokenExpired(token)) {
            clearAuth();
            return;
        } // Si le token a expiré la fonction clearAuth est appelé, déconnexion de l'user.

        authStore.user = user;
        authStore.token = token;
    } else {
        authStore.user = null;
        authStore.token = null;
    }
};

function isTokenExpired(token) {
    try {
        if (!token) return true;

        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
}; // On compare le temps d'expiration du payload avec celui du temps actuel "Date.now", si il a expiré return true.