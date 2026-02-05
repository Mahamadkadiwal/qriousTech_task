"use client";
import { useMemo, useState } from "react";
import { Cart } from "../_types/cart";
import Modal from "./Modal";
import PaymentForm from "./Payment";

export default function OrderSummary({ carts }: { carts: Cart[] }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const totalAmount = useMemo(
        () => carts.reduce((total, cart) => total + Number(+cart.amount * cart.quantity), 0),
        [carts]
    );

    return (
        <div className="sticky top-6 p-6 bg-white border border-gray-200 rounded-2xl shadow-md space-y-6">

            <h3 className="text-xl font-bold text-(--font-color)">
                Order Summary
            </h3>

            <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span>{carts.length}</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-semibold text-(--font-color)">
                <span>Total</span>
                <span className="text-green-600">₹ {totalAmount}</span>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="w-full primary-btn text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
                Proceed to Checkout
            </button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Checkout"
            >
                <PaymentForm
                    carts={carts}
                    totalAmount={totalAmount}
                    onClose={() => setIsOpen(false)}
                />
            </Modal>

        </div>
    );
}
