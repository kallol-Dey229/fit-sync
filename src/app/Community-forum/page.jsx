import CommunityForumCard from "@/components/CommunityForumCard";
import { getAllForumPosts } from "@/lib/api/posts";


const CommunityForumPage = async () => {

    const forumAllPosts = await getAllForumPosts();

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
                    COMMUNITY FORUM
                </h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {forumAllPosts.map((post)=><CommunityForumCard post={post} key={post._id}/>)}
            </div>
        </div>
    );
};

export default CommunityForumPage;