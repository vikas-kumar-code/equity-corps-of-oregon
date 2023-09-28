import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const requestedPath = req.nextUrl.pathname;
    const requestParts = requestedPath.split("/");
    const requestedMethod = req.method.toLowerCase();
    let access = false;

    try {
      // Admin by pass
      if (token.role_id === 1) {
        access = true;
      } else {
        token.routes.find((route) => {
          const patternParts = route.url.split("/");
          const patternMethod = route.method?.toLowerCase() || "get";
          
          // For pattern -> [[...path]]
          if (String(patternParts.slice(-1)) === "@path") {            
            if (requestedPath.startsWith(route.url.replace("@path",''))) {
              if (requestParts.length >= patternParts.length) {
                access = true;
              }
            }
          } else if (patternParts.length === requestParts.length) {
            for (let i = 0; i < patternParts.length; i++) {
              if (patternParts[i].startsWith(":")) {
                continue; // Ignore dynamic segments
              }
              if (String(patternParts[i]) === String(requestParts[i])) {
                access = true;
              } else {
                access = false;
                break;
              }
            }
          }
          if (access) {
            if (!(patternMethod.split("|")).includes(requestedMethod)) {
              access = false;
            }
            return true;
          }
        });
      }
    } catch (err) {}

    // Send response for unauthorized access.
    if (!access) {
      if (requestedPath.startsWith("/api")) {        
        return NextResponse.json({
          error: true,
          message: "You are not allowed to access this route.",
        });
      } else {
        return NextResponse.rewrite(new URL("/unauthorized", req.url));
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
