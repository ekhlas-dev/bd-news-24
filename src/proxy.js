
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    const { pathname } = request.nextUrl;

    // Protected routes
    const protectedRoutes = ["/profile", "/news"];

    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    // If user is not logged in
    if (isProtectedRoute && !session) {
      return NextResponse.redirect(
        new URL("/signin", request.url)
      );
    }

    // If user is already logged in
    if (
      (pathname === "/signin" || pathname === "/signup") &&
      session
    ) {
      return NextResponse.redirect(
        new URL("/profile", request.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy error:", error);

    return NextResponse.redirect(
      new URL("/signin", request.url)
    );
  }
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/news/:path*",
    "/signin",
    "/signup",
  ],
};
