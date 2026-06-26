"use client";

import { Chip, Button } from "@heroui/react";
import { ThumbsUp, ThumbsDown, Dot } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

export function ForumPostDetails({ post }) {
  // FIX: Added explicit guard return statement to avoid undefined properties crashing the page
  if (!post || !post.title) {
    return (
      <div className="w-full text-center py-20 font-mono text-gray-500 animate-pulse">
        Loading post data...
      </div>
    );
  }

  const formattedDate = post.createdAt ? format(new Date(post.createdAt), "MMM d, yyyy") : "Unknown Date";
  
  

  return (
    <div className="w-full text-white">
      {/* Dynamic Main Article Cover Image Frame */}
      <div className="relative w-full h-70 md:h-105 rounded-2xl overflow-hidden mb-6">
        <Image
          src={post.photo}
          alt={post.title}
          fill
          className="object-cover pointer-events-none select-none"
          priority
        />
      </div>

      {/* Author and Date Meta Information Header */}
      <div className="flex items-center gap-3 text-xs md:text-sm font-mono text-gray-500 mb-4">
        <Chip 
          variant="flat" 
          className="bg-blue-500/10 text-blue-400 font-mono text-xs uppercase tracking-wider rounded h-6"
        >
          {post.role || "null"}
        </Chip>
        <span>{post.Name || "Anonymous"}</span>
        <span><Dot className="text-orange-900 font-bold size-9"/></span>
        <span>{formattedDate}</span>
      </div>

      {/* Main Title Head */}
      <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight font-sans mb-6">
        {post.title}
      </h1>

      {/* Deep Body Text Article Paragraph copy */}
      <div className="text-sm md:text-base text-gray-400 leading-relaxed space-y-4 font-normal mb-8 max-w-none">
        <p>{post.description}</p>
      </div>

      {/* Functional Voting Component Box Row */}
      <div className="flex items-center gap-3 border-b border-gray-800 pb-8">
        <Button
          variant="flat"
          className="bg-gray-900/40 text-gray-300 hover:text-white rounded-lg font-mono text-xs gap-2 min-w-0 px-4 h-10 border border-gray-800/40"
        >
          <ThumbsUp className="w-4 h-4 text-gray-400" />
          <span>247</span>
        </Button>

        <Button
          variant="flat"
          className="bg-gray-900/40 text-gray-300 hover:text-white rounded-lg font-mono text-xs gap-2 min-w-0 px-4 h-10 border border-gray-800/40"
        >
          <ThumbsDown className="w-4 h-4 text-gray-400" />
          <span>8</span>
        </Button>
      </div>
    </div>
  );
}