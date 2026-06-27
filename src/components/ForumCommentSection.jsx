"use client";

import { Button, Form } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { createComment } from "@/lib/actions/comments";
import CommentDelete from "./CommentDelete";
import CommentEdit from "./CommentEdit";
import { useState } from "react";

export function ForumCommentsSection({ post, comment = [] }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [comments, setComments] = useState(comment);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const topLevelComments = comments.filter((c) => !c.parentCommentId);
  const repliesByParent = comments.reduce((acc, c) => {
    if (c.parentCommentId) {
      acc[c.parentCommentId] = [...(acc[c.parentCommentId] || []), c];
    }
    return acc;
  }, {});

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
        setComments((prev) => [...prev, { ...payload, _id: res.insertedId }]);
        e.target.reset();
      } else {
        toast.error("Failed to add comment.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  const handleReplySubmit = async (parentId) => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    const text = replyText.trim();
    if (!text) {
      toast.error("Reply cannot be empty.");
      return;
    }

    const payload = {
      forumPostId: post._id,
      forumPostTitle: post.title,
      comment: text,
      userId: user.id,
      userName: user.name,
      userImage: user.image,
      createdAt: new Date(),
      parentCommentId: parentId,
    };

    try {
      const res = await createComment(payload);

      if (res.insertedId) {
        toast.success("Reply added.");
        setComments((prev) => [...prev, { ...payload, _id: res.insertedId }]);
        setReplyingTo(null);
        setReplyText("");
      } else {
        toast.error("Failed to add reply.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  const renderComment = (item, isReply = false) => (
    <div
      key={item._id}
      className={`flex gap-4 p-4 bg-[#111116] border border-gray-800 rounded-xl ${
        isReply ? "ml-8 mt-3 bg-[#0c0c10]" : ""
      }`}
    >
      <div className="h-9 w-9 rounded-full bg-orange-600/20 text-orange-500 flex items-center justify-center font-bold uppercase shrink-0">
        {item.userName?.charAt(0)}
      </div>

      <div className="flex-1">
        <p className="text-xs text-gray-500">{item.userName}</p>
        <p className="text-sm text-gray-300 mt-1">{item.comment}</p>

        <div className="flex gap-3 mt-2">
          {!isReply && (
            <button
              type="button"
              onClick={() =>
                setReplyingTo(replyingTo === item._id ? null : item._id)
              }
              className="text-xs text-gray-500 hover:text-white hover:cursor-pointer"
            >
              Reply
            </button>
          )}

          {user?.id === item.userId && (
            <>
              <CommentEdit
                commentId={item._id}
                forumPostId={post._id}
                userId={user.id}
                initialComment={item.comment}
              />
              <CommentDelete
                commentId={item._id}
                forumPostId={post._id}
                userId={user.id}
              />
            </>
          )}
        </div>

        {!isReply && replyingTo === item._id && (
          <div className="mt-3 flex items-start gap-2">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={2}
              placeholder={
                user ? "Write a reply..." : "Please login to reply..."
              }
              disabled={!user}
              className="flex-1 bg-[#0c0c10] border border-gray-800 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 resize-none focus:outline-none"
            />
            <Button
              type="button"
              disabled={!user}
              onPress={() => handleReplySubmit(item._id)}
              className="bg-[#ff5a1f] text-white font-bold uppercase px-4 h-10 text-xs shrink-0"
            >
              Reply
            </Button>
          </div>
        )}

        {(repliesByParent[item._id] || []).map((reply) =>
          renderComment(reply, true)
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full mt-8 text-white">
      <h3 className="text-xl font-black uppercase mb-6">
        {comments.length} Comments
      </h3>

      
      <div className="flex flex-col gap-4 mb-8">
        {topLevelComments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          topLevelComments.map((item) => renderComment(item))
        )}
      </div>

      
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
              user ? "Write a comment..." : "Please login to comment..."
            }
            className="w-full bg-[#111116] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none"
          />

          <Button
            type="submit"
            disabled={!user}
            className="bg-[#ff5a1f] text-white font-bold uppercase px-6 h-11"
          >
            Post
          </Button>
        </div>
      </Form>
    </div>
  );
}