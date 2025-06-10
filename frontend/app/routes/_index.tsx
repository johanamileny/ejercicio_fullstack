import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "~/session"; // Asegúrate de tener la sesión configurada

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie") || ""; // Si es null, usa una cadena vacía
  const session = await getSession(request);


  if (!session.has("userId")) {
    return redirect("/record"); // Redirige solo si no hay usuario logueado
  }

  return {}; // Si el usuario está logueado, permite acceder a `/`
};


