import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (!token) {
    // Not logged in → send to login if private page
    if (
      url.pathname.startsWith("/Dashboard") ||
      url.pathname.startsWith("/Analytics") ||
      url.pathname.startsWith("/SetPageName")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // If logged in but not verified → restrict private pages
  if (
    !token.verified &&
    (url.pathname.startsWith("/Dashboard") ||
      url.pathname.startsWith("/Analytics"))
  ) {
    return NextResponse.redirect(new URL("/verification", request.url));
  }

  // If logged in but has no userName → force setup
  if (
    token.userName === "" &&
    (url.pathname.startsWith("/Dashboard") ||
      url.pathname.startsWith("/Analytics"))
  ) {
    return NextResponse.redirect(new URL("/SetPageName", request.url));
  }

  // If already has userName, block access to setup page
  if (token.userName !== "" && url.pathname.startsWith("/SetPageName")) {
    return NextResponse.redirect(new URL("/Dashboard", request.url));
  }

  // If logged in, prevent access to public pages
  if (
    url.pathname.startsWith("/signup") ||
    url.pathname.startsWith("/login") ||
    url.pathname.startsWith("/verification")
  ) {
    return NextResponse.redirect(new URL("/Dashboard", request.url));
  }

  return NextResponse.next();
}
