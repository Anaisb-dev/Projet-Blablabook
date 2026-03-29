export default async function api(endpoint, method = "GET", body) {

    const headers = {
    "Content-Type": "application/json",
    // pas d'Authorization pour register/login
};

const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    method,
    headers,
    body: JSON.stringify(body)
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