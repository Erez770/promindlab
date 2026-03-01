import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except API routes, _next internals, and static files
    '/((?!api|_next/static|_next/image|favicon.ico|branding|portfolio|team|site.webmanifest).*)',
  ],
};
