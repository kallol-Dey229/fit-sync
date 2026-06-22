"use client";

import React from "react";
import { Card } from "@heroui/react";
import { Users, Dumbbell, BookOpen } from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";

// Data structures matching your design exactly
const metricData = [
  {
    title: "Total Users",
    value: "2,418",
    change: "+34 this week",
    icon: Users,
    iconBg: "bg-[#1C121A]",
    iconColor: "text-[#FF4500]",
  },
  {
    title: "Total Classes",
    value: "48",
    change: "",
    icon: Dumbbell,
    iconBg: "bg-[#251614]",
    iconColor: "text-[#FF4500]",
  },
  {
    title: "Total Bookings",
    value: "8,204",
    change: "+142 this week",
    icon: BookOpen,
    iconBg: "bg-[#211714]",
    iconColor: "text-[#FF4500]",
  },
];

const revenueData = [
  { name: "Jan", revenue: 10000 },
  { name: "Feb", revenue: 12500 },
  { name: "Mar", revenue: 11000 },
  { name: "Apr", revenue: 16000 },
  { name: "May", revenue: 18000 },
  { name: "Jun", revenue: 19000 },
];

const categoryData = [
  { name: "HIIT", value: 30, color: "#FF4500" },
  { name: "Yoga", value: 25, color: "#00E5FF" },
  { name: "Strength", value: 20, color: "#FF9100" },
  { name: "Cardio", value: 15, color: "#76FF03" },
  { name: "Mobility", value: 10, color: "#D500F9" },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#060713] text-white p-8 font-sans selection:bg-[#FF4500]/30">
      
      {/* Page Title */}
      <h1 className="text-3xl font-black tracking-wider uppercase mb-8 text-[#F4F4F6]">
        Admin Control
      </h1>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metricData.map((metric, idx) => {
          const IconComponent = metric.icon;
          return (
            <Card 
              key={idx} 
              className="w-full bg-[#090A15] border border-[#161826] rounded-2xl p-6 shadow-xl flex-row items-center gap-5"
            >
              <div className={`p-4 rounded-xl shrink-0 ${metric.iconBg} ${metric.iconColor}`}>
                <IconComponent size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold tracking-wide text-[#565B7F] uppercase">
                  {metric.title}
                </span>
                <span className="text-2xl font-black text-white mt-0.5">
                  {metric.value}
                </span>
                {metric.change && (
                  <span className="text-xs font-bold text-[#00E676] mt-1">
                    {metric.change}
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Card - Monthly Revenue */}
        <Card className="lg:col-span-6 bg-[#090A15] border border-[#161826] rounded-2xl p-6 shadow-xl flex flex-col">
          <h3 className="text-sm font-black uppercase tracking-wider text-white mb-6">
            Monthly Revenue
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4500" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#FF4500" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#565B7F', fontSize: 11 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#565B7F', fontSize: 11 }}
                  tickFormatter={(v) => `$${v / 1000}k`}
                  domain={[0, 20000]}
                  ticks={[0, 5000, 10000, 15000, 20000]}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161826', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#FF4500" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Right Card - Classes by Category */}
        <Card className="lg:col-span-6 bg-[#090A15] border border-[#161826] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <h3 className="text-sm font-black uppercase tracking-wider text-white mb-4">
            Classes by Category
          </h3>
          
          <div className="h-52 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Interactive Legend Row */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4 text-xs font-semibold tracking-wide text-[#717694]">
            {categoryData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full inline-block" 
                  style={{ backgroundColor: item.color }} 
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}