
import { getClassById } from "@/lib/api/classes";
import { getUserSession } from "@/lib/core/session";
import { ShieldExclamation } from "@gravity-ui/icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import ClassBook from "./ClassBook";



const BookNowPage = async ({params}) => {

    const {id} = await params;

    const user = await getUserSession();

    if(!user){
        redirect(`/auth/signin/?redirect=/all-classes/${id}/book`)
    }

    if(user.role !== 'member'){
        return (
                    <div className="w-full min-h-[80vh] flex flex-col justify-center items-center text-white p-6">
                        <div className="max-w-md w-full text-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
                            <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldExclamation className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-100 mb-2">Access Restricted</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                Only general members can book. Please sign in with a member account to proceed.
                            </p>



                            <div className="flex gap-3 ">
                                <Link 
                                href="/auth/signin" 
                                className="inline-block w-full px-4 py-2.5 bg-zinc-800 hover:bg-orange-300 text-orange-700 rounded-lg text-sm font-medium transition"
                            >
                                Switch Account
                            </Link>


                            <Link 
                                href={`/all-classes/${id}`} 
                                className="inline-block w-full px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm font-medium transition"
                            >
                                Back
                            </Link>
                            </div>
                        </div>
                    </div>
                );
    }


    const classes = await getClassById(id);

    return (
        <div>
            
            <ClassBook user={user} classes={classes} />
        </div>
    );
};

export default BookNowPage;