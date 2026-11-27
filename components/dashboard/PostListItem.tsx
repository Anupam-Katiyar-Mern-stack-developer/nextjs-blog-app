import Link from "next/link";
import { Heart, MessageSquare, ExternalLink, Pencil } from "lucide-react";

interface PostListItemProps {
    post: {
        id: string;
        title: string;
        slug: string;
        published: boolean;
        createdAt: Date;
        category: { name: string };
        _count: { likes: number; comments: number };
    };
}

export function PostListItem({ post }: PostListItemProps) {
    return (
        <article className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition">
            <div className="space-y-2 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900 truncate max-w-md">
                        {post.title}
                    </h3>

                    <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full ${post.published
                                ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
                                : "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20"
                            }`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${post.published ? "bg-emerald-500" : "bg-amber-500"
                                }`}
                        />
                        {post.published ? "Published" : "Draft"}
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                        {post.category.name}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-rose-500" />
                        {post._count.likes}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        {post._count.comments}
                    </span>
                    <span>
                        {new Date(post.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                {post.published && (
                    <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        View
                    </Link>
                )}
                <Link
                    href={`/dashboard/edit/${post.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 transition"
                >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                </Link>
            </div>
        </article>
    );
}