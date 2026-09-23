"use client"
import { Avatar, Card, Chip } from "@heroui/react";
import { Bookmark, ChevronRight, FileText, Users } from "lucide-react";
import Link from "next/link";

const TrainerDashboardPage = ({ user, classes = [], forumPosts = [] }) => {

    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();


    const newClassesThisMonth = classes.filter(c => {

        if (!c.createdAt) return false;

        const createdAt = new Date(c.createdAt);
        return createdAt.getMonth() === thisMonth && createdAt.getFullYear() === thisYear;

    }).length;

    const studentsEnrolled = classes.reduce((total, item) => (
        total + Number(item.bookings ?? item.totalBookings ?? 0)
    ), 0);


    return (
        <div className="space-y-8 mt-5 md:mt-10">


            <h1 className="text-2xl font-black uppercase text-white sm:text-3xl lg:text-4xl">
                My Dashboard
            </h1>


            <div className="grid gap-6 md:grid-cols-3">

                <Card className="bg-[#0b0d26] border border-white/10 p-6">
                    <div className="flex items-center gap-5">

                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-600/10">
                            <Bookmark className="text-orange-500" size={26} />
                        </div>

                        <div>
                            <p className="text-lg text-gray-400">
                                Classes Created
                            </p>

                            <h2 className="text-4xl font-bold text-white">
                                {classes.length}
                            </h2>

                            <p className="mt-1 text-green-400">
                                +{newClassesThisMonth} this month
                            </p>
                        </div>

                    </div>
                </Card>

                <Card className="border border-white/10 bg-[#0b0d26] p-4 sm:p-6">
                    <div className="flex items-center gap-5">

                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-600/10">
                            <FileText className="text-orange-500" size={26} />
                        </div>

                        <div>
                            <p className="text-lg text-gray-400">
                                Forum Posts
                            </p>

                            <h2 className="text-4xl font-bold text-white">
                                {forumPosts.length}
                            </h2>

                            <p className="mt-1 text-gray-500">
                                Published by you
                            </p>
                        </div>

                    </div>
                </Card>

                <Card className="border border-white/10 bg-[#0b0d26] p-4 sm:p-6">
                    <div className="flex items-center gap-5">

                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-600/10">
                            <Users className="text-orange-500" size={26} />
                        </div>

                        <div>
                            <p className="text-lg text-gray-400">
                                Students Enrolled
                            </p>

                            <h2 className="text-4xl font-bold text-white">
                                {studentsEnrolled}
                            </h2>

                            <p className="mt-1 text-gray-500">
                                Across your classes
                            </p>
                        </div>

                    </div>
                </Card>

            </div>

            <Card className="border border-white/10 bg-[#0b0d26] p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Recent Classes</h2>
                        <p className="mt-1 text-sm text-gray-500">Your latest training sessions</p>
                    </div>
                    <Link
                        href="/dashboard/trainer/my-classes"
                        className="flex shrink-0 items-center gap-1 text-sm font-semibold text-orange-500 transition-colors hover:text-orange-400"
                    >
                        View all
                        <ChevronRight size={16} />
                    </Link>
                </div>

                {classes.length > 0 ? (
                    <div className="divide-y divide-white/10">
                        {classes.slice(0, 4).map((item) => (
                            <div key={item._id || item.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                                <div className="min-w-0">
                                    <h3 className="truncate font-semibold text-white">{item.title || "Untitled class"}</h3>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {item.category || "General"} {item.difficulty ? `· ${item.difficulty}` : ""}
                                    </p>
                                </div>
                                <div className="shrink-0 text-right">
                                    <p className="font-mono text-sm text-orange-500">{item.bookings || item.totalBookings || 0}</p>
                                    <p className="text-[10px] uppercase tracking-wider text-gray-500">bookings</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
                        You have not created any classes yet.
                    </p>
                )}
            </Card>

            
            <Card className="bg-[#0b0d26] border border-white/10 p-8">

                <h2 className="mb-8 text-2xl font-bold text-white">
                    Details
                </h2>

                <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:text-left">

                    <Avatar className="h-14 w-14 bg-orange-600 text-white">
                        <Avatar.Image
                            src={user?.image}
                            alt={user?.name}
                            referrerPolicy="no-referrer"
                        />
                        <Avatar.Fallback>
                            {user?.name?.charAt(0)}
                        </Avatar.Fallback>
                    </Avatar>

                    <div>

                        <h3 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl wrap-break-words">
                            {user?.name}
                        </h3>

                        <p className="mt-1 break-all text-sm text-gray-400 sm:text-base">
                            {user?.email}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">

                            <Chip
                                color="primary"
                                variant="flat"
                                className="uppercase"
                            >
                                {user?.role}
                            </Chip>

                           

                        </div>

                    </div>

                </div>

            </Card>

        </div>
    );
};

export default TrainerDashboardPage;

