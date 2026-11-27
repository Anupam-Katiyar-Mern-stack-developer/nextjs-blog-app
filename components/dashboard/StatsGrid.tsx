import { FileText, CheckCircle2, Clock, Heart } from "lucide-react";

interface StatsGridProps {
    totalPosts: number;
    publishedCount: number;
    draftCount: number;
    totalLikes: number;
}

export function StatsGrid({
    totalPosts,
    publishedCount,
    draftCount,
    totalLikes,
}: StatsGridProps) {
    const stats = [
        {
            label: "Total Posts",
            value: totalPosts,
            icon: FileText,
            iconStyle: "bg-slate-100 text-slate-700",
            valueStyle: "text-slate-900",
        },
        {
            label: "Published",
            value: publishedCount,
            icon: CheckCircle2,
            iconStyle: "bg-emerald-50 text-emerald-600",
            valueStyle: "text-emerald-600",
        },
        {
            label: "Drafts",
            value: draftCount,
            icon: Clock,
            iconStyle: "bg-amber-50 text-amber-600",
            valueStyle: "text-amber-600",
        },
        {
            label: "Total Likes",
            value: totalLikes,
            icon: Heart,
            iconStyle: "bg-rose-50 text-rose-600",
            valueStyle: "text-rose-600",
        },
    ];

    return (
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={stat.label}
                        className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-xs sm:text-sm font-medium text-slate-500">
                                {stat.label}
                            </p>
                            <span className={`p-2 rounded-lg ${stat.iconStyle}`}>
                                <Icon className="w-4 h-4" />
                            </span>
                        </div>
                        <p className={`text-2xl sm:text-3xl font-bold mt-3 ${stat.valueStyle}`}>
                            {stat.value}
                        </p>
                    </div>
                );
            })}
        </section>
    );
}