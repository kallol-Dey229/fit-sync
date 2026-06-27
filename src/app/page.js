
import AllClassesCard from "@/components/AllClassesCard";
import Banner from "@/components/Banner";
import LatestForumCard from "@/components/LatestForumCard";
import StatsSection from "@/components/StatsSection";
import { getAllClass } from "@/lib/api/classes";
import { getAllForumPosts } from "@/lib/api/posts";
import { ChevronRight, Zap } from "lucide-react";
import Link from "next/link";

export default async function Home() {
   const allClasses = await getAllClass();
   const allForumPosts = await getAllForumPosts();
  return (
    <div >
      <Banner />


      <StatsSection />

      <div className="mt-10">
        <div className="flex items-center gap-4 mb-6">
        <div className="h-0.5 w-14 bg-[#ff5a1f]" />
        <span className="uppercase tracking-[6px] text-[#ff5a1f] text-sm font-semibold">
          Top Picks
        </span>
      </div>


      <h2 className="text-4xl font-black uppercase leading-none mb-6">
        FEATURED CLASSES
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allClasses.slice(0, 4).map((classes)=><AllClassesCard key={classes._id} classes={classes}/>)}
            </div>
      </div>







      {/* Latest From The Forum section */}
 
      <div className="mt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-0.5 w-14 bg-[#ff5a1f]" />
              <span className="uppercase tracking-[6px] text-[#ff5a1f] text-sm font-semibold">
                Community
              </span>
            </div>
 
            <h2 className="text-4xl font-black uppercase leading-none">
              LATEST FROM THE FORUM
            </h2>
          </div>
 
          <Link
            href="/community-forum"
            className="hidden sm:flex items-center gap-1 text-gray-400 hover:text-white font-semibold transition-colors"
          >
            All Posts
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {allForumPosts.slice(0, 4).map((post) => (
            <LatestForumCard key={post._id} post={post} />
          ))}
        </div>
      </div>





      {/* Ready to forge section */}

      <section className="bg-[#1f1305] text-white py-20 px-4 text-center flex flex-col items-center justify-center mt-20">

        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          Ready to <br />
          <span className="text-orange-600 italic">Forge</span> It?
        </h2>


        <p className="text-gray-400 text-base md:text-lg max-w-md mb-8 leading-relaxed">
          Join thousands of athletes who chose to stop settling and start performing.
        </p>


        <Link href="/auth/signup" className="bg-orange-600 hover:bg-orange-700 text-white font-black px-8 py-4 rounded-none flex items-center gap-2 transition-colors duration-200 uppercase tracking-wider text-sm cursor-pointer">
          Start Today — Free
          <Zap className="w-4 h-4 fill-white" />
        </Link>
      </section>



      
    </div>
  );
}
