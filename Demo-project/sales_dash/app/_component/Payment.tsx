"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import { PaymentFormData, paymentSchema } from "../Schema/payment";
import { Cart } from "../_types/cart";
import { addOrder, addPayment, clearCart, getOrders } from "../_lib/localStorage";
import { Status } from "../Schema/Order";
import { Payment } from "../_types/payment";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PaymentForm({
    carts,
    totalAmount,
    onClose,
}: {
    carts: Cart[];
    totalAmount: number;
    onClose: () => void;
}) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
    });

    const onSubmit = async (formData: PaymentFormData) => {
        try {
            const createdOrderIds: string[] = [];

            carts.forEach(cart => {
                const orderData = {
                    id: "",
                    customer_name: cart.customer_name,
                    product_name: cart.product_name,
                    amount: cart.amount,
                    order_date: new Date().toISOString().split("T")[0],
                    status: "Pending" as Status,
                    isNew: true,
                };

                const newOrder = addOrder(orderData);
                createdOrderIds.push(newOrder.id);
            });

            const payment: Payment = {
                id: "",
                orderIds: createdOrderIds,
                cardHolder: formData.cardHolder,
                last4: formData.cardNumber.slice(-4),
                amount: totalAmount,
            };

            addPayment(payment);
            clearCart();

            toast.success("Order placed successfully!");
            router.push("/userHome/order");
            onClose();
        } catch (err) {
            if (err instanceof Error) {
                toast.error(`Error: ${err.message}`);
            } else
                toast.error("Failed to process payment.");
        }

    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-600">Amount Payable</p>
                <p className="text-2xl font-bold text-green-600">
                    ₹ {totalAmount}
                </p>
            </div>

            <Input
                label="Card Holder Name"
                placeholder="Name on Card"
                {...register("cardHolder")}
                error={errors.cardHolder?.message}
                disabled={isSubmitting}
            />

            <Input
                label="Card Number"
                placeholder="1234123412341234"
                maxLength={16}
                {...register("cardNumber")}
                error={errors.cardNumber?.message}
                disabled={isSubmitting}
            />

            <div className="flex gap-4">
                <Input
                    label="Expiry (MM/YY)"
                    placeholder="08/28"
                    {...register("expiry")}
                    error={errors.expiry?.message}
                    disabled={isSubmitting}
                />

                <Input
                    label="CVV"
                    type="password"
                    maxLength={3}
                    {...register("cvv")}
                    error={errors.cvv?.message}
                    disabled={isSubmitting}
                />
            </div>

            <div className="flex gap-4 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="w-1/2 border border-gray-300 p-3 rounded-lg hover:bg-gray-100"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-1/2 primary-btn text-white p-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
                >
                    {isSubmitting ? "Processing..." : "Pay Now"}
                </button>
            </div>

        </form>
    );
}
