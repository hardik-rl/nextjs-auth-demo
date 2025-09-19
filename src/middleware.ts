import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // 1️⃣ If NOT logged in → block dashboard
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2️⃣ If logged in → block login/signup
  if ((pathname.startsWith("/login") || pathname.startsWith("/signup")) && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// ✅ apply only where needed
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
