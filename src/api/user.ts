import { axiosInstance } from "@/lib/axiosInstance";

export const userLoginAPI = async (user: {
  email: string;
  password: string;
}) => {
  const result = await axiosInstance.post("/user/login", user);

  return result.data;
};
