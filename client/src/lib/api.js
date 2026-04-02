// Fonction générique pour appeler notre API backend
// Elle gère automatiquement :
// - le format JSON
// - l'ajout du token d'authentification si nécessaire
// - la gestion des erreurs
export default async function api(endpoint, method = "GET", body, options = {}) {

// Récupération du token stocké en local (après login)
    const token = localStorage.getItem("token");

    // Construction des headers de la requête
    const headers = {
        "Content-Type": "application/json",
        // Ajout du token uniquement si :
        // - on ne désactive pas explicitement l'auth (withAuth !== false)
        // - un token existe dans le localStorage

        // Pour les routes publiques sensibles (contact, login, register),
        // il faut appeler api avec : { withAuth: false }
        // Pour les autres routes publiques (recherche de livres, détails), on peut laisser l'auth par défaut
        ...(options.withAuth !== false && token && {
            Authorization: `Bearer ${token}`
        })
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
        let errorData;
        try { errorData = await response.json(); } catch(e) { errorData = {}; }
        console.error("Erreur backend :", errorData);
        throw new Error(errorData.message || `Failed to fetch ${endpoint}: ${response.statusText}`);
    }

    return response.json();
}

