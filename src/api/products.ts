import { Product } from "../types/products";
import { axiosInstance } from "../utils/axiosInstance";

export async function fetchProducts(
  pageLimit: string,
  pageNumber: number,
  title?: string
) {
  const result = await axiosInstance.get(
    `/product/get-products?limit=${pageLimit}&page=${pageNumber}&title=${title}`
  );
  return result.data;
}

export async function fetchProductById(id: string) {
  const result = await axiosInstance.post("/product/get-by-id", { id });
  return result.data;
}

export async function createProduct(product: Omit<Product, "_id">) {
  const result = await axiosInstance.post("/product/create", { ...product });
  return result.data;
}

export async function deleteProduct(id: string) {
  const result = await axiosInstance.delete("/product/delete-by-id", {
    data: { id },
  });
  return result.data;
}
