"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../_lib/api";
import { addCart, getCurrentUser } from "../_lib/localStorage";
import { Product } from "../_types/Product";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    const products1 = await api('/product');
    setProducts(products1);
  }, []);

  useEffect(() => {
    fetchProducts();

  }, [fetchProducts]);

  function addToCart(product: Product) {
    const user = getCurrentUser();
    setLoading(true);

    const data = {
      id: "",
      customer_name: user ? user.username : "Guest",
      userId: user ? user.userId : "Guest",
      product_name: product.name,
      amount: product.price,
      quantity: 1,
      productId: product.id
    };
    try {
      addCart(data);
      toast.success("Added to cart successfully");
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      if (error instanceof Error)
        toast.error(error?.message || "Failed to add to cart");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-full pt-4 pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-(--font-color) mb-4">
        Available Products
      </h2>

      {products.length === 0 && (
        <p className="text-gray-500">No products available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200
            shadow-sm hover:shadow-lg transition p-4 flex flex-col sm:flex-row gap-4"
          >
            <div className="w-full sm:w-28 h-40 sm:h-28 relative flex justify-center items-center">
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                className="object-contain rounded"
              />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>

              <p className="text-gray-500 text-sm">{product.description}</p>

              <p className="text-xl font-bold text-gray-800 mt-1">
                ₹ {product.price}
              </p>

              <button type="button" onClick={() => addToCart(product)}
                className="mt-2 primary-btn w-full sm:w-fit">
                {loading ? 'Adding...' : 'Add to cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
