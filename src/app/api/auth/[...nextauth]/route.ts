import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { authOptionsUtils } from "@/lib/session";

const handler = NextAuth(authOptionsUtils);
export { handler as GET, handler as POST };
