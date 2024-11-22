import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token")?.value;

  const loginUrl = new URL("/login", request.url);
  const homeUrl = new URL("/dashboard", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(loginUrl);
  } else {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.redirect(homeUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
