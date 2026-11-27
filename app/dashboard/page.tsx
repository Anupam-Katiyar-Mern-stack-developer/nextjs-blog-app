import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Navbar } from "@/components/Navbar";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { EmptyPosts } from "@/components/dashboard/EmptyPosts";
import { PostListItem } from "@/components/dashboard/PostListItem";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const posts = await db.post.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      _count: { select: { comments: true, likes: true } },
    },
  });

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.length - publishedCount;
  const totalLikes = posts.reduce((acc, p) => acc + p._count.likes, 0);

  const initials = (session.user.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Welcome Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-slate-900 to-slate-600 text-white flex items-center justify-center font-bold text-base shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate">
                Welcome back, {session.user.name}
              </h1>
              <p className="text-sm text-slate-500 truncate">
                {session.user.email} • Manage your stories, drafts & engagement
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/new"
            className="sm:hidden w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Write a New Post
          </Link>
        </section>

        {/* Stats Component */}
        <StatsGrid
          totalPosts={posts.length}
          publishedCount={publishedCount}
          draftCount={draftCount}
          totalLikes={totalLikes}
        />

        {/* Posts List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Your Posts</h2>
            <span className="text-xs font-medium text-slate-500 bg-slate-200/70 px-2.5 py-1 rounded-full">
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {posts.length === 0 ? (
            <EmptyPosts />
          ) : (
            <div className="bg-white border border-slate-200/80 rounded-2xl divide-y divide-slate-100 shadow-xs overflow-hidden">
              {posts.map((post) => (
                <PostListItem key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}