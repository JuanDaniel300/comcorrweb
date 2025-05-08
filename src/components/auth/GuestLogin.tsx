"use client"
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function GuestLogin() {
    useEffect(() => {
        signIn("credentials", {
            email: "Correp@prueba.com",
            password: "prueba12345",
            callbackUrl: "/",
        });
    }, []);

    return null;
}
