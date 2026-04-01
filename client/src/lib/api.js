export default async function api(endpoint, method = "GET", body) {
    const token = localStorage.getItem("token");


 // on ajoute Authorization UNIQUEMENT si token existe
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined // Si body est fourni, on le stringify, sinon on met undefined pour ne pas inclure le champ body dans la requête
});

    if (!response.ok) {
        let errorData;
        try { errorData = await response.json(); } catch(e) { errorData = {}; }
        console.error("Erreur backend :", errorData);
        throw new Error(errorData.message || `Failed to fetch ${endpoint}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}