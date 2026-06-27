import { Activity, Calendar, TrendingUp } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="text-white py-16 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center">
        
        {/* First Stat */}
        <div className="flex flex-col items-center p-6 md:border-r md:border-gray-800">
          <Activity className="w-8 h-8 text-orange-600 mb-4" />
          <h3 className="text-5xl font-black mb-2">2,400+</h3>
          <p className="text-gray-400 text-sm">Workouts Completed</p>
        </div>

        
        <div className="flex flex-col items-center p-6 md:border-r md:border-gray-800">
          <Calendar className="w-8 h-8 text-orange-600 mb-4" />
          <h3 className="text-5xl font-black mb-2">148+</h3>
          <p className="text-gray-400 text-sm">Live Classes Monthly</p>
        </div>

        
        <div className="flex flex-col items-center p-6">
          <TrendingUp className="w-8 h-8 text-orange-600 mb-4" />
          <h3 className="text-5xl font-black mb-2">98%</h3>
          <p className="text-gray-400 text-sm">Member Retention Rate</p>
        </div>

      </div>
    </section>
  );
}


//bg-[#09091d]