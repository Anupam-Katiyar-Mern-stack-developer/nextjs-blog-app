"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { postSchema } from "@/lib/validations";

export type PostActionState = {
    error?: string;
};

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

async function generateUniqueSlug(title: string) {
    const baseSlug = slugify(title) || "post";
    const existing = await db.post.findUnique({ where: { slug: baseSlug } });


    if (!existing) return baseSlug;

    const suffix = Date.now().toString(36).slice(-4);
    return `${baseSlug}-${suffix}`;




}

export async function createPost(
    prevState: PostActionState,
    formData: FormData
): Promise<PostActionState> {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "You must be logged in to create a post." };
    }

    const rawData = {
        title: formData.get("title"),
        content: formData.get("content"),
        categoryId: formData.get("categoryId"),
        coverImage: formData.get("coverImage") || "",
        published: formData.get("published") === "on",
        tagIds: formData.getAll("tagIds").map(String),
    }

    const parsed = postSchema.safeParse(rawData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0].message };
    }

    const { title, content, categoryId, coverImage, published, tagIds } =
        parsed.data;

    const slug = await generateUniqueSlug(title);

    await db.post.create({
        data: {
            title,
            slug,
            content,
            coverImage: coverImage || null,
            published,
            authorId: session.user.id,
            categoryId,
            tags: {
                create: tagIds.map((tagId) => ({ tagId })),
            },
        },
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    redirect("/dashboard");
}