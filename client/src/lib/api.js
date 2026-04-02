export default async function api(endpoint, method = "GET", body, options = {}) {

    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(options?.withAuth === true && token && { 
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

