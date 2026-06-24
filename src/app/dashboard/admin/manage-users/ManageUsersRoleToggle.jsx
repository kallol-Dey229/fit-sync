"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Shield, ShieldOff } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { demoteFromAdmin, promoteToAdmin } from "@/lib/api/users";


const ManageUsersRoleToggle = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const userId = user?.id || user?._id;
    const isAdmin = user?.role === "admin";

    const handlePromote = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await promoteToAdmin(userId);
            if (res?.success) {
                toast.success(`${user?.name || "User"} is now an admin.`);
                router.refresh();
            } else {
                toast.error(res?.message || "Failed to promote user.");
                setLoading(false);
            }
        } catch (err) {
            toast.error("Something went wrong.");
            setLoading(false);
        }
    };

    const handleDemote = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await demoteFromAdmin(userId);
            if (res?.success) {
                toast.success(`${user?.name || "User"} has been demoted to ${res.role}.`);
                router.refresh();
            } else {
                toast.error(res?.message || "Failed to demote user.");
                setLoading(false);
            }
        } catch (err) {
            toast.error("Something went wrong.");
            setLoading(false);
        }
    };

    if (isAdmin) {
        return (
            <Button
                size="sm"
                onClick={handleDemote}
                isDisabled={loading}
                className="bg-transparent text-[#717694] hover:bg-[#161826] font-bold text-xs px-3 h-8 border border-transparent hover:border-[#222538] rounded-lg flex items-center gap-1.5 disabled:opacity-50"
            >
                <ShieldOff size={14} />
                {loading ? "Updating..." : "Demote"}
            </Button>
        );
    }

    return (
        <Button
            size="sm"
            onClick={handlePromote}
            isDisabled={loading}
            className="bg-transparent text-[#FFB300] hover:bg-[#252114] font-bold text-xs px-3 h-8 border border-transparent hover:border-[#3E351A] rounded-lg flex items-center gap-1.5 disabled:opacity-50"
        >
            <Shield size={14} />
            {loading ? "Updating..." : "Make Admin"}
        </Button>
    );
};

export default ManageUsersRoleToggle;