import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { isAuthenticated, isUserAdmin } from './libs/auth';

export default async function middleware(
  req: NextRequest,
): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  const USER_TOKEN = req.cookies.get('userToken');
  const USER_TYPE = req.cookies.get('userType');

  const isLogged = isAuthenticated(USER_TOKEN ? USER_TOKEN.value : '');
  const isAdmin = isUserAdmin(USER_TYPE ? USER_TYPE.value : '');

  if (
    (isAdmin || !isLogged) &&
    ['/change-password'].some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (pathname === '/auth/login' && isLogged && isAdmin) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  if (
    pathname.startsWith('/admin') &&
    !isAdmin &&
    !pathname.startsWith('/auth/login')
  ) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  return NextResponse.next();
}

 
export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next|monitoring).*)',
    '/',
    '/(api|trpc)(.*)',
    '/auth',
    '/auth/:path*',
    '/admin',
    '/admin/:path*',
  ],
};
