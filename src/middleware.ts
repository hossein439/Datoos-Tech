import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/search', '/settings', '/add-link'],
};
