import AllClassesCard from "@/components/AllClassesCard";
import { getAllClass, getFavorites } from "@/lib/api/classes";
import { getUserPurchases } from "@/lib/api/purchases";
import { getUserSession } from "@/lib/core/session";
import { Sparkles } from "lucide-react";

const RecommendedClassesPage = async () => {
  const user = await getUserSession();
  const [classResponse, favoriteResponse, purchaseResponse] = await Promise.all([
    getAllClass(),
    getFavorites(user.id),
    getUserPurchases(user.email),
  ]);

  const classes = Array.isArray(classResponse) ? classResponse : [];
  const favorites = Array.isArray(favoriteResponse) ? favoriteResponse : [];
  const purchases = Array.isArray(purchaseResponse) ? purchaseResponse : [];
  const excludedClassIds = new Set([
    ...favorites.map((item) => String(item.classId)),
    ...purchases.map((item) => String(item.classId)),
  ]);
  const recommendedClasses = classes
    .filter((item) => !excludedClassIds.has(String(item._id)))
    .sort((first, second) => (second.totalBookings || second.bookings || 0) - (first.totalBookings || first.bookings || 0))
    .slice(0, 6);

  return (
    <div className="min-h-screen space-y-8 py-8 text-white">
      <div>
        <div className="mb-3 flex items-center gap-3 text-orange-500">
          <Sparkles size={20} />
          <span className="text-xs font-bold uppercase tracking-[4px]">For you</span>
        </div>
        <h1 className="text-3xl font-black uppercase sm:text-4xl">Recommended Classes</h1>
        <p className="mt-2 text-sm text-gray-500">
          Popular classes you have not saved or booked yet.
        </p>
      </div>

      {recommendedClasses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0b0d26] px-6 py-12 text-center">
          <p className="text-sm text-gray-400">You are all caught up with the current class catalog.</p>
          <p className="mt-2 text-xs text-gray-600">Browse All Classes to explore everything available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          {recommendedClasses.map((item) => (
            <AllClassesCard key={item._id} classes={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedClassesPage;