import { axiosInstance } from "../utils/axiosInstance";

export async function fetchProducts(pageLimit: string, pageNumber: number) {
  const result = await axiosInstance.get(
    `/product/get-products?limit=${pageLimit}&page=${pageNumber}`
  );
  return result.data;
}

export async function fetchProductById(id: string) {
  const result = await axiosInstance.post("/product/get-by-id", { id });
  return result.data;
}
