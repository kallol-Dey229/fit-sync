import TrainerCard from "@/components/TrainerCard";
import { getAllTrainers } from "@/lib/api/trainers";

const AllTrainersPage = async () => {
  const response = await getAllTrainers();
  const trainers = Array.isArray(response) ? response : [];

  return (
    <div className="mx-auto mt-10 min-h-screen max-w-7xl px-5 pb-20">
      <div className="mb-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-0.5 w-14 bg-[#ff5a1f]" />
          <span className="text-sm font-semibold uppercase tracking-[6px] text-[#ff5a1f]">
            The Team
          </span>
        </div>

        <h1 className="text-4xl font-black uppercase leading-none">
          ALL TRAINERS
        </h1>
        <p className="mt-4 max-w-xl text-gray-400">
          Meet the specialists who help FitSync members train with purpose.
        </p>
      </div>

      {trainers.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.id || trainer._id} trainer={trainer} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-800 bg-[#111116] p-10 text-center text-sm text-gray-500">
          No trainers found.
        </div>
      )}
    </div>
  );
};

export default AllTrainersPage;