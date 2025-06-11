import React, { useState } from "react";
import "../styles/record.css";
import { registerUser } from "../services/recordService";
import { UserRecord } from "../interfaces/UserRecord";

const RegisterForm: React.FC = () => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false); // Estado del mensaje de éxito
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error
  const [selectedRole, setSelectedRole] = useState<string>(""); // Estado para el rol seleccionado

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null); // Clear previous errors

    const formData = new FormData(event.currentTarget);
    const user: UserRecord = {
      email: formData.get("email") as string,
      nombre: formData.get("nombre") as string,
      password: formData.get("password") as string,
    };

    // Validación de campos requeridos
    if (!user.email || !user.nombre || !user.password) {
      setErrorMessage("Todos los campos son obligatorios.");
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }

    try {
      // Usa el servicio para enviar datos al backend
      const response = await registerUser(user);
      console.log("Usuario registrado exitosamente:", response);

      setSuccessMessage(true); // Mostrar mensaje de éxito

      setTimeout(() => {
        window.location.href = "/login"; // Redirigir al login
        setSuccessMessage(false); // Ocultar mensaje después de redirigir
      }, 3000);
    } catch (error) {
      console.error("Error durante el registro:", error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Error durante el registro. Verifica la conexión con el servidor.");
      }
      setTimeout(() => setErrorMessage(null), 8000); // Show error longer
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(event.target.checked); // Actualiza el estado del checkbox
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value); // Actualiza el rol seleccionado
  };

  return (
    <div id="Registercon">
      <form id="formRegister" className="form-container" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
          className="input"
        />
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Enter your name"
          required
          className="input"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
          className="input"
        />

       

        <label id="terms">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={isCheckboxChecked}
          />{" "}
          Acepto los{" "}
          <a
            id="terms-link"
            href="https://amadeus.com/es/politicas/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>términos y condiciones</strong>
          </a>{" "}
          de la política de protección de datos.
        </label>
        <button className="registerButton" id="button" type="submit" disabled={!isCheckboxChecked}>
          Registrarse
        </button>
      
        <a href="/login">¿Ya tienes una cuenta? Inicia sesión</a>
      </form>
      {successMessage && (
        <div id="mensaje-exito">
          <p>¡Registro exitoso! Redirigiendo...</p>
        </div>
      )}
      {errorMessage && (
        <div id="mensaje-error" className="snackbar">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
