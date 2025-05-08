import { loginRequest } from "@/services/auth/authService";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { token, user } = await loginRequest();

    const response = NextResponse.json({ success: true });

    response.cookies.set("demoToken", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 401 }
    );
  }
}
