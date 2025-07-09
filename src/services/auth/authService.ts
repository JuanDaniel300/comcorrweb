export const GUEST_CREDENTIALS = {
  email: process.env.NEXT_DEMO_USER_EMAIL,
  password: process.env.NEXT_DEMO_USER_PASSWORD,
};

export const loginRequest = async (credentials = GUEST_CREDENTIALS) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  if (!response.ok) throw new Error("Credenciales Incorrectas");

  const data = await response.json();
  if (data.token) {
    return { token: data.token, user: data?.user?.nombre };
  } else {
    throw new Error("No se ha recibido el token");
  }
};

export async function autoLoginGuest() {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/auth/callback/credentials`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: process.env.NEXT_DEMO_USER_EMAIL as string,
          password: process.env.NEXT_DEMO_USER_PASSWORD as string,
          callbackUrl: "/",
          json: "true",
        }),
        credentials: "include",
      }
    );

    // const data = await response.json();

    return response.ok;
  } catch (error) {
    console.error("Auto-login failed:", error);
    return false;
  }
}

export async function getTokenCookie() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`);

  if (!response.ok) throw new Error("Credenciales Incorrectas");

  const data = await response.json();

  return data;
}
