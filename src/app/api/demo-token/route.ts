import { loginRequest } from "@/services/auth/authService";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  console.log({ session });

  if (session) {
    return res.status(200).json(session);
  } else {
    return res.status(401).json({ message: "No session found" });
  }
}
