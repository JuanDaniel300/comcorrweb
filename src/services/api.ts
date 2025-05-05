import axios, { AxiosRequestConfig } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getSession } from "next-auth/react";

let demoToken: string | null = null;

async function getDemoToken(): Promise<string> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: process.env.NEXT_DEMO_USER_EMAIL,
        password: process.env.NEXT_DEMO_USER_PASSWORD,
      }),
    }
  );

  if (!response.ok) throw new Error("Error al obtener token demo");
  const data = await response.json();
  return data.token;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL de tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();

  let token: string | null = null;

  if (session?.accessToken) {
    token = session.accessToken as string;
  } else {
    if (!demoToken) {
      demoToken = await getDemoToken();
    }
    token = demoToken;
  }

  config.headers = config.headers || {};
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

createAuthRefreshInterceptor(axiosInstance, async () => {
  demoToken = await getDemoToken();
});

export default axiosInstance;
