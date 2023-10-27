import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "@/utils/prisma";

export const authOptions = {
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.users.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            role: {
              include: {
                permissions: true,
              },
            },
          },
        });

        if (user) {
          let is_first_login = user.is_first_login;
          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );
          if (isPasswordValid) {
            if (user.status === 1) {
              // if (user.verified === 1) {

              // update on board status
              if (user.on_board_status === 1) {
                await prisma.users.update({
                  where: {
                    id: user.id,
                  },
                  data: {
                    on_board_status: 2,
                  },
                });
              }

              // update on user first login
              if (user.is_first_login === 1) {
                await prisma.users.update({
                  where: {
                    id: user.id,
                  },
                  data: {
                    on_board_status: 2,
                    is_first_login: 0,
                  },
                });
              }

              // fetch all authorized routes
              if (
                user?.role?.permissions &&
                user?.role?.permissions.length > 0
              ) {
                const authorizedRoutes = await prisma.routes.findMany({
                  where: {
                    id: {
                      in: user?.role?.permissions.map((item) => item.route_id),
                    },
                  },
                });
                user.routes = authorizedRoutes.map((route) => {
                  return { url: route.url, method: route.method };
                });
              }
              user.is_first_login = is_first_login;
              return user;
              // } else {
              //   throw new Error("Your account is not verified.");
              // }
            } else {
              throw new Error("Your account is not active.");
            }
          } else {
            throw new Error("Email or password is invalid!");
          }
        } else {
          throw new Error("Email or password is invalid!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role_id = token.role_id;
      session.user.routes = token.routes;
      session.user.is_first_login = token.is_first_login;
      session.maxAge = 0;
      return session;
    },

    // First this function is called.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role_id = user.role_id;
        token.name = user.name;
        token.routes = user.routes;
        token.maxAge = 0;
        token.is_first_login = user.is_first_login;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
