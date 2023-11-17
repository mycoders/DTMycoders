import { NextRequest, NextResponse } from 'next/server'
import protectedRoutes from './protectedRoutes'
import jwt_decode from "jwt-decode";
import { getUser } from './pages/api/auth/[...thirdweb]';
import { serverClient } from '../sanity/sanity-utils';

export default async function middleware(request: NextRequest) {

  const thirdWebAuthActiveAccount = request.cookies.get("thirdweb_auth_active_account")?.value
  const thirdWebAuthToken = request.cookies.get(`thirdweb_auth_token_${thirdWebAuthActiveAccount}`)?.value
  const currentRoute = request.nextUrl.pathname;
  let user;
  let decodedThirdWebAuthToken;

  if (thirdWebAuthToken){
   decodedThirdWebAuthToken = jwt_decode(thirdWebAuthToken);
   
   user =  await serverClient.fetch(`*[_type == "users" && walletAddress == "${decodedThirdWebAuthToken?.ctx.walletAddress}"]`);
  }
  if(currentRoute == "/signup" && user.length > 0  && user[0].email && !user[0]?.isApproved) {
    const url = request.nextUrl.clone()
    url.pathname = '/wait-for-approval'

    return NextResponse.redirect(url)
  }

  if (currentRoute === '/signup' && user.length > 0 && user[0]?.isApproved ) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  if (protectedRoutes.includes(currentRoute)) {
    if (!thirdWebAuthToken || !user[0].isApproved) {
      console.log("redirecting to login")
        const url = request.nextUrl.clone()
  url.pathname = '/'

      return NextResponse.redirect(url)
    }
   }
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
