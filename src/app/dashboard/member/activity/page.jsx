import { Activity, Bookmark, Heart } from "lucide-react";

import { getFavorites } from "@/lib/api/classes";
import { getUserPurchases } from "@/lib/api/purchases";
import { getUserSession } from "@/lib/core/session";

const MemberActivityPage = async () => {
  const user = await getUserSession();
  const [favoriteResponse, purchaseResponse] = await Promise.all([
    getFavorites(user.id),
    getUserPurchases(user.email),
  ]);
  const favorites = Array.isArray(favoriteResponse) ? favoriteResponse : [];
  const purchases = Array.isArray(purchaseResponse) ? purchaseResponse : [];

  return (
    <div className="min-h-screen space-y-8 py-8 text-white">
      <div>
        <div className="mb-3 flex items-center gap-3 text-orange-500">
          <Activity size={20} />
          <span className="text-xs font-bold uppercase tracking-[4px]">Member area</span>
        </div>
        <h1 className="text-3xl font-black uppercase sm:text-4xl">My Activity</h1>
        <p className="mt-2 text-sm text-gray-500">A quick overview of your FitSync journey.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#0b0d26] p-6">
          <Bookmark className="mb-4 text-orange-500" size={24} />
          <p className="text-sm uppercase tracking-wider text-gray-500">Booked classes</p>
          <p className="mt-2 text-4xl font-black">{purchases.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b0d26] p-6">
          <Heart className="mb-4 text-orange-500" size={24} />
          <p className="text-sm uppercase tracking-wider text-gray-500">Favorite classes</p>
          <p className="mt-2 text-4xl font-black">{favorites.length}</p>
        </div>
      </div>

      <section className="rounded-2xl border border-white/10 bg-[#0b0d26] p-6">
        <h2 className="mb-5 text-xl font-bold">Recent bookings</h2>
        {purchases.length === 0 ? (
          <p className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-gray-500">
            You have no bookings yet.
          </p>
        ) : (
          <div className="divide-y divide-white/10">
            {purchases.slice(0, 6).map((purchase) => (
              <div key={purchase._id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{purchase.classTitle || "Untitled class"}</p>
                  <p className="mt-1 text-xs text-gray-500">{purchase.trainerName || "Unassigned trainer"}</p>
                </div>
                <p className="shrink-0 text-xs text-gray-500">
                  {purchase.purchasedAt ? new Date(purchase.purchasedAt).toLocaleDateString() : "Recent"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MemberActivityPage;