import { User } from "../interfaces/user";
import { API_URL } from "../constants/api";

export async function fetchUserPreferences(email: string, token: string) {
  const response = await fetch(`${API_URL}/api/Destinos/by-email/${email}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las preferencias del usuario");
  }

  const data = await response.json();
  return data;
}

export async function fetchAllUsersData(token: string): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/api/usuarios`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}