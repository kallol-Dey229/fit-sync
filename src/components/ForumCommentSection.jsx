"use client";

import { Button } from "@heroui/react";

export function ForumCommentsSection({ comments = [] }) {
  // Static mock fallbacks mapped directly if dataset variables arrive empty
  const defaultComments = [
    { id: 1, user: "U", text: "Great insights, really changed my approach to recovery!" },
    { id: 2, user: "U", text: "Been following these protocols for a month — game changer." }
  ];

  const displayComments = comments.length > 0 ? comments : defaultComments;

  return (
    <div className="w-full text-white mt-8">
      {/* Interactive Title Heading */}
      <h3 className="text-xl font-black uppercase tracking-tight mb-6">
        {displayComments.length} Comments
      </h3>

      {/* List Container for Rendered Responses */}
      <div className="flex flex-col gap-4 mb-8">
        {displayComments.map((comment) => (
          <div 
            key={comment.id} 
            className="flex gap-4 p-4 bg-[#111116] border border-gray-800 rounded-xl"
          >
            {/* User Avatar Circle Placeholder */}
            <div className="h-9 w-9 shrink-0 rounded-full bg-orange-600/20 text-orange-500 font-black text-sm flex items-center justify-center font-sans uppercase">
              {comment.user ? comment.user.substring(0, 1) : "U"}
            </div>
            
            {/* Comment Message Box Body Layout */}
            <div className="flex flex-col flex-1 gap-1">
              <p className="text-sm text-gray-300 font-normal leading-relaxed">
                {comment.text}
              </p>
              
              {/* Contextual Action Button Links */}
              <div className="flex items-center gap-3 text-[11px] font-mono text-gray-500 mt-1">
                <button className="hover:text-gray-300 transition-colors">Reply</button>
                <button className="hover:text-red-400 text-gray-600 transition-colors ml-1">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Comment Formulation Entry Box Form Block */}
      <form onSubmit={(e) => e.preventDefault()} className="flex items-start gap-4">
        {/* Active Account Identity Avatar Initials */}
        <div className="h-9 w-9 shrink-0 rounded-full bg-[#ff5a1f] text-white font-black text-sm flex items-center justify-center font-sans uppercase">
          S
        </div>

        {/* Input Textarea Block Layout */}
        <div className="flex-1 flex flex-col sm:flex-row gap-3 items-stretch sm:items-start">
          <textarea
            placeholder="Write a comment..."
            rows={2}
            className="w-full bg-[#111116] border border-gray-800 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:border-gray-700 resize-none transition-colors"
          />
          <Button
            type="submit"
            className="bg-[#ff5a1f] hover:bg-[#e04f1a] text-white font-black uppercase tracking-wider text-xs px-6 rounded-lg h-11 shrink-0 transition-colors"
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}