"use client";
import { api } from "@/app/_lib/api";
import { Order } from "@/app/_types/order";
import { User, Users } from "@/app/_types/user";
import { useEffect, useState } from "react";
import OrderCard from "../../_component/OrderCard";
import { getCurrentUser, getProduct } from "../../_lib/localStorage";


export default function Page() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<(Order & {
    image?: string;
    description?: string;
  })[]>([]);

  const fetchOrder = async () => {
    const userData = getCurrentUser() as Users | null;

    if (userData && userData.role === "user") {
      // setCurrentUser(userData);

      const allOrders = await api(`/order/user/${userData.userId}`);
      console.log(allOrders);
      setOrders(allOrders);
    }
  }

  useEffect(() => {

    fetchOrder();
  }, []);


  return (
    <div className="min-h-full pt-4 pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-(--font-color) mb-4">
        My Orders
      </h2>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}