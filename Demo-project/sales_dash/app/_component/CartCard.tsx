"use client";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { CartWithDetails } from "../_types/cart";

export default function CartCard({ cart, onDelete }: { cart: CartWithDetails, onDelete: (id: string) => void }) {
  return (
    <div className="flex justify-between items-center rounded-xl p-4 gap-4 bg-white border border-gray-200 shadow-sm hover:shadow-lg transition">
      <div className="w-24 h-24 flex items-center justify-center">
        <Image
          src={cart.image || "/default-image.png"}
          alt={cart.product_name}
          width={100}
          height={100}
          className="object-cover rounded"
        />
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-(--font-color)">
          {cart.product_name}
        </h3>
        <p className="text-gray-500 text-sm">
          {cart.description}
        </p>
        <p className="text-lg font-bold text-green-600 mt-1">
          ₹ {cart.amount}
        </p>
      </div>

      <button
        onClick={() => onDelete(cart.id)}
        className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition group"
        title="Remove item"
      >
        <MdDelete className="text-xl group-hover:scale-110 transition" />
      </button>
    </div>
  );
}