import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

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

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("hola");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "applicantion/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const data = await res.json();

        console.log("hola");

        if (res.ok && data.token) {
          return {
            id: data.user?.id ?? "guest",
            name: data.user?.nombre ?? "Invitado",
            email: data.user?.email ?? credentials?.email,
            token: data.token,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.token) {
        token.accessToken = user.token;
        token.userType = user?.userName === "demo_user" ? "demo" : "real";
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
