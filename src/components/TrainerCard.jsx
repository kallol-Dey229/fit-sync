import { Avatar } from "@heroui/react";
import { Award, Users } from "lucide-react";

const TrainerCard = ({ trainer }) => {
  if (!trainer) return null;

  const trainerName = trainer.name || "FitSync Trainer";
  const initials = trainerName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const trainerImage = trainer.image || trainer.avatar || trainer.profileImage;

  return (
    <article className="rounded-xl border border-gray-800 bg-[#111116] p-6 text-white transition-colors hover:border-[#ff5a1f]/60">
      <div className="mb-6 flex items-center gap-4">
        <Avatar className="size-16 rounded-xl border border-[#ff5a1f]/30 bg-[#ff5a1f]/10">
          <Avatar.Image src={trainerImage} alt={`${trainerName}'s profile`} />
          <Avatar.Fallback className="bg-[#ff5a1f]/10 text-lg font-black text-[#ff5a1f]">
            {initials}
          </Avatar.Fallback>
        </Avatar>

        <div className="min-w-0">
          <p className="mb-1 text-[10px] font-mono uppercase tracking-widest text-[#ff5a1f]">
            Certified Trainer
          </p>
          <h3 className="truncate text-lg font-black uppercase leading-tight">
            {trainerName}
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-gray-800 pt-4 text-sm text-gray-400">
        <Award className="h-4 w-4 text-[#ff5a1f]" />
        <span className="truncate">{trainer.specialty || "Fitness specialist"}</span>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <Users className="h-3.5 w-3.5" />
        <span>{trainer.students || 0} students coached</span>
      </div>
    </article>
  );
};
//
export default TrainerCard;
