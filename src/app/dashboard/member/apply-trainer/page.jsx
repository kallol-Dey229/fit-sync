import React from "react";
import { getUserSession } from "@/lib/core/session";
import { getMyApplication } from "@/lib/actions/application";
import ApplyTrainerForm from "./ApplyTrainerForm";

const ApplyAsTrainerPage = async () => {
    const user = await getUserSession();
    const application = user?.id ? await getMyApplication(user.id) : null;

    const hasApplied = application?.status === "ACTIVE";
    const wasRejected = application?.status === "REJECTED";
    const wasApproved = application?.status === "APPROVED";

    return (
        <div className="min-h-screen text-white p-8 flex flex-col justify-start items-start font-sans">

            <h1 className="text-3xl font-black tracking-wider uppercase mb-8 text-[#F4F4F6] font-sans">
                Apply As Trainer
            </h1>

            <div className="w-full max-w-xl bg-[#090A15] border border-[#161826] rounded-2xl shadow-2xl p-8">
                {wasApproved ? (
                    <div className="text-center py-6 space-y-3">
                        <p className="text-lg font-bold text-[#00E676]">Congrats, you are a trainer now! 🎉</p>
                        <p className="text-sm text-[#717694]">
                            Your application was approved. You can now create and manage classes
                            from your trainer dashboard.
                        </p>
                    </div>
                ) : hasApplied ? (
                    <div className="text-center py-6 space-y-3">
                        <p className="text-lg font-bold text-[#FF4500]">Application Active</p>
                        <p className="text-sm text-[#717694]">
                            You have already submitted an application. Users are limited to one application profile submission at a time.
                        </p>
                    </div>
                ) : (
                    <>
                        {wasRejected && (
                            <div className="mb-6 p-4 rounded-xl bg-[#251214] border border-[#3E1A1D]">
                                <p className="text-sm font-bold text-[#FF3D00]">
                                    Your previous application was rejected.
                                </p>
                                <p className="text-xs text-[#717694] mt-1">
                                    You can review the details below and submit a new application.
                                </p>
                            </div>
                        )}

                        <ApplyTrainerForm userId={user?.id} userName={user?.name} />
                    </>
                )}
            </div>
        </div>
    );
};

export default ApplyAsTrainerPage;