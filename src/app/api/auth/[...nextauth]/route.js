import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt";
import prisma from "../../../../../prisma";

export const authOptions = {
    session: {
        strategy: 'jwt',
    },
    //session: "jwt",
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                /* const res = await fetch("/your/endpoint", {
                  method: 'POST',
                  body: JSON.stringify(credentials),
                  headers: { "Content-Type": "application/json" }
                })
                const user = await res.json() */
                /* const user = { id: 1, name: 'vikas', email: 'example@gmail.com' }
                return user; */
                const user = await prisma.users.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user) {
                    return null;
                }

                const isPasswordValid = await compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    return null;
                }

                // If no error and we have user data, return it
                if (user) {
                    return user
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
        //signOut: "/login",
        error: "/error"
    },
    callbacks: {
        async session({ session, token, user }) {
            session.user.id = token.id;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        }
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

