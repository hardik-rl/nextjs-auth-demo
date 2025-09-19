import { signToken } from "@/app/lib/auth";
import { addUser } from "@/app/lib/userStore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password required" }, { status: 400 });
  }

  try {
    const user = addUser(email, password);
    const token = signToken({ email });
    const res = NextResponse.json({ success: true, user });
    res.cookies.set("token", token, { httpOnly: true });
    return res;
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
