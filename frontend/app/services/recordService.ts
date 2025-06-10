import { API_URL } from "../constants/api"; // URL del backend
import { UserRecord } from "../interfaces/UserRecord"; // Interfaz para tipado de datos

export const registerUser = async (user: UserRecord) => {
  try {
    const response = await fetch(`${API_URL}/api/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error ${response.status}: ${errorData.message || "Error desconocido"}`
      );
    }

    return await response.json(); // Devuelve la respuesta del backend
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al registrar usuario:", error.message);
      throw error;
    } else {
      throw new Error("Error desconocido al registrar usuario");
    }
  }
};
