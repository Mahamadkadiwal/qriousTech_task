import { api } from "../_lib/api";

export async function createOrder(data: any) {
  const res = await api(`/order`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return res;
}

export async function updateOrder(id: string, data: any) {
  const res = await api(`/order/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return res;
}

export async function deleteOrder(id: string) {
  const res = await api(`/order/${id}`, {
    method: "DELETE",
  });
  return res;
}
