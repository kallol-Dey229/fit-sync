"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateApplicationStatus } from "@/lib/actions/application";

const AppliedTrainersPageApprove = ({ application }) => {
    const [isApproving, setIsApproving] = useState(false);
    const router = useRouter();

    const applicationId = application?.id || application?._id;
    const applicantName = application?.userName || "this applicant";

    const handleApprove = async () => {
        if (isApproving) return;
        setIsApproving(true);
        try {
            const res = await updateApplicationStatus(applicationId, "APPROVED");

            if (res?.success) {
                toast.success(`${applicantName} is now a trainer.`);
                router.refresh();
            } else {
                toast.error(res?.message || "Failed to approve application.");
                setIsApproving(false);
            }
        } catch (err) {
            toast.error("Something went wrong.");
            setIsApproving(false);
        }
    };

    return (
        <Button
            size="sm"
            onClick={handleApprove}
            isDisabled={isApproving}
            className="text-[#00E676] bg-[#0E2519] hover:bg-green-900 font-bold text-xs px-3 h-8 border border-transparent hover:border-[#163E26] rounded-lg flex items-center gap-1.5 disabled:opacity-50"
        >
            <CheckCircle size={14} />
            {isApproving ? "Approving..." : "Approve"}
        </Button>
    );
};

export default AppliedTrainersPageApprove;