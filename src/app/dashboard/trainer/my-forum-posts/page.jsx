
import { getForumPosts } from "@/lib/api/posts";
import { getUserSession } from "@/lib/core/session";
import TrainerForumPostsList from "./TrainerForumPostsList";

const MyForumPostsPage = async () => {
  const user = await getUserSession();
  const response = await getForumPosts(user.id);
  const forumPosts = Array.isArray(response) ? response : (response?.data || []);


  return (
    <div className="min-h-screen bg-[#08091A] text-white p-8">
      <h1 className="text-3xl font-black uppercase mb-10">
        My Forum Posts
      </h1>

      <TrainerForumPostsList initialPosts={forumPosts} />
    </div>
  );
};

export default MyForumPostsPage;