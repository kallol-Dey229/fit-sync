
import Banner from "@/components/Banner";
import StatsSection from "@/components/StatsSection";
import { Zap } from "lucide-react";

export default function Home() {
  return (
    <div >
      <Banner />


      <StatsSection/>

      


      {/* Ready to forge section */}

      <section className="bg-[#120705] text-white py-20 px-4 text-center flex flex-col items-center justify-center">
      
      <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-6">
        Ready to <br />
        <span className="text-orange-600 italic">Forge</span> It?
      </h2>

      
      <p className="text-gray-400 text-base md:text-lg max-w-md mb-8 leading-relaxed">
        Join thousands of athletes who chose to stop settling and start performing.
      </p>

      
      <button className="bg-orange-600 hover:bg-orange-700 text-white font-black px-8 py-4 rounded-none flex items-center gap-2 transition-colors duration-200 uppercase tracking-wider text-sm cursor-pointer">
        Start Today — Free
        <Zap className="w-4 h-4 fill-white" />
      </button>
    </section>
    </div>
  );
}
