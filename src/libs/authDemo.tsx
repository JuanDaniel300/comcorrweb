// lib/authDemo.ts
import { signIn, getSession } from "next-auth/react";

export async function ensureDemoLoggedIn() {
    const session = await getSession();

    if (!session || !session.accessToken) {
        await signIn("credentials", {
            email: process.env.NEXT_PUBLIC_DEMO_EMAIL,
            password: process.env.NEXT_PUBLIC_DEMO_PASSWORD,
            redirect: false,
        });
    }
}
