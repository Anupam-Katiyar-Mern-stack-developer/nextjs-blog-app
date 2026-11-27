import { z } from "zod";

export const postSchema = z.object({
    title: z
        .string()
        .trim()
        .min(5, "Title must be at least 5 characters")
        .max(150, "Title cannot exceed 150 characters"),
    content: z
        .string()
        .trim()
        .min(20, "Content must be at least 20 characters"),
    categoryId: z.string().min(1, "Please select a category"),
    coverImage: z
        .string()
        .trim()
        .url("Please enter a valid image URL")
        .optional()
        .or(z.literal("")),
    published: z.boolean().default(false),
    tagIds: z.array(z.string()).default([]),
});