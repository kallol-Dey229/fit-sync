"use client";

import React, { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateApplicationStatus } from "@/lib/actions/application";

const AppliedTrainersPageReject = ({ application }) => {
    
    const [isRejecting, setIsRejecting] = useState(false);
    const router = useRouter();

    const applicationId = application?.id || application?._id;
    const applicantName = application?.userName || "this applicant";

    const handleReject = async () => {
        setIsRejecting(true);
        try {
            const res = await updateApplicationStatus(applicationId, "REJECTED");

            if (res?.success) {
                toast.success(`${applicantName}'s application was rejected.`);
                router.refresh();
            } else {
                toast.error(res?.message || "Failed to reject application.");
            }
        } catch (err) {
            toast.error("Something went wrong.");
        } finally {
            setIsRejecting(false);
        }
    };

    return (
        <AlertDialog>
            <Button
                size="sm"
                className="bg-[#411b1a] hover:bg-red-900 font-bold text-xs px-3 h-8 border border-transparent hover:border-[#3E351A] rounded-lg flex items-center gap-1.5 text-white"
            >
                <X size={14} />
                Reject
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Reject this application?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will mark <strong>{applicantName}&apos;s</strong> trainer
                                application as rejected. They will be notified on their dashboard.
                                This action can be reversed later if needed.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button
                                slot="close"
                                variant="danger"
                                onClick={handleReject}
                                isDisabled={isRejecting}
                            >
                                {isRejecting ? "Rejecting..." : "Reject Application"}
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default AppliedTrainersPageReject;