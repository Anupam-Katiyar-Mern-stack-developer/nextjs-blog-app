import Link from "next/link";
import { auth } from "@/lib/auth";
import { logoutUser } from "@/actions/auth.actions";
import { Plus, LogOut, LayoutDashboard, Home } from "lucide-react";

export async function Navbar() {
    const session = await auth();

    return (
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-lg tracking-tight text-slate-900"
                >
                    <span className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-sm font-extrabold shadow-xs">
                        DB
                    </span>
                    <span>DevBlog</span>
                </Link>

                <nav className="flex items-center gap-2 sm:gap-3">
                    <Link
                        href="/"
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                    >
                        <Home className="w-4 h-4" />
                        Feed
                    </Link>

                    {session?.user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>

                            <Link
                                href="/dashboard/new"
                                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg text-sm font-medium shadow-xs transition active:scale-[0.98]"
                            >
                                <Plus className="w-4 h-4" />
                                <span>New Post</span>
                            </Link>

                            <form action={logoutUser}>
                                <button
                                    type="submit"
                                    title="Logout"
                                    className="inline-flex items-center gap-1.5 border border-slate-200 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-600 px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden md:inline">Logout</span>
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-xs transition"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}