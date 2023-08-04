import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export { default } from "next-auth/middleware"

/* export default withAuth(
    function middleware(req) {
        console.log(req.nextUrl.pathname)
        if (req.nextUrl.pathname === '/admin/roles' && req.nextauth.token.role !== 3) {
            return new NextResponse('You are not allowed to access this page.')
        }
    },
    {
        callback: {
            authorized: () => {
                let { token } = params;
                return !!token;
            }
        }
    }
); */

export const config = {
    matcher: [
        '/admin/:path*',
        '/api/:path*'
    ],
}

