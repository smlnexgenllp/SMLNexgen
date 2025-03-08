import { NextResponse } from 'next/server';

export function middleware(req) {
  const authToken = req.cookies.get('authToken');

  // Define protected routes
  const protectedRoutes = ['/Admin/Dashboard'];

  // If user is not authenticated, redirect to login page
  if (protectedRoutes.includes(req.nextUrl.pathname) && !authToken) {
    return NextResponse.redirect(new URL('/Admin', req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to the Admin routes
export const config = {
  matcher: ['/Admin/:path*'],
};
