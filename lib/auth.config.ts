import { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";



export const authConfig = {
    providers: [GitHub, Google],
    pages: {
        signIn: "/login",
    },

    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isDashboard = nextUrl.pathname.startsWith("/dashboard");


            if (isDashboard && !isLoggedIn) {
                return false;
            }
            return true;
        },
    },
} satisfies NextAuthConfig;