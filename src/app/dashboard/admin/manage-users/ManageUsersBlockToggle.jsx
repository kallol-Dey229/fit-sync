"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { XCircle, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setUserStatus } from "@/lib/api/users";


const ManageUsersBlockToggle = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const userId = user?.id || user?._id;
    const isBlocked = user?.status === "BLOCKED";

    const handleToggle = async () => {
        if (loading) return;
        setLoading(true);

        const nextStatus = isBlocked ? "ACTIVE" : "BLOCKED";

        try {
            const res = await setUserStatus(userId, nextStatus);

            if (res?.success) {
                toast.success(
                    nextStatus === "BLOCKED"
                        ? `${user?.name || "User"} has been blocked.`
                        : `${user?.name || "User"} has been unblocked.`
                );
                router.refresh();
            } else {
                toast.error(res?.message || "Failed to update status.");
                setLoading(false);
            }
        } catch (err) {
            toast.error("Something went wrong.");
            setLoading(false);
        }
    };

    if (isBlocked) {
        return (
            <Button
                size="sm"
                onClick={handleToggle}
                isDisabled={loading}
                className="bg-transparent text-[#00E676] hover:bg-[#0E2519] font-bold text-xs px-3 h-8 border border-transparent hover:border-[#163E26] rounded-lg flex items-center gap-1.5 disabled:opacity-50"
            >
                <CheckCircle size={14} />
                {loading ? "Updating..." : "Unblock"}
            </Button>
        );
    }

    return (
        <Button
            size="sm"
            onClick={handleToggle}
            isDisabled={loading}
            className="bg-transparent text-[#FF3D00] hover:bg-[#251214] font-bold text-xs px-3 h-8 border border-transparent hover:border-[#3E1A1D] rounded-lg flex items-center gap-1.5 disabled:opacity-50"
        >
            <XCircle size={14} />
            {loading ? "Updating..." : "Block"}
        </Button>
    );
};

export default ManageUsersBlockToggle;