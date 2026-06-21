
import { ThumbsUp, MessageCircle, Trash2 } from "lucide-react";
import { Button } from "@heroui/react";
import { getForumPosts } from "@/lib/api/posts";

const MyForumPostsPage = async () => {
  const trainerId = "6a3584fd29a7459d0cfb0c11";

  const forumPosts = await getForumPosts(trainerId);

  return (
    <div className="min-h-screen bg-[#08091A] text-white p-8">
      <h1 className="text-3xl font-black uppercase mb-10">
        My Forum Posts
      </h1>

      <div className="space-y-6">
        {forumPosts.map((post) => (
          <div
            key={post._id}
            className="flex items-start gap-6 bg-[#101225] border border-[#222538] rounded-2xl p-5"
          >
            {/* Image */}
            <img
              src={post.photo}
              alt={post.title}
              className="w-32 h-32 rounded-lg object-cover"
            />

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">
                {post.title}
              </h2>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-5">
                <span className="flex items-center gap-1">
                  <ThumbsUp size={16} />
                  {post.likes || 0}
                </span>

                <span className="flex items-center gap-1">
                  <MessageCircle size={16} />
                  {post.comments || 0}
                </span>

                <span>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              <Button
                color="danger"
                variant="bordered"
                startContent={<Trash2 size={16} />}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyForumPostsPage;