export const validateForm = (
  email: string,
  password: string,
  acceptTerms: boolean
): string | null => {
  if (!email.trim()) return "Por favor, ingrese un correo.";
  if (!password.trim()) return "Por favor, ingrese una contraseña.";
  if (!acceptTerms) return "Debe aceptar los términos.";

  const passwordRegex = /^[a-zA-Z0-9]+$/; // Solo letras y números
  if (!passwordRegex.test(password)) {
    return "La contraseña solo puede contener letras y números.";
  }

  return null; // Sin errores
};

