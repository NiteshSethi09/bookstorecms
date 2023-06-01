import { axiosInstance } from "@/lib/axiosInstance";

export async function fetchOrders() {
  const result = await axiosInstance.get("/order/get-orders");
  return result.data;
}
