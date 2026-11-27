import Link from "next/link";
import { Plus, Sparkles } from "lucide-react";

export function EmptyPosts() {
    return (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-10 sm:p-14 text-center space-y-4">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="font-semibold text-slate-900">No posts yet</h3>
                <p className="text-sm text-slate-500">
                    Start writing your first technical article. Save it as a draft or
                    publish it directly to the feed.
                </p>
            </div>
            <Link
                href="/dashboard/new"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-xs transition"
            >
                <Plus className="w-4 h-4" />
                Write Your First Post
            </Link>
        </div>
    );
}