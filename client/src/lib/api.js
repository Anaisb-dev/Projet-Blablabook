export default async function api(endpoint, method = "GET", body) {


const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    method,
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
        body: body ? JSON.stringify(body) : undefined // Si le body est fourni, on le transforme en chaîne de caractère, sinon on met undefined pour ne pas inclure le champ body dans la requête
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