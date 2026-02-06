"use client";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { CartWithDetails } from "../_types/cart";

export default function CartCard({ cart, onDelete, onQuantityChange }: { cart: CartWithDetails, onDelete: (id: string) => void, onQuantityChange: (id: string, quantity: number) => void }) {
  return (
    <div className="flex flex-col sm:flex-row
  gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition">
      <div className="w-full sm:w-24 h-40 sm:h-24 relative flex items-center justify-center">
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

        <div
          className="flex items-center mt-3 border border-gray-300 rounded-lg overflow-hidden w-fit"
        >
          <button
            onClick={() => onQuantityChange(cart.id, cart.quantity - 1)}
            disabled={cart.quantity <= 1}
            className="w-8 h-8 flex items-center justify-center
              text-lg font-semibold hover:bg-gray-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition
            "
          >
            −
          </button>
          <span
            className="
            px-3 h-8 flex items-center justify-center
            bg-gray-50 text-gray-800 font-semibold
            border-x border-gray-200
            min-w-10
          "
          >
            {cart.quantity}
          </span>
          <button
            onClick={() => onQuantityChange(cart.id, cart.quantity + 1)}
            className="
              w-8 h-8 flex items-center justify-center
              text-lg font-semibold
              hover:bg-gray-100 active:scale-95
              transition
            "
          >
            +
          </button>
        </div>


        <p className="text-lg font-bold text-green-600 mt-1">
          ₹ {+cart.amount * cart.quantity}
        </p>
      </div>

      <div className="flex justify-end sm:justify-start mt-2">
        <button
          onClick={() => onDelete(cart.id)}
          className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition group"
          title="Remove item"
        >
          <MdDelete className="text-xl group-hover:scale-110 transition" />
        </button>
      </div>
    </div>
  );
}