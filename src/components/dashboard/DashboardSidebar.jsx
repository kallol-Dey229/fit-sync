"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { House, Bookmark, Heart, Medal, Persons, PersonPlus, CreditCard, FileText, LayoutHeaderSideContent} from "@gravity-ui/icons";

import { Plus, Dumbbell } from "lucide-react";

import { Avatar, Button, Chip, Drawer, Spinner} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

export function DashboardSidebar() {
    const pathname = usePathname();

    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner size="lg" color="warning" />
            </div>
        );
    }

    const user = session?.user;

    

    const memberNavLinks = [
        {
            icon: House,
            href: "/dashboard/member",
            label: "Overview",
        },
        {
            icon: Bookmark,
            href: "/dashboard/booked-classes",
            label: "Booked Classes",
        },
        {
            icon: Heart,
            href: "/dashboard/member/favorites",
            label: "Favorites",
        },
        {
            icon: Medal,
            href: "/dashboard/apply-trainer",
            label: "Apply as Trainer",
        },
    ];

  

    const trainerNavLinks = [
        {
            icon: House,
            href: "/dashboard/trainer",
            label: "Overview",
        },
        {
            icon: Plus,
            href: "/dashboard/trainer/add-class",
            label: "Add Class",
        },
        {
            icon: Dumbbell,
            href: "/dashboard/trainer/my-classes",
            label: "My Classes",
        },
        {
            icon: Plus,
            href: "/dashboard/trainer/add-forum-post",
            label: "Add Forum Post",
        },
        {
            icon: FileText,
            href: "/dashboard/trainer/my-forum-posts",
            label: "My Forum Posts",
        },
    ];

   

    const adminNavLinks = [
        {
            icon: House,
            href: "/dashboard/admin",
            label: "Overview",
        },
        {
            icon: Plus,
            href: "/dashboard/admin/add-forum-post",
            label: "Add Forum Post",
        },
        {
            icon: Persons,
            href: "/dashboard/admin/manage-users",
            label: "Manage Users",
        },
        {
            icon: PersonPlus,
            href: "/dashboard/admin/applied-trainers",
            label: "Applied Trainers",
        },
        {
            icon: Dumbbell,
            href: "/dashboard/admin/manage-trainers",
            label: "Manage Trainers",
        },
        {
            icon: Bookmark,
            href: "/dashboard/admin/manage-classes",
            label: "Manage Classes",
        },
        {
            icon: CreditCard,
            href: "/dashboard/admin/transactions",
            label: "Transactions",
        },
        {
            icon: FileText,
            href: "/dashboard/admin/manage-posts",
            label: "Manage Posts",
        },
    ];

    

    const navLinksMap = {
        member: memberNavLinks,
        trainer: trainerNavLinks,
        admin: adminNavLinks,
    };

    const navItems = navLinksMap[user?.role] || memberNavLinks;

    

    const navContent = (
        <>
            

            <div className="mb-6 border-b border-white/10 pb-6">
                <div className="flex items-center gap-4">
                    <Avatar className="bg-orange-600">
                        <Avatar.Image referrerPolicy="no-referrer" alt="user image" src={user?.image} />
                        <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                    </Avatar>

                    <div className="min-w-0">
                        <h2 className="truncate font-bold text-lg text-white">
                            {user?.name}
                        </h2>

                        <Chip
                            size="sm"
                            color="warning"
                            variant="flat"
                            className="mt-2 uppercase"
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
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${active
                                    ? "bg-orange-600 text-white"
                                    : "text-gray-400 hover:bg-[#151734] hover:text-white"
                                }`}
                        >
                            <item.icon className="size-5" />

                            <span className="font-medium">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </>
    );

    return (
        <>
            {/* Desktop */}

            <aside className="hidden h-screen w-72 shrink-0 border-r border-white/10 bg-[#06071B] p-6 lg:block">
                {navContent}
            </aside>

            {/* Mobile */}

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