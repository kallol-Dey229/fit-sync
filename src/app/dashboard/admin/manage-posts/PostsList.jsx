"use client";

import { deleteForumPost } from "@/lib/actions/posts";
import { Button } from "@heroui/react";
import { useState } from "react";
import DeletePostDialog from "./DeletePostDialog";

const PostsList = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [pendingPost, setPendingPost] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    await deleteForumPost(pendingPost._id);

    setPosts((prev) => prev.filter((p) => p._id !== pendingPost._id));
    setIsDeleting(false);
    setPendingPost(null);
  };

  if (posts.length === 0) {
    return <p className="text-sm text-slate-400">No forum posts yet.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <article
          key={post._id}
          className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#13131f] p-4"
        >
          <div className="flex-1">
            <h2 className="text-base font-bold text-white">{post.title}</h2>
            <p className="text-sm text-slate-400">{post.Name}</p>
          </div>

          <Button variant="danger" onPress={() => setPendingPost(post)}>
            Delete
          </Button>
        </article>
      ))}

      <DeletePostDialog
        post={pendingPost}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setPendingPost(null)}
      />
    </div>
  );
};

export default PostsList;