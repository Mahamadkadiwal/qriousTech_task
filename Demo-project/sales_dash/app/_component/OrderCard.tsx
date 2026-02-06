"use client";
import Image from "next/image";
import { OrderWithDetails } from "../_types/order";
import { formatDate } from "../utils/formatDate";

export default function OrderCard({ order }: { order: OrderWithDetails }) {
  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 space-y-4">

      <div className="space-y-4">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="
              flex flex-col sm:flex-row
              gap-3 sm:gap-4
              border-b border-gray-400 pb-3 last:border-none last:pb-0
            "
          >
            <div className="
             w-full sm:w-24 h-40 sm:h-24 relative flex items-center justify-center
            ">
              <Image
                src={item.productId?.image || "/default-image.png"}
                alt={item.name}
                width={100}
                height={100}
                className="object-cover rounded"
              />
            </div>

            <div className="flex flex-col flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-(--font-color)">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500 line-clamp-2">
                {item.productId?.description}
              </p>

              <p className="text-sm font-medium text-green-600 mt-1">
                ₹ {item.price} × {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="
        flex flex-col sm:flex-row
        sm:justify-between sm:items-center
        gap-3 border-t border-gray-400 pt-3
      ">

        <div className="text-sm text-(--font-color) space-y-1">
          <p>
            <span className="font-semibold">Total:</span> ₹ {order.totalAmount}
          </p>
          <p>
            <span className="font-semibold">Ordered:</span>{" "}
            {formatDate(order.orderDate)}
          </p>
        </div>

        <span
          className={`
            px-3 py-1 rounded-full
            text-xs sm:text-sm
            font-semibold w-fit
            ${statusStyle[order.status]}
          `}
        >
          {order.status}
        </span>
      </div>
    </div>
  );
}
