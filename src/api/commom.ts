import { axiosInstance } from "@/lib/axiosInstance";

export const getImageData = async (formData: FormData) => {
  const result = await axiosInstance.post("/common/upload-file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result;
};
