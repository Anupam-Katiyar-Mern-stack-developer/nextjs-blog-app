"use client";

import { useActionState } from "react";
import { signupUser } from "@/actions/auth.actions";

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signupUser, {
    error: "",
    success: "",
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        action={formAction}
        className="w-full max-w-md space-y-4 border p-6 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold">Create Account</h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          minLength={6}
          required
          className="w-full border p-2 rounded"
        />

        {state?.error && (
          <p className="text-red-500 text-sm">{state.error}</p>
        )}

        {state?.success && (
          <p className="text-green-600 text-sm">{state.success}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}