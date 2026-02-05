"use client";

import Input from "@/app/_component/Input";
import Modal from "@/app/_component/Modal";
import PageHeader from "@/app/_component/PageHeader";
import ProductTable from "@/app/_component/ProductTable";
import { api } from "@/app/_lib/api";
import { Product } from "@/app/_types/Product";
import { createProduct } from "@/app/actions/product.action";
import { ProductFormData, productSchema } from "@/app/Schema/Product";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Page() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProduct] = useState<Product[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
    },
  });

  const fetchProducts = useCallback(async () => {
    const products1 = await api('/product');
    // const products = getProduct() as Product[];
    // if (!products || products.length === 0) {
    //   localStorage.setItem("products", JSON.stringify(productData()));
    // }
    setProduct(products1);
  }, []);

  useEffect(() => {
    fetchProducts();

  }, [fetchProducts]);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  async function onSubmit(data: ProductFormData) {
    try {
      const product = await createProduct(data);
      if (product) {
        toast.success("Product added successfully");
        await fetchProducts();
        reset();
        setIsOpen(false);
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("image", `/products/${file.name}`, {
      shouldValidate: true,
    });
  }



  return (
    <div className="bg-white min-h-screen p-2">
      <PageHeader title="Products" btnText="Add Products" onClick={handleClick} />

      <div className="mt-2">
        <ProductTable products={products} onRefresh={fetchProducts} />
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Product">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Product Name"
            {...register("name")}
            error={errors.name?.message}
            disabled={isSubmitting}
          />

          <Input placeholder="Product Description"
            {...register("description")}
            error={errors.description?.message}
            disabled={isSubmitting}
          />

          <Input
            type="file"
            onChange={handleFileChange}
            error={errors.image?.message}
            disabled={isSubmitting}
          />

          <Input placeholder="Product Price"
            {...register("price", { valueAsNumber: true })}
            error={errors.price?.message}
            type="number"
            disabled={isSubmitting}
          />

          <button type="submit" className="primary-btn w-full">{isSubmitting ? "Adding..." : "Add Product"}</button>
        </form>
      </Modal>
    </div>
  )
}
