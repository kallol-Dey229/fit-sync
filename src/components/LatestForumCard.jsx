import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ThumbsUp, MessageSquare } from "lucide-react";

const LatestForumCard = ({ post }) => {
    const formattedDate = post.createdAt
        ? format(new Date(post.createdAt), "MMM d, yyyy")
        : "Unknown Date";

    const likeCount = Array.isArray(post.likes) ? post.likes.length : 0;
    const commentCount = post.commentCount || 0;

    const isAdmin = (post.role || "").toLowerCase() === "admin";

    return (
        <Link
            href={`/community-forum/${post._id}`}
            className="flex gap-4 rounded-xl border border-gray-800 bg-[#111116] p-4 hover:border-gray-700 transition-colors"
        >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                <Image
                    src={post.photo}
                    alt={post.title || "Forum post"}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 mb-2">
                    <span
                        className={`px-2 py-0.5 rounded border font-mono text-[10px] uppercase tracking-widest ${
                            isAdmin
                                ? "border-teal-500/30 bg-teal-500/10 text-teal-400"
                                : "border-gray-700 text-gray-400"
                        }`}
                    >
                        {post.role || "member"}
                    </span>
                    <span className="text-xs text-gray-500">{formattedDate}</span>
                </div>

                <h3 className="font-bold text-white leading-snug line-clamp-2">
                    {post.title}
                </h3>

                <div className="mt-auto pt-2 flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        {likeCount}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {commentCount}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default LatestForumCard;