"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { demoteTrainerToUser } from "@/lib/actions/trainers";


const DemoteTrainerButton = ({ trainer }) => {
    
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const trainerId = trainer?.id || trainer?._id;

    const handleDemote = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await demoteTrainerToUser(trainerId);
            if (res?.success) {
                toast.success(`${trainer?.name || "Trainer"} has been demoted to user.`);
                router.refresh();
            } else {
                toast.error(res?.message || "Failed to demote trainer.");
                setLoading(false);
            }
        } catch (err) {
            toast.error("Something went wrong.");
            setLoading(false);
        }
    };

    return (
        <Button
            size="sm"
            onClick={handleDemote}
            isDisabled={loading}
            className="bg-transparent text-[#FF3D00] hover:bg-[#251214] font-bold text-xs px-4 h-9 border border-[#FF3D00]/40 hover:border-[#FF3D00] rounded-lg disabled:opacity-50"
        >
            {loading ? "Demoting..." : "Demote to User"}
        </Button>
    );
};

export default DemoteTrainerButton;