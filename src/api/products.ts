import type { Product } from "@/types/products";
import { axiosInstance } from "@/lib/axiosInstance";

export async function fetchProductsAPI() {
  const result = await axiosInstance.get("/product/get-products");
  return result.data;
}

export async function fetchProductById(id: string) {
  const result = await axiosInstance.post("/product/get-by-id", { id });
  return result.data;
}

export async function createProductAPI(product: Omit<Product, "_id">) {
  const result = await axiosInstance.post("/product/create", { ...product });
  return result.data;
}

export async function deleteProductAPI(id: string) {
  const result = await axiosInstance.delete("/product/delete-by-id", {
    data: { id },
  });
  return result.data;
}
