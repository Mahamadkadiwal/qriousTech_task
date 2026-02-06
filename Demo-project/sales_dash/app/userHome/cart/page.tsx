"use client";
import CartCard from "@/app/_component/CartCard";
import OrderSummary from "@/app/_component/OrderSummary";
import { CartWithDetails } from "@/app/_types/cart";
import { User } from "@/app/_types/user";
import { useEffect, useState } from "react";
import { cartDelete, getCart, getCurrentUser, getProduct, updateCartQuantity } from "../../_lib/localStorage";


export default function Page() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [carts, setCarts] = useState<CartWithDetails[]>([]);

    const fetchCart = () => {
        const userData = getCurrentUser() as User | null;

        if (userData && userData.role === "user") {
            setCurrentUser(userData);

            const allCart = getCart() || [];
            const allProducts = getProduct() || [];

            const userCart = allCart.filter(cart => cart.customer_name === userData.username);

            const productwithCart = userCart.map(cart => {
                const product = allProducts.find(
                    p => p.name === cart.product_name
                );

                return {
                    ...cart,
                    image: product?.image || "",
                    description: product?.description || "",
                };
            });
            setCarts(productwithCart);
        }
    }
    useEffect(() => {
        fetchCart();
    }, []);

    const handleDelete = (id: string) => {
        cartDelete(id);
        fetchCart();
    };

    const handleQuantityChange = (id: string, qty: number) => {
        if (qty < 1) return;
        updateCartQuantity(id, qty);
        fetchCart();
    };

    return (
        <div className="min-h-full pt-4 pb-10 px-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-(--font-color) mb-4">
                My Cart
            </h2>

            {carts.length === 0 && (
                <p className="text-gray-500">No products added in cart yet.</p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 flex flex-col gap-4 max-h-[75vh] overflow-y-auto pr-2">
                    {carts.map(cart => (
                        <CartCard key={cart.id} cart={cart} onDelete={handleDelete} onQuantityChange={handleQuantityChange} />
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <OrderSummary carts={carts} />
                </div>

            </div>

        </div>
    );
}