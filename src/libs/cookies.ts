// lib/cookies.ts
"use server";

import { cookies } from "next/headers";

export async function getDemoTokenFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("demo_token")?.value || null;
  const exp = cookieStore.get("demo_token_exp")?.value;

  if (!token || !exp) return null;

  const now = Math.floor(Date.now() / 1000);
  if (now >= parseInt(exp, 10)) return null;

  return token;
}

export async function setDemoTokenInCookies(token: string, exp: number) {
  const cookieStore = await cookies();
  cookieStore.set("demo_token", token, {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "lax",
  });

  cookieStore.set("demo_token_exp", exp.toString(), {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "lax",
  });
}
