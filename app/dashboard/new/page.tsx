import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { createPost } from "@/actions/post.actions";
import { Navbar } from "@/components/Navbar";
import { PostForm } from "@/components/dashboard/PostForm";

export default async function NewPostPage() {
    const [categories, tags] = await Promise.all([
        db.category.findMany({ orderBy: { name: "asc" } }),
        db.tag.findMany({ orderBy: { name: "asc" } }),
    ]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
                <div className="space-y-2">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Create New Post
                    </h1>
                    <p className="text-sm text-slate-500">
                        Write your article, assign a category and tags, and choose whether
                        to publish or save as a draft.
                    </p>
                </div>

                <PostForm
                    action={createPost}
                    categories={categories}
                    tags={tags}
                />
            </main>
        </div>
    );
}