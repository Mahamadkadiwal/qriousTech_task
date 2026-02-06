"use client";
import { useCallback, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import { getOrders } from "../_lib/localStorage";
import { Order } from "../_types/order";
import { api } from "../_lib/api";

type chartPoint = {
  date: string;
  orders: number;
  income: number;
}

interface chartDataSet {
  dailyChart: chartPoint[];
  monthlyChart: chartPoint[];
  weeklyChart: chartPoint[];
}


export default function Charts() {
  const [data, setData] = useState<chartDataSet | null>(null);
  const [chartType, setChartType] = useState<"daily" | "monthly" | "weekly">('daily');

  useEffect(() => {
    async function loadCharts() {
      const res = await api('/dashboard/charts');

      const formatWeekly = (w: any) =>
        `${w._id.year}-W${w._id.week}`;

      setData({
        dailyChart: res.daily.map((d: any) => ({
          date: d._id,
          orders: d.orders,
          income: d.income,
        })),
        monthlyChart: res.monthly.map((m: any) => ({
          date: m._id,
          orders: m.orders,
          income: m.income,
        })),
        weeklyChart: res.weekly.map((w: any) => ({
          date: formatWeekly(w),
          orders: w.orders,
          income: w.income,
        })),
      });
    }

    loadCharts();
  }, []);


  const handleChartData = (type: "daily" | "monthly" | "weekly") => {
    setChartType(type);
  }

  return (
    <div className="w-full">
      <div className="flex flex-col rounded mt-4 mx-2 md:mx-4 p-2 md:p-4">

        <div className="flex justify-end mb-2">
          <div className="chart-switch flex gap-2">
            <button
              className={`chart-btn ${chartType === "daily" ? "active" : ""}`}
              onClick={() => handleChartData("daily")}
            >
              Daily
            </button>

            <button
              className={`chart-btn ${chartType === "monthly" ? "active" : ""}`}
              onClick={() => handleChartData("monthly")}
            >
              Monthly
            </button>

            <button
              className={`chart-btn ${chartType === "weekly" ? "active" : ""}`}
              onClick={() => handleChartData("weekly")}
            >
              Weekly
            </button>
          </div>
        </div>

        <div className="w-full h-[250px] sm:h-[320px] md:h-[380px] lg:h-[420px] flex items-center justify-center">

          {!data || data[`${chartType}Chart`].length === 0 ? (
            <div className="text-center text-gray-500 text-sm md:text-base">
              No orders found yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data[`${chartType}Chart`]}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="income" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}

        </div>

      </div>
    </div>
  );

}
