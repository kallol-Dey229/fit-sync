"use client";

import { Chip, Button } from "@heroui/react";
import { ThumbsUp, ThumbsDown, Dot } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { voteOnPost } from "@/lib/actions/posts";

import toast from "react-hot-toast";

export function ForumPostDetails({ post }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [likes, setLikes] = useState(
    Array.isArray(post?.likes) ? post.likes : []
  );
  const [dislikes, setDislikes] = useState(
    Array.isArray(post?.dislikes) ? post.dislikes : []
  );
  const [isVoting, setIsVoting] = useState(false);

  if (!post || !post.title) {
    return (
      <div className="w-full text-center py-20 font-mono text-gray-500 animate-pulse">
        Loading post data...
      </div>
    );
  }

  const formattedDate = post.createdAt ? format(new Date(post.createdAt), "MMM d, yyyy") : "Unknown Date";

  const userVote = user && likes.includes(user.id)
    ? "like"
    : user && dislikes.includes(user.id)
    ? "dislike"
    : null;

  const handleVote = async (type) => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }
    if (isVoting) return;

    let newLikes = likes.filter((id) => id !== user.id);
    let newDislikes = dislikes.filter((id) => id !== user.id);

    if (type === "like" && userVote !== "like") {
      newLikes = [...newLikes, user.id];
    }
    if (type === "dislike" && userVote !== "dislike") {
      newDislikes = [...newDislikes, user.id];
    }

    const previousLikes = likes;
    const previousDislikes = dislikes;

    setLikes(newLikes);
    setDislikes(newDislikes);
    setIsVoting(true);

    try {
      const result = await voteOnPost(post._id, newLikes, newDislikes);
      if (result?.error) throw new Error(result.message);
    } catch (err) {
      setLikes(previousLikes);
      setDislikes(previousDislikes);
      toast.error("Couldn't register your vote.");
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="w-full text-white">

      <div className="relative w-full h-70 md:h-105 rounded-2xl overflow-hidden mb-6">
        <Image
          src={post.photo}
          alt={post.title}
          fill
          className="object-cover pointer-events-none select-none"
          priority
        />
      </div>

      <div className="flex items-center gap-3 text-xs md:text-sm font-mono text-gray-500 mb-4">
        <Chip
          variant="flat"
          className="bg-blue-500/10 text-blue-400 font-mono text-xs uppercase tracking-wider rounded h-6"
        >
          {post.role || "null"}
        </Chip>
        <span>{post.Name || "Anonymous"}</span>
        <span><Dot className="text-orange-900 font-bold size-9" /></span>
        <span>{formattedDate}</span>
      </div>


      <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight font-sans mb-6">
        {post.title}
      </h1>


      <div className="text-sm md:text-base text-gray-400 leading-relaxed space-y-4 font-normal mb-8 max-w-none">
        <p>{post.description}</p>
      </div>


      <div className="flex items-center gap-3 border-b border-gray-800 pb-8">
        <Button
          type="button"
          variant="flat"
          onPress={() => handleVote("like")}
          isDisabled={isVoting}
          className={`rounded-lg font-mono text-xs gap-2 min-w-0 px-4 h-10 border ${
            userVote === "like"
              ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
              : "bg-gray-900/40 text-gray-300 hover:text-white border-gray-800/40"
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{likes.length}</span>
        </Button>

        <Button
          type="button"
          variant="flat"
          onPress={() => handleVote("dislike")}
          isDisabled={isVoting}
          className={`rounded-lg font-mono text-xs gap-2 min-w-0 px-4 h-10 border ${
            userVote === "dislike"
              ? "bg-red-500/10 text-red-400 border-red-500/30"
              : "bg-gray-900/40 text-gray-300 hover:text-white border-gray-800/40"
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          <span>{dislikes.length}</span>
        </Button>
      </div>
    </div>
  );
}