import AllClassesCard from "@/components/AllClassesCard";
import { getAllClass } from "@/lib/api/classes";


const AllClassesPage = async () => {
    const allClasses = await getAllClass(); 
    return (
        <div className="mt-10 ml-5">
            <div >
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-0.5 w-14 bg-[#ff5a1f]" />
                    <span className="uppercase tracking-[6px] text-[#ff5a1f] text-sm font-semibold">
                        Explore
                    </span>
                </div>


                <h2 className="text-4xl font-black uppercase leading-none mb-6">
                    ALL CLASSES
                </h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allClasses.map((classes)=><AllClassesCard key={classes._id} classes={classes}/>)}
            </div>
        </div>
    );
};

export default AllClassesPage;