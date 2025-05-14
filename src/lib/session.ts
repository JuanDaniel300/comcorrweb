import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    token?: string;
    userName?: string;
  }
  interface Session {
    accessToken?: string;
    userType?: string;
  }
  interface Token {
    accessToken?: string;
  }
}

export const authOptionsUtils: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const data = await res.json();

        if (res.ok && data.token) {
          return {
            id: data?.user?.id ?? "guest",
            name: data?.user?.nombre ?? "Invitado",
            email: data?.user?.email ?? credentials?.email,
            token: data.token,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/Login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  // cookies: {
  //   sessionToken: {
  //     name: "session-cookie",
  //     options: {
  //       httpOnly: true, // Protege la cookie de acceso
  //       secure: process.env.NODE_ENV === "production", // Solo en HTTPS
  //       sameSite: "lax", // Configuración recomendada
  //     },
  //   },
  // },

  callbacks: {
    async jwt({ token, user }) {
      if (user?.token) {
        token.accessToken = user.token;
        token.userType = user?.name === "Invitado" ? "demo" : "real";
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.userType = token.userType as string | undefined;
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
