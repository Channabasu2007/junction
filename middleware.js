import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
    token.userName === "" &&
    (url.pathname.startsWith("/Dashboard") ||
      url.pathname.startsWith("/Analytics"))
  ) {
    return NextResponse.redirect(new URL("/SetPageName", request.url));
  }
  if (
    token &&
    token.userName !== "" &&
    url.pathname.startsWith("/SetPageName")
  ) {
    return NextResponse.redirect(new URL("/Dashboard", request.url));
  }
  if (
    token &&
    !token.verified &&
    (url.pathname.startsWith("/Dashboard") ||
      url.pathname.startsWith("/Analytics"))
  ) {
    return NextResponse.redirect(new URL("/verification", request.url));
  }
  // If authenticated and trying to access public pages, redirect to Dashboard
  if (
    token &&
    (url.pathname.startsWith("/signup") ||
      url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/verification"))
  ) {
    return NextResponse.redirect(new URL("/Dashboard", request.url));
  }

  // If not authenticated and trying to access private pages, redirect to login
  if (
    !token &&
    (url.pathname.startsWith("/Dashboard") ||
      url.pathname.startsWith("/Analytics") ||
      url.pathname.startsWith("/SetPageName"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signup",
    "/login",
    "/verification",
    "/Dashboard",
    "/Analytics",
    "/SetPageName",
  ],
};
