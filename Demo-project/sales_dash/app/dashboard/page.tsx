"use client";
import { useCallback, useEffect, useState } from "react";
import BarChartShown from "../_component/BarChartShown";
import Charts from "../_component/Charts";
import DashboardCard from "../_component/DashboardCard";
import Donut from "../_component/Donut";
import OrderTable from "../_component/OrderTable";
import PageHeader from "../_component/PageHeader";
import { api } from "../_lib/api";
import { DashboardData } from "../_lib/Types";
import { OrderWithDetails } from "../_types/order";

export default function Page() {
  const [data, setData] = useState<DashboardData | null>(null);

  const [orders, setOrders] = useState<OrderWithDetails[]>([]);

  const fetchOrders = useCallback(async () => {
    const orders = await api(`/order`);
    if (!orders) return;
    setOrders(orders);
  }, []);

  useEffect(() => {

    fetchOrders();
  }, [fetchOrders]);

  const fetchDashboardCount = useCallback(async () => {
    const count = await api(`/dashboard/counts`);
    setData(count);
  }, [])

  useEffect(() => {
    fetchDashboardCount();
  }, [orders]);


  if (!data) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-3 md:p-4 lg:p-6">

      <PageHeader title="Dashboard" />

      <div className="mb-6">
        <DashboardCard data={data} />
      </div>

      <div className="mt-4 bg-white shadow-sm rounded-xl p-2 md:p-4 overflow-x-auto">
        <PageHeader title="Orders" />
        <OrderTable orders={orders} onRefresh={fetchOrders} />
      </div>

      <div className="mt-6 rounded-xl bg-white shadow-sm p-2 md:p-4">
        <Charts />
      </div>


      <div className="mt-6 p-2 md:p-4 rounded-xl bg-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="flex justify-center">
            <Donut />
          </div>

          <div className="flex justify-center">
            <BarChartShown />
          </div>

        </div>
      </div>

    </div>
  );
}
