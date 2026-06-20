"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

import { House, Bookmark, Heart, Medal, LayoutHeaderSideContent } from "@gravity-ui/icons";

import { Avatar, Button, Chip, Drawer, Spinner } from "@heroui/react";
import { authClient } from "@/lib/auth-client";


export function DashboardSidebar() {

    const pathname = usePathname();

    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return <div className="flex flex-col items-center gap-2">
            <Spinner color="accent" />
            <span className="text-xs text-muted">Accent</span>
        </div>
    }

    const user = session?.user;

    console.log(user)



    const navItems = [
        {
            icon: House,
            label: "Overview",
            href: "/dashboard",
        },
        {
            icon: Bookmark,
            label: "Booked Classes",
            href: "/dashboard/booked-classes",
        },
        {
            icon: Heart,
            label: "Favorites",
            href: "/dashboard/favorites",
        },
        {
            icon: Medal,
            label: "Apply as Trainer",
            href: "/dashboard/apply-trainer",
        },
    ];

    const navContent = (
        <>

            <div className="border-b border-white/10 pb-6 mb-6">
                <div className="flex items-center gap-4">
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
                        <h2 className="font-bold text-lg text-white">
                            {user?.name}
                        </h2>

                        <Chip
                            size="sm"
                            color="primary"
                            variant="flat"
                            className="uppercase mt-2 rounded-lg py-1 px-3 text-blue-800 shadow-2xl"
                        >
                            {user?.role}
                        </Chip>
                    </div>
                </div>
            </div>


            <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${active
                                ? "bg-[#151734] text-orange-500"
                                : "text-gray-400 hover:bg-[#151734] hover:text-white"
                                }`}
                        >
                            <item.icon className="size-5" />

                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </>
    );

    return (
        <>

            <aside className="hidden h-screen w-72 shrink-0 border-r border-white/10 bg-[#06071B] p-6 lg:block">
                {navContent}
            </aside>




            <Drawer>
                <Button
                    variant="flat"
                    className="lg:hidden"
                >
                    <LayoutHeaderSideContent />
                    Menu
                </Button>

                <Drawer.Backdrop>
                    <Drawer.Content
                        placement="left"
                        className="bg-[#06071B]"
                    >
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />

                            <Drawer.Header>
                                <Drawer.Heading className="text-white">
                                    Dashboard
                                </Drawer.Heading>
                            </Drawer.Header>

                            <Drawer.Body>{navContent}</Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}