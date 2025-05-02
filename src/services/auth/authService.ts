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
  console.log("data", data);
  if (data.token) {
    return { token: data.token, user: data?.user?.nombre };
  } else {
    throw new Error("No se ha recibido el token");
  }
};
