import { getUserSession } from "@/lib/core/session";
import { Avatar, Card, Chip, Button } from "@heroui/react";
import { Mail, Calendar, ShieldCheck, Pencil } from "lucide-react";
import { redirect } from "next/navigation";

const ProfilePage = async () => {

    const user = await getUserSession();

    if (!user) {
        redirect("/auth/signin/?redirect=/dashboard/profile");
    }

    const joinedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
          })
        : "Unknown";

    return (
        <div className="min-h-screen text-white p-8 font-sans">

            <h1 className="text-3xl ml-20 font-black tracking-wider uppercase mb-8 text-[#F4F4F6]">
                Profile
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start max-w-4xl">

                {/* Left: avatar + identity card */}
                <Card className="bg-[#090A15] border border-[#161826] rounded-2xl p-6 flex flex-col items-center text-center gap-4 lg:col-span-1">
                    <Avatar aria-label={`${user?.name || "User"}'s profile picture`} className="size-24 bg-orange-600">
                        <Avatar.Image
                            referrerPolicy="no-referrer"
                            alt={user?.name || "User"}
                            src={user?.image}
                        />
                        <Avatar.Fallback className="text-2xl font-bold">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </Avatar.Fallback>
                    </Avatar>

                    <div>
                        <h2 className="text-lg font-bold text-[#F4F4F6]">
                            {user?.name || "Unnamed User"}
                        </h2>
                        <p className="text-xs font-mono text-[#565B7F] mt-1 truncate max-w-50">
                            {user?.email}
                        </p>
                    </div>

                    <Chip size="sm" color="warning" variant="flat" className="uppercase">
                        {user?.role || "member"}
                    </Chip>

                    <Button
                        className="w-full mt-2 bg-[#FF4500] hover:bg-[#E03E00] text-white font-black uppercase tracking-wider text-xs h-11 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Pencil size={14} />
                        Edit Profile
                    </Button>
                </Card>

                {/* Right: account details card */}
                <Card className="bg-[#090A15] border border-[#161826] rounded-2xl p-6 gap-4 lg:col-span-2">
                    <Card.Header className="p-0 flex flex-col items-start gap-1">
                        <Card.Title className="text-sm font-bold uppercase tracking-wider text-[#FF4500] font-mono flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FF4500]" /> Account Details
                        </Card.Title>
                    </Card.Header>

                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex items-center justify-between p-3 bg-[#0b0d19] border border-[#1e2235] rounded-xl">
                            <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#565B7F]">
                                <Mail size={14} className="text-[#FF4500]" />
                                Email
                            </span>
                            <span className="text-sm font-semibold text-[#F4F4F6] truncate max-w-[60%]">
                                {user?.email || "—"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-[#0b0d19] border border-[#1e2235] rounded-xl">
                            <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#565B7F]">
                                <ShieldCheck size={14} className="text-[#FF4500]" />
                                Role
                            </span>
                            <span className="text-sm font-semibold text-[#F4F4F6] capitalize">
                                {user?.role || "member"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-[#0b0d19] border border-[#1e2235] rounded-xl">
                            <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#565B7F]">
                                <Calendar size={14} className="text-[#FF4500]" />
                                Member Since
                            </span>
                            <span className="text-sm font-semibold text-[#F4F4F6]">
                                {joinedDate}
                            </span>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default ProfilePage;