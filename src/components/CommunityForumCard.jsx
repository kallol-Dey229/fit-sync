"use client";

import { Card, Button, Chip } from "@heroui/react";
import { format } from "date-fns";
import { ThumbsUp, MessageSquare, ChevronRight } from "lucide-react";
import Image from "next/image";

const CommunityForumCard = ({ post }) => {
  

  const formattedDate = post.createdAt ? format(new Date(post.createdAt), "MMM d, yyyy") : "Unknown Date";
  
  

  return (
    /* CHANGED: Removed max-w-100 and added w-full so all grid column cards match exactly */
    <Card className="w-full bg-[#111116] text-white border border-gray-800 rounded-xl overflow-hidden shadow-xl p-0 flex flex-col h-full">
      
      {/* Image Area Container */}
      <div className="relative h-60 w-full overflow-hidden shrink-0">
        <Image 
          src={post.photo} 
          alt={post.title || "Forum cover"} 
          height={240} 
          width={400} 
          className="pointer-events-none h-full w-full object-cover select-none brightness-90 contrast-115"
        />
        
        {/* Top-Left Absolute Badge */}
        <Chip 
          variant="flat" 
          className="absolute top-4 left-4 bg-blue-500/20 text-blue-400 font-mono text-xs uppercase tracking-widest rounded border border-blue-500/30"
        >
          {post.role}
        </Chip>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        
        {/* Meta Info */}
        <span className="text-xs font-mono text-gray-500">
          {post.trainerName || "Anonymous"} • {formattedDate}
        </span>
        
        {/* Title */}
        <h3 className="text-xl font-black tracking-tight leading-tight uppercase font-sans line-clamp-2">
         {post.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed font-normal line-clamp-3">
          {post.description}
        </p>

        {/* Action / Stats Footer Area */}
        <div className="mt-auto pt-4 flex w-full items-center justify-between text-xs font-mono text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 hover:text-gray-300 cursor-pointer transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>247</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-gray-300 cursor-pointer transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>34</span>
            </div>
          </div>

          <Button 
            variant="light" 
            className="text-orange-600 hover:text-orange-500 font-black uppercase tracking-wider text-xs p-0 min-w-0 flex items-center gap-1"
          >
            Read More 
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

      </div>
    </Card>
  );
};

export default CommunityForumCard;