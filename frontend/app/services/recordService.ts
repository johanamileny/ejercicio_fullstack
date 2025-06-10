import { API_URL } from "../constants/api"; // URL del backend
import { UserRecord } from "../interfaces/UserRecord"; // Interfaz para tipado de datos

export const registerUser = async (user: UserRecord) => {
  try {
    console.log('Attempting to register user:', { ...user, password: '[HIDDEN]' });
    console.log('API URL:', `${API_URL}/api/usuarios`);
    
    const response = await fetch(`${API_URL}/api/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      // Add timeout and better error handling
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      let errorMessage = `Error ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.title || errorMessage;
      } catch (e) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return await response.json(); // Devuelve la respuesta del backend
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al registrar usuario:", error.message);
      // Provide more specific error messages
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('No se puede conectar con el servidor. Verifica que el backend esté ejecutándose en http://localhost:5207');
      }
      if (error.name === 'TimeoutError') {
        throw new Error('La conexión al servidor ha expirado. Intenta nuevamente.');
      }
      throw error;
    } else {
      throw new Error("Error desconocido al registrar usuario");
    }
  }
};

