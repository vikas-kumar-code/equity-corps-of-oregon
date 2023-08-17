import { PrismaClient } from "@prisma/client";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export { default } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const prisma = new PrismaClient();
    const user_id = req.nextauth.token.id;
    // remove first and last "/" in pathname
    let currentPath = req.nextUrl.pathname.replace(/^\/|\/$/g, "");
    const user = prisma.users.findUnique({
      where: {
        id: user_id,
      },
    }).role({
        where:{
            permisssions:{
                
            }
        }
    })
    if (
      req.nextUrl.pathname === "/admin/roles" &&
      req.nextauth.token.role !== 3
    ) {
      return new NextResponse("You are not allowed to access this page.");
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
