"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginUser } from "@/actions/auth.actions";


export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(loginUser, { error: "" });

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <form
                action={formAction}
                className="w-full max-w-md space-y-4 border p-6 rounded-lg shadow"
            >
                <h1 className="text-2xl font-bold">
                    Login
                </h1>

                <input type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full border p-2 rounded" />

                <input type="password" name="password" placeholder="Password"
                    required
                    className="w-full border p-2 rounded" />
                {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
                <button type="submit" disabled={isPending} className="w-full
                 bg-black text-white py-2 
                 rounded disabled:opacity-50">
                    {isPending ? "Logging in..." : "Login"}
                </button>

                <p className="text-sm text-center">
                    don't an account?{""}
                    <Link href="/signup" className="underline">Sign up</Link>
                </p>
            </form>
        </div>
    )
}