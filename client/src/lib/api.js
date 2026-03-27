// On récupère la fonction pour appeller le backend

const api = async (
    endpoint,
    method = "GET",
    body = null) => {

    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }) // ajout dynamique
        },
        body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
        throw new Error("Erreur API");
    }

    return response.json();
};

export default api;