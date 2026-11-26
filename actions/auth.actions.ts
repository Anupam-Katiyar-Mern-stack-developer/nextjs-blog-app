"use server";
import { success, z } from "zod";
import { db } from "@/lib/db";
import { error } from "console";
import bcrypt from "bcryptjs";



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

    await db.user.create({
        data: {
            name, email, password: hashedPassword
        },
    });

    return { error: "", success: "Acoount created successfully" };
}