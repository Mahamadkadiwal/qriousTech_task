import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { api } from "../_lib/api";

type PieItem = {
  name: string;
  value: number;
};

export default function Donut() {
  const COLORS = ["#4ADE80", "#60A5FA", "#A78BFA", "#F87171", "#FACC15"];
  const [data, setData] = useState<PieItem[] | null>(null);

  useEffect(() => {
    async function loadStatus() {
      const orders = await api(`/dashboard/statusCount`);
      if (!orders) return;
      setData(orders);
    }

    loadStatus();
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-center text-(--font-color) mb-2">
        Order Information
      </h3>

      <div className="w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px]">

        {!data || data.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full text-gray-500">
            No order data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="45%"
                outerRadius="70%"
                paddingAngle={3}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}

      </div>
    </div>

  );
}
