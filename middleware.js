import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (token) {
    // Logged in user with a token
    // Restrict access to signup and login pages if the user is verified and has a username
    if (token.verified && token.userName !== "") {
      if (
        url.pathname.startsWith("/signup") ||
        url.pathname.startsWith("/login")
      ) {
        return NextResponse.redirect(new URL("/Dashboard", request.url));
      }
    }
  }

  // If already has userName, block access to setup page
  if (token && token.userName !== "" && url.pathname.startsWith("/SetPageName")) {
    return NextResponse.redirect(new URL("/Dashboard", request.url));
  }

  // If logged in but not verified → restrict private pages
  if (
    token &&
    !token.verified &&
    (url.pathname.startsWith("/Dashboard") ||
      url.pathname.startsWith("/Analytics"))
  ) {
    return NextResponse.redirect(new URL("/verification", request.url));
  }
  // If logged in but has no userName → force setup
  if (
    token &&
    token.userName === "" &&
    (url.pathname.startsWith("/Dashboard") ||
      url.pathname.startsWith("/Analytics"))
  ) {
    return NextResponse.redirect(new URL("/SetPageName", request.url));
  }
  // If not logged in → send to login if private page
  if (!token) {
    if (
      url.pathname.startsWith("/Dashboard") ||
      url.pathname.startsWith("/Analytics") ||
      url.pathname.startsWith("/SetPageName")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }


  return NextResponse.next();
}