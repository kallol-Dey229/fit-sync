

import { getClass } from "@/lib/api/classes";
import { getUserSession } from "@/lib/core/session";
import TrainerClassesList from "./TrainerClassesList";



const MyClassesPage = async () => {
  const user = await getUserSession();
  const classesData = await getClass(user.id) || [];
    
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white p-8">
      
      <h1 className="text-2xl font-black uppercase tracking-wider mb-8">
        My Classes
      </h1>

      
      <TrainerClassesList initialClasses={classesData} />
    </div>
  );
}

export default MyClassesPage;