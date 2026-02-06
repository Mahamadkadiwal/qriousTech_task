import { api } from "../_lib/api";

export async function createPayment(data: any) {
  const res = await api(`/payment`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return res;
}
