import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { hasCookie } from 'cookies-next';

export default function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const isUserAuthorized = hasCookie('token', { req, res });

  const url = req.nextUrl.clone();

  if (
    url.pathname === '/sign-in' ||
    url.pathname === '/sign-up'
  ) {
    if (isUserAuthorized) {
      url.pathname = '/'
      return NextResponse.redirect(url)
    } else {
      return NextResponse.next();
    }
  }

  if (
    url.pathname === '/account'
  ) {
    if (!isUserAuthorized) {
      return NextResponse.redirect(url.origin + "/sign-in");
    } else {
      return NextResponse.next();
    }
  }
}