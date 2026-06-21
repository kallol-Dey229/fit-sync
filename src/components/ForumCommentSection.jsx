"use client";

import { Button, Form } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { createComment } from "@/lib/actions/comments";
import CommentDelete from "./CommentDelete";

export function ForumCommentsSection({ post, comment = [] }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const commentText = formData.get("comment")?.toString().trim();

    if (!commentText) {
      toast.error("Comment cannot be empty.");
      return;
    }

    const payload = {
      forumPostId: post._id,
      forumPostTitle: post.title,
      comment: commentText,
      userId: user.id,
      userName: user.name,
      userImage: user.image,
      createdAt: new Date(),
    };

    try {
      const res = await createComment(payload);

      if (res.insertedId) {
        toast.success("Comment added successfully.");
        e.target.reset();
        window.location.reload();
      } else {
        toast.error("Failed to add comment.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="w-full mt-8 text-white">
      <h3 className="text-xl font-black uppercase mb-6">
        {comment.length} Comments
      </h3>

      {/* Comment List */}
      <div className="flex flex-col gap-4 mb-8">
        {comment.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          comment.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 p-4 bg-[#111116] border border-gray-800 rounded-xl"
            >
              {/* Avatar */}
              <div className="h-9 w-9 rounded-full bg-orange-600/20 text-orange-500 flex items-center justify-center font-bold uppercase">
                {item.userName?.charAt(0)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-xs text-gray-500">
                  {item.userName}
                </p>

                <p className="text-sm text-gray-300 mt-1">
                  {item.comment}
                </p>

                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    className="text-xs text-gray-500 hover:text-white"
                  >
                    Reply
                  </button>

                  {/* Only comment owner can see Delete button */}
                  {user?.id === item.userId && (
                    <CommentDelete
                      commentId={item._id}
                      forumPostId={post._id}
                      userId={user.id}
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment */}
      <Form
        onSubmit={handleCommentSubmit}
        className="flex items-start gap-4 w-full"
      >
        <div className="h-9 w-9 rounded-full bg-[#ff5a1f] text-white flex items-center justify-center font-bold uppercase">
          {user?.name?.charAt(0) || "?"}
        </div>

        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <textarea
            name="comment"
            rows={2}
            disabled={!user}
            placeholder={
              user
                ? "Write a comment..."
                : "Please login to comment..."
            }
            className="w-full bg-[#111116] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none"
          />

          <Button type="submit" disabled={!user} className="bg-[#ff5a1f] text-white font-bold uppercase px-6 h-11" >
            Post
          </Button>
        </div>
      </Form>
    </div>
  );
}