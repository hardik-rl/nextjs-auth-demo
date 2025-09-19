// import { signToken } from "@/app/lib/auth";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   // Dummy check (replace with DB check)
//   if (email === "test@test.com" && password === "123456") {
//     const token = signToken({ email });
//     const res = NextResponse.json({ success: true });
//     res.cookies.set("token", token, { httpOnly: true });
//     return res;
//   }

//   return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
// }

import { signToken } from "@/app/lib/auth";
import { findUser } from "@/app/lib/userStore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = findUser(email, password);
  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ email: user.email });
  const res = NextResponse.json({ success: true, user: { email: user.email } });
  res.cookies.set("token", token, { httpOnly: true });
  return res;
}
