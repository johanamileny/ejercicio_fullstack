import { API_URL } from "../constants/api";
import { AuthenticatedUser } from "~/interfaces/AuthenticatedUser";
import { LoginRequest } from "../interfaces/AuthInterfaces";

export const loginUser = async (credentials: LoginRequest): Promise<AuthenticatedUser> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message || "Error desconocido"}`);
    }

    // Transformar la respuesta en un objeto de usuario autenticado
    return await response.json();
  } catch (error) {
    console.error("Error en login:", error);
    throw new Error("Error al autenticar usuario");
  }
};

