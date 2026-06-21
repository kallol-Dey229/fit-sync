"use client";

import { Card, Button, Chip } from "@heroui/react";
import { Clock, Users } from "lucide-react";
import Image from "next/image";

const AllClassesCard = ({ classes }) => {
  if (!classes) return null;

  

  return (
    /* RESTORED: Horizontal row structure matching image layout configuration */
    <Card className="w-full bg-[#111116] text-white border border-gray-800 rounded-xl overflow-hidden shadow-xl p-0 flex flex-col md:flex-row items-stretch">
      
      {/* Left/Top Image Section Wrapper */}
      <div className="relative h-56 md:h-auto w-full md:w-[300px] shrink-0 overflow-hidden">
        <Image
          src={classes.photo}
          alt={classes.title || "Class cover image"}
          height={300}
          width={400}
          className="pointer-events-none h-full w-full object-cover select-none"
          priority={false}
        />
        <Chip 
          variant="flat" 
          className="absolute top-4 left-4 bg-red-500/10 text-red-400 font-mono text-xs uppercase tracking-widest rounded border border-red-500/20"
        >
          {classes.level || "Advanced"}
        </Chip>
      </div>

      {/* Right Content Section Layout */}
      <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
        
        {/* Header Info Group */}
        <div className="flex justify-between items-start w-full gap-4">
          <div className="flex flex-col">
            <h3 className="text-2xl font-black tracking-tight uppercase font-sans leading-none mb-1">
              {classes.title || "Power HIIT Circuit"}
            </h3>
            <span className="text-base text-gray-500 font-medium">
              {classes.trainerName || "Marcus Webb"}
            </span>
          </div>
          <span className="text-3xl font-black text-[#ff5a1f] tracking-tight leading-none">
            ${classes.price || "35"}
          </span>
        </div>
        
        {/* Paragraph Description Copy */}
        <p className="text-sm text-gray-400 leading-relaxed font-normal line-clamp-3 my-1">
          {classes.description || "High-intensity intervals engineered to torch calories and build explosive power."}
        </p>

        {/* Action Bottom Utility Footer row */}
        <div className="mt-auto pt-4 flex w-full flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-xs font-mono text-gray-400">
          
          {/* Metadata Badges / Info slots */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{classes.duration || "0"} min</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gray-500" />
              <span>{classes.totalBookings || "0"}</span>
            </div>

            <Chip 
              variant="bordered" 
              className="border-gray-800 text-gray-400 h-6 text-[10px] font-mono tracking-widest uppercase rounded"
            >
              {classes.category || "HIIT"}
            </Chip>
          </div>

          {/* Action Button */}
          <Button 
            className="w-full sm:w-auto bg-[#ff5a1f] text-white font-black uppercase tracking-wide px-6 rounded-lg h-8 hover:bg-[#e04f1a] transition-colors shrink-0"
          >
            View Details
          </Button>
        </div>

      </div>
    </Card>
  );
};

export default AllClassesCard;