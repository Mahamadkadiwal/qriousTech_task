import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api } from "../_lib/api";

type BarData = {
  name: string;
  orders: number;
};


export default function BarChartShown() {
  const [data, setData] = useState<BarData[] | null>(null);

  useEffect(() => {
    async function loadProduct() {
      const res = await api('/dashboard/productCount');
      setData(res);
    }

    loadProduct();
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-center text-(--font-color) mb-2">
        Top 5 Products
      </h3>

      <div className="w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px]">
        {!data || data.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full text-gray-500">
            No product data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
