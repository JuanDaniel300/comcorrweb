// app/api/auth/logout/route.js

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST() {
  const cookieStore = await cookies();

  // Eliminar las cookies de sesión
  cookieStore.delete("next-auth.session-token");
  cookieStore.delete("next-auth.csrf-token");

  // Redirigir a la página principal
  redirect("/");
}
