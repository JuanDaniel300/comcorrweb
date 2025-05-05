import { useSession, signIn, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  const login = async (credentials: { username: string; password: string }) => {
    const result = await signIn("credentials", {
      redirect: false,
      ...credentials,
    });
    if (!result?.ok) throw new Error("Inicio de sesión fallido");
  };

  const logout = () => signOut({ callbackUrl: "/login" });

  return {
    user: session?.user,
    token: session?.accessToken as string | undefined,
    isDemo: session?.userType === "demo",
    login,
    logout,
    status,
  };
}
