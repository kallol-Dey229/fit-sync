import { getAllForumPosts } from "@/lib/api/posts";
import PostsList from "./PostsList";


const ManagePostsPage = async () => {
    const posts = await getAllForumPosts();

    return (
        <div className="min-h-screen bg-[#0a0a14] px-6 py-10 sm:px-10">
            <h1 className="mb-8 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                Manage Forum Posts
            </h1>

            <PostsList initialPosts={posts || []} />
        </div>
    );
};

export default ManagePostsPage; 