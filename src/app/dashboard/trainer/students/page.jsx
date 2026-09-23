import { Users } from "lucide-react";

import { getClass } from "@/lib/api/classes";
import { getUserSession } from "@/lib/core/session";

const TrainerStudentsPage = async () => {
  const user = await getUserSession();
  const classes = await getClass(user.id);
  const totalStudents = classes.reduce(
    (total, item) => total + Number(item.bookings ?? item.totalBookings ?? 0),
    0,
  );

  return (
    <div className="min-h-screen bg-[#0B0C10] p-8 text-white">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-600/10">
          <Users className="text-orange-500" size={26} />
        </div>
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider sm:text-3xl">
            Students
          </h1>
          <p className="mt-1 text-sm text-gray-500">Enrollment overview across your classes</p>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#222538] bg-[#141522] p-6">
          <p className="text-sm uppercase tracking-wider text-gray-500">Total enrolled</p>
          <p className="mt-2 text-4xl font-black text-white">{totalStudents}</p>
        </div>
        <div className="rounded-2xl border border-[#222538] bg-[#141522] p-6">
          <p className="text-sm uppercase tracking-wider text-gray-500">Active classes</p>
          <p className="mt-2 text-4xl font-black text-white">{classes.length}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#222538] bg-[#141522] p-4 shadow-2xl">
        <h2 className="mb-4 px-2 text-xl font-bold">Enrollment by class</h2>

        {classes.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-500">
            Create a class to start tracking student enrollment.
          </p>
        ) : (
          <div className="divide-y divide-[#222538]">
            {classes.map((item) => {
              const bookings = Number(item.bookings ?? item.totalBookings ?? 0);

              return (
                <div key={item._id || item.id} className="flex items-center justify-between gap-4 px-2 py-4">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-white">{item.title || "Untitled class"}</h3>
                    <p className="mt-1 text-xs text-gray-500">{item.category || "General"}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xl font-bold text-orange-500">{bookings}</p>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">students</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerStudentsPage;