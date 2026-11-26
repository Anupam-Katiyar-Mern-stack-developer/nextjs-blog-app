"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

const signupSchema = z.object({
    name: z.string().min(2, "name atleast 2 must char"),
    email: z.string().email("enter valid email"),
    password: z.string().min(6, "password atleaset six char"),
});

export async function signupUser(prevState: any, formData: FormData) {
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const parsed = signupSchema.safeParse(data);

    if (!parsed.success) {
        return {
            error: parsed.error.issues[0].message, succes: ""
        };
    }


    const { name, email, password } = parsed.data;

    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
        return { error: "email is already registerd " };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   const res= await db.user.create({
        data: {
            name, email, password: hashedPassword
        },
    });

    console.log(res);

    return { error: "", success: "Acoount created successfully" };
}

export async function loginUser(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        });

    } catch (error) {

        if (error instanceof AuthError) {
            return { error: "email  or password are invalid" };
        }
        throw error;

    }
    return { error: "" };
}