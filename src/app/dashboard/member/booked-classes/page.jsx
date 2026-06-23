import { getUserPurchases } from "@/lib/api/purchases";
import { getUserSession } from "@/lib/core/session";
import { Eye } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const BookedClassesPage = async () => {

    const user = await getUserSession();

    if (!user) {
        redirect("/auth/signin/?redirect=/booked-classes");
    }

    const purchases = await getUserPurchases(user.email);
    const hasBookings = Array.isArray(purchases) && purchases.length > 0;

    return (
        <div className="w-full min-h-screen text-white py-8 px-4 sm:px-6 max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-8">
                Booked Classes
            </h1>

            {!hasBookings ? (
                <div className="bg-[#111116] border border-gray-800 rounded-2xl p-10 text-center">
                    <p className="text-gray-400 text-sm">
                        You haven&apos;t booked any classes yet.
                    </p>
                    <Link
                        href="/all-classes"
                        className="inline-block mt-4 text-xs font-mono text-[#ff5a1f] hover:underline"
                    >
                        Browse classes →
                    </Link>
                </div>
            ) : (
                <div className="bg-[#111116] border border-gray-800 rounded-2xl overflow-hidden">
                    {/* Table header */}
                    <div className="grid grid-cols-[2fr_1.4fr_1.8fr_0.8fr_0.8fr] gap-4 px-6 py-4 border-b border-gray-800 text-[10px] font-mono uppercase tracking-wider text-gray-500">
                        <span>Class</span>
                        <span>Trainer</span>
                        <span>Schedule</span>
                        <span>Amount</span>
                        <span>Action</span>
                    </div>

                    {/* Table rows */}
                    {purchases.map((purchase) => (
                        <div
                            key={purchase._id}
                            className="grid grid-cols-[2fr_1.4fr_1.8fr_0.8fr_0.8fr] gap-4 px-6 py-5 border-b border-gray-900 last:border-b-0 items-center"
                        >
                            <span className="text-sm font-bold text-white truncate">
                                {purchase.classTitle || "Untitled Class"}
                            </span>
                            <span className="text-xs font-mono text-indigo-300 truncate">
                                {purchase.trainerName || "Unassigned"}
                            </span>
                            <span className="text-xs font-mono text-gray-400 truncate text-wrap">
                                {Array.isArray(purchase.schedule) && purchase.schedule.length > 0
                                    ? purchase.schedule.join(" / ")
                                    : "Flexible Dates"}
                            </span>
                            <span className="text-sm font-bold text-[#ff5a1f]">
                                ${purchase.price || "0"}
                            </span>
                            <Link
                                href={`/all-classes/${purchase.classId}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700 text-[11px] font-mono text-gray-300 hover:bg-[#16161c] hover:text-white transition-colors w-fit"
                            >
                                <Eye size={12} />
                                View
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookedClassesPage;