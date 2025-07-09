import NextAuth from "next-auth";
import { authOptionsUtils } from "@/lib/session";

const handler = NextAuth(authOptionsUtils);
export { handler as GET, handler as POST };
