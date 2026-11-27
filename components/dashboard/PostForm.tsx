"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon, Loader2, Send, Save } from "lucide-react";
import type { PostActionState } from "@/actions/post.actions";

interface OptionItem {
    id: string;
    name: string;
}

interface PostFormProps {
    action: (
        prevState: PostActionState,
        formData: FormData
    ) => Promise<PostActionState>;
    categories: OptionItem[];
    tags: OptionItem[];
    initialData?: {
        title: string;
        content: string;
        categoryId: string;
        coverImage: string;
        published: boolean;
        tagIds: string[];
    };
    submitLabel?: string;
}

export function PostForm({
    action,
    categories,
    tags,
    initialData,
    submitLabel,
}: PostFormProps) {
    const [state, formAction, isPending] = useActionState(action, { error: "" });
    const [isPublished, setIsPublished] = useState(
        initialData?.published ?? false
    );
    const [selectedTags, setSelectedTags] = useState<string[]>(
        initialData?.tagIds ?? []
    );

    const toggleTag = (tagId: string) => {
        setSelectedTags((prev) =>
            prev.includes(tagId)
                ? prev.filter((id) => id !== tagId)
                : [...prev, tagId]
        );
    };

    return (
        <form
            action={formAction}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
        >
            {/* Title */}
            <div className="space-y-2">
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-slate-700"
                >
                    Post Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    defaultValue={initialData?.title}
                    placeholder="e.g., Mastering Next.js App Router & Prisma"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition"
                />
            </div>

            {/* Category & Cover Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label
                        htmlFor="categoryId"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Category
                    </label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        required
                        defaultValue={initialData?.categoryId ?? ""}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition"
                    >
                        <option value="" disabled>
                            Select a category
                        </option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="coverImage"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Cover Image URL{" "}
                        <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                        <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            id="coverImage"
                            name="coverImage"
                            type="url"
                            defaultValue={initialData?.coverImage}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition"
                        />
                    </div>
                </div>
            </div>

            {/* Tags Multi-Select Pills */}
            <div className="space-y-2">
                <span className="block text-sm font-medium text-slate-700">Tags</span>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => {
                        const isSelected = selectedTags.includes(tag.id);
                        return (
                            <label
                                key={tag.id}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer border transition select-none ${isSelected
                                        ? "bg-slate-900 text-white border-slate-900"
                                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    name="tagIds"
                                    value={tag.id}
                                    checked={isSelected}
                                    onChange={() => toggleTag(tag.id)}
                                    className="sr-only"
                                />
                                #{tag.name}
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
                <label
                    htmlFor="content"
                    className="block text-sm font-medium text-slate-700"
                >
                    Content{" "}
                    <span className="text-slate-400 font-normal">(Markdown supported)</span>
                </label>
                <textarea
                    id="content"
                    name="content"
                    rows={12}
                    required
                    defaultValue={initialData?.content}
                    placeholder="Write your article here..."
                    className="w-full rounded-xl border border-slate-200 p-4 text-slate-900 font-mono text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition resize-y"
                />
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200/80 p-4">
                <div>
                    <p className="text-sm font-medium text-slate-900">
                        Publish immediately
                    </p>
                    <p className="text-xs text-slate-500">
                        Turn off to save this article as a private draft.
                    </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        name="published"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-emerald-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                </label>
            </div>

            {/* Error Message */}
            {state?.error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {state.error}
                </div>
            )}

            {/* Footer Actions */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Cancel
                </Link>

                <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-xs transition disabled:opacity-50 cursor-pointer"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                        </>
                    ) : isPublished ? (
                        <>
                            <Send className="w-4 h-4" />
                            {submitLabel ?? "Publish Post"}
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            {submitLabel ?? "Save Draft"}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}