"use client";

import Image from "next/image";
import { ThumbsUp, MessageCircle } from "lucide-react";
import DeletePostDialog from "../../admin/manage-posts/DeletePostDialog";
import { useState } from "react";

const TrainerForumPostsList = ({ initialPosts = [] }) => {
  const [posts, setPosts] = useState(initialPosts);

  if (posts.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-[#222538] px-4 py-10 text-center text-sm text-gray-500">
        You have not published any forum posts yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="flex items-start gap-6 rounded-2xl border border-[#222538] bg-[#101225] p-5"
        >
          <Image
            src={post.photo || "/assets/banner-photo1.jpg"}
            alt={post.title || "Forum post"}
            width={128}
            height={128}
            className="h-32 w-32 rounded-lg object-cover"
          />

          <div className="min-w-0 flex-1">
            <h2 className="mb-3 text-2xl font-bold">{post.title}</h2>

            <div className="mb-5 flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <ThumbsUp size={16} />
                {Array.isArray(post.likes) ? post.likes.length : post.likes || 0}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={16} />
                {post.comments || post.commentCount || 0}
              </span>
              <span>
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "No date"}
              </span>
            </div>

            <DeletePostDialog
              post={post}
              onDeleted={(id) => setPosts((current) => current.filter((entry) => entry._id !== id))}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrainerForumPostsList;
