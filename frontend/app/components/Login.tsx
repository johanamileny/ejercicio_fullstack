import React, { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { LoginFormValues } from "~/interfaces/loginForm";
import "~/styles/login.css";
import { loginUser } from "~/services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: LoginFormValues = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    if (!data.email || !data.password) {
      setErrorMessage("Todos los campos son obligatorios");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    try {
      const user = await loginUser(data);
      console.log("Respuesta del backend:", user);

      if (user?.token) {
        sessionStorage.setItem(
          "userAuthData",
          JSON.stringify({
            token: user.token,
            email: data.email,
          })
        );

        document.cookie = `token=${user.token}; path=/; SameSite=Strict;`;
        console.log("Current cookies:", document.cookie);

        window.dispatchEvent(new Event("userAuthChange"));

        // Redirigir tras inicio de sesión exitoso
        navigate("/");
      } else {
        setErrorMessage("Usuario no existe");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error al autenticar:", error);
      setErrorMessage("Error en la solicitud.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  return (
    <div className="login-container">
      <form id="formRegister" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Introduce tu correo electrónico"
          required
          autoComplete="email"
          className="input"
        />

        <input
          type="password"
          name="password"
          placeholder="Introduce tu contraseña"
          required
          autoComplete="current-password"
          className="input"
        />
        
        <button type="submit" className="sessionButton">
          Iniciar Sesión
        </button>

        <div className="registerLinkContainer">
          <span>¿Aún no tienes cuenta?</span>
          <a href="/record" className="registerLink">
            <strong>Registrarse</strong>
          </a>
        </div>
      </form>

      {errorMessage && (
        <div className="snackbar">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
