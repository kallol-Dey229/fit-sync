"use client"
import { authClient } from '@/lib/auth-client';
import { Avatar, Card, Chip } from "@heroui/react";
import { Bookmark, Heart } from "lucide-react";

const MemberDashboardPage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    return (
        <div className="space-y-8 mt-5 md:mt-10">


            <h1 className="text-2xl font-black uppercase text-white sm:text-3xl lg:text-4xl">
                My Dashboard
            </h1>


            <div className="grid gap-6 md:grid-cols-2">

                <Card className="bg-[#0b0d26] border border-white/10 p-6">
                    <div className="flex items-center gap-5">

                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-600/10">
                            <Bookmark className="text-orange-500" size={26} />
                        </div>

                        <div>
                            <p className="text-lg text-gray-400">
                                Booked Classes
                            </p>

                            <h2 className="text-4xl font-bold text-white">
                                3
                            </h2>

                            <p className="mt-1 text-green-400">
                                +1 this month
                            </p>
                        </div>

                    </div>
                </Card>

                <Card className="border border-white/10 bg-[#0b0d26] p-4 sm:p-6">
                    <div className="flex items-center gap-5">

                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-600/10">
                            <Heart className="text-orange-500" size={26} />
                        </div>

                        <div>
                            <p className="text-lg text-gray-400">
                                Favorite Classes
                            </p>

                            <h2 className="text-4xl font-bold text-white">
                                5
                            </h2>

                            <p className="mt-1 text-green-400">
                                2 new saves
                            </p>
                        </div>

                    </div>
                </Card>

            </div>

            {/* Profile */}
            <Card className="bg-[#0b0d26] border border-white/10 p-8">

                <h2 className="mb-8 text-2xl font-bold text-white">
                    Profile
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

                            <Chip
                                color="warning"
                                variant="bordered"
                                className="uppercase"
                            >
                                Trainer Application: Pending
                            </Chip>

                        </div>

                    </div>

                </div>

            </Card>

        </div>
    );
};

export default MemberDashboardPage;