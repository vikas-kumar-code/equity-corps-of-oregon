import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export { default } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;    
    const requestedPath = req.nextUrl.pathname;

    // Accessibe paths and roles without permission
    const superPaths = ["/api/admin/modules"];
    const superRoles = [1];
    if (!superRoles.includes(token.role_id)) {
      if (!superPaths.includes(requestedPath)) {
        if (!token?.routes || !token?.routes?.includes(requestedPath)) {
          // if (requestedPath.startsWith("/api")) {
          //   return NextResponse.json({
          //     error: true,
          //     message: "You are not allowed to access this route.",
          //   });
          // } else {
          //   return NextResponse.rewrite(new URL("/unauthorized", req.url));
          // }
        }
      }
    }
  },
  {
    callback: {
      authorized: () => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
