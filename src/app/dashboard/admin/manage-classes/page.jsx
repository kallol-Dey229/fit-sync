
import { getAllClass } from "@/lib/api/classes";
import ClassesTable from "./ClassesTable";


const ManageClassesPage = async () => {
    const classes = await getAllClass();

    return (
        <div className="min-h-screen px-6 py-10 sm:px-10">
            <h1 className="mb-8 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                Manage Classes
            </h1>

            <ClassesTable initialClasses={classes || []} />
        </div>
    );
};

export default ManageClassesPage;