
import { ForumCommentsSection } from "@/components/ForumCommentSection";
import { ForumPostDetails } from "@/components/ForumPostDetails";
import { getForumPostById } from "@/lib/api/posts";
import Link from "next/link";

export default async function CommunityForumDetailsPage({ params }) {
  const { id } = await params;
  
  const post = await getForumPostById(id);
  
  // const post = await getForumPostById(id); // Your DB call logic

  return (
    <div className="min-h-screen bg-[#07070a] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Action link Row */}
        <Link 
          href="/community-forum" 
          className="text-xs font-mono text-gray-500 hover:text-gray-300 flex items-center gap-1 mb-6 transition-colors"
        >
          &lt; Back to Forum
        </Link>

        {/* Layout Mounting Blocks */}
        <ForumPostDetails post={post} />
        <ForumCommentsSection comments={[]} />
      </div>
    </div>
  );
}