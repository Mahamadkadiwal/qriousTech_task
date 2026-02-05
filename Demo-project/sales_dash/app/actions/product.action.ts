"use server";

import { api } from "../_lib/api";

export async function createProduct(data: any) {
  const product = await api("/product", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return product;
}

export async function updateProduct(id: string, data: any) {
  const updateProduct = await api(`/product/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return updateProduct;
}

export async function deleteProduct(id: string) {
  return await api(`/product/${id}`, {
    method: "DELETE",
  });
}
