"use client";

import React, { useMemo } from "react";
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
  Cell,
} from "recharts";

const COLORS = [
  "#FF4500",
  "#00E5FF",
  "#FF9100",
  "#76FF03",
  "#D500F9",
  "#FF1744",
  "#00BFA5",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const AdminDashboardHomePage = ({
  users = [],
  classes = [],
  purchases = [],
}) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const newUsers = users.filter(
    (user) => new Date(user.createdAt) >= oneWeekAgo
  ).length;

  const newBookings = purchases.filter(
    (purchase) => new Date(purchase.createdAt) >= oneWeekAgo
  ).length;

  const metricData = [
    {
      title: "Total Users",
      value: users.length.toLocaleString(),
      change: `+${newUsers} this week`,
      icon: Users,
      iconBg: "bg-[#1C121A]",
      iconColor: "text-[#FF4500]",
    },
    {
      title: "Total Classes",
      value: classes.length.toLocaleString(),
      change: "",
      icon: Dumbbell,
      iconBg: "bg-[#251614]",
      iconColor: "text-[#FF4500]",
    },
    {
      title: "Total Bookings",
      value: purchases.length.toLocaleString(),
      change: `+${newBookings} this week`,
      icon: BookOpen,
      iconBg: "bg-[#211714]",
      iconColor: "text-[#FF4500]",
    },
  ];

  const revenueData = useMemo(() => {
    const revenue = MONTHS.map((month) => ({
      name: month,
      revenue: 0,
    }));

    purchases.forEach((purchase) => {
      if (!purchase.createdAt) return;

      const month = new Date(purchase.createdAt).getMonth();

      revenue[month].revenue += Number(
        purchase.amount || purchase.price || 0
      );
    });

    return revenue;
  }, [purchases]);

  const categoryData = useMemo(() => {
    const categoryMap = {};

    classes.forEach((item) => {
      if (!item.category) return;

      categoryMap[item.category] =
        (categoryMap[item.category] || 0) + 1;
    });

    return Object.entries(categoryMap).map(
      ([name, value], index) => ({
        name,
        value,
        color: COLORS[index % COLORS.length],
      })
    );
  }, [classes]);

  const maxRevenue =
    Math.max(...revenueData.map((r) => r.revenue), 1000) + 1000;

  return (
    <div className="min-h-screen text-white p-8">

      <h1 className="text-3xl font-black tracking-wider uppercase mb-8">
        Admin Control
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {metricData.map((metric, idx) => {
          const Icon = metric.icon;

          return (
            <Card
              key={idx}
              className="bg-[#090A15] border border-[#161826] rounded-2xl p-6 flex-row items-center gap-5"
            >
              <div
                className={`p-4 rounded-xl ${metric.iconBg} ${metric.iconColor}`}
              >
                <Icon size={24} />
              </div>

              <div>
                <p className="text-xs uppercase text-[#565B7F]">
                  {metric.title}
                </p>

                <h2 className="text-3xl font-black mt-1">
                  {metric.value}
                </h2>

                {metric.change && (
                  <p className="text-xs text-green-400 mt-1">
                    {metric.change}
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <Card className="lg:col-span-6 bg-[#090A15] border border-[#161826] rounded-2xl p-6">

          <h3 className="text-sm font-black uppercase mb-5">
            Monthly Revenue
          </h3>

          <div className="h-64">

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>

                <defs>
                  <linearGradient
                    id="revenue"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#FF4500"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="#FF4500"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#666" }}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  domain={[0, maxRevenue]}
                  tick={{ fill: "#666" }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FF4500"
                  fill="url(#revenue)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>

          </div>
        </Card>

        <Card className="lg:col-span-6 bg-[#090A15] border border-[#161826] rounded-2xl p-6">

          <h3 className="text-sm font-black uppercase mb-5">
            Classes by Category
          </h3>

          <div className="h-56">

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {categoryData.map((item, index) => (
                    <Cell
                      key={index}
                      fill={item.color}
                    />
                  ))}
                </Pie>

              </PieChart>
            </ResponsiveContainer>

          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">

            {categoryData.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-xs"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: item.color,
                  }}
                />

                {item.name}
              </div>
            ))}

          </div>

        </Card>

      </div>

    </div>
  );
};

export default AdminDashboardHomePage;