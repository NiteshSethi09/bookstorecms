import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash, UploadCloud } from "lucide-react";

import {
  deleteProductAPI,
  fetchProductById,
  updateProductByIdAPI,
} from "@/api/products";
import TopNav from "@/components/TopNav";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@/types/products";

const categoryOptions = [
  "Career Development",
  "Personal Development",
  "Lifestyle",
  "Health & Wellbeing",
];
const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [productData, setProductData] = useState<Product>(undefined!);

  const { error, data, isLoading, isFetching } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId!),
    onSuccess: (data) => setProductData(data.data),
  });

  const { mutate: mutateDelete } = useMutation(deleteProductAPI, {
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries(["products"]);
      navigate(-1);
    },
  });

  const { mutate: mutateUpdate } = useMutation(updateProductByIdAPI, {
    onSuccess: async (data, variables, context) => {
      console.log(data);
    },
  });

  const fun = async (file: Blob) => {
    const fReader = new FileReader();
    fReader.readAsDataURL(file);

    fReader.onload = function (e) {
      setProductData((prev) => ({
        ...prev,
        imageUrl: e.target?.result as string,
      }));
    };
  };

  const handleDescription = useCallback(
    (e: any) =>
      setProductData((prev) => ({ ...prev, description: e.target.value })),
    []
  );

  const handleTitle = useCallback((e: any) => {
    setProductData((prev) => ({ ...prev, title: e.target.value }));
  }, []);

  if (error || data?.error) {
    return <h1>{data?.message ?? "Error while loading"}</h1>;
  }

  if (isLoading || isFetching) {
    return <h1>Fetching...</h1>;
  }

  if (!data?.data) {
    return <h1>No data Found</h1>;
  }

  const { createdAt, updatedAt } = data?.data;

  return (
    <>
      <TopNav
        title={data?.data?.title}
        buttonComponent={
          <Button variant="secondary" onClick={() => mutateUpdate(productData)}>
            Save
          </Button>
        }
      />
      <div className="sm:flex">
        <form className={`mb-4 w-full border p-4 sm:mx-4 sm:mb-0`}>
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div className="mb-6">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                defaultValue={productData?.title}
                onChange={handleTitle}
                required
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="descrip">Description</Label>
              <Textarea
                id="descrip"
                value={productData?.description}
                onChange={handleDescription}
                rows={4}
              />
            </div>
          </div>

          <div className="mb-6 flex w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              {productData?.imageUrl === "" ? (
                <>
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <UploadCloud className="mb-3 h-10 w-10 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => fun(e.target.files?.[0]!)}
                  />
                </>
              ) : (
                // Opening a dialog box automaticqally for accepting a new file input when deleting an image file, this needs to be fixed.
                <>
                  <img src={productData?.imageUrl} alt="" className="h-5/6" />
                  <div className="absolute bottom-0 flex text-6xl">
                    <div className="m-2 border bg-gray-300 p-1">
                      <Edit />
                    </div>
                    <div className="m-2 border bg-gray-300 p-1">
                      <Trash
                        onClick={() =>
                          setProductData((prev) => ({
                            ...prev,
                            imageUrl: "",
                          }))
                        }
                      />
                    </div>
                  </div>
                </>
              )}
            </label>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div className="mb-6">
              <Label htmlFor="countries">Category</Label>
              <Select
                value={productData?.category}
                onValueChange={(value: string) =>
                  setProductData((prev) => ({
                    ...prev,
                    category: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose Category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div className="mb-6">
              <Label>Original Price</Label>
              <Input
                id="originalPrice"
                pattern="[0-9]*"
                defaultValue={productData?.price.originalPrice}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    price: {
                      ...prev.price,
                      originalPrice: e.target.validity.valid
                        ? +e.target.value
                        : prev.price.originalPrice,
                    },
                  }))
                }
                required
              />
            </div>
            <div className="mb-6">
              <Label>Offer Price</Label>
              <Input
                id="offerPrice"
                type="text"
                pattern="[0-9]*"
                defaultValue={productData?.price.offerPrice}
                disabled={!productData?.onSale}
                readOnly={!productData?.onSale}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    price: {
                      ...prev.price,
                      offerPrice: e.target.validity.valid
                        ? +e.target.value
                        : prev.price.offerPrice,
                    },
                  }))
                }
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <Label>On Sale</Label>
            <Tabs
              value={productData?.onSale + ""}
              onValueChange={(value) =>
                setProductData((prev) => ({
                  ...prev,
                  onSale: value === "true",
                }))
              }
              className="w-[200px]"
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="true">Yes</TabsTrigger>
                <TabsTrigger value="false">No</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </form>
        <div className="sm:w-2/4">
          <div className="mb-4 h-min border p-4">
            <h3>Information</h3>
            <hr className="my-4 h-px border-0 bg-gray-200 dark:bg-gray-700" />
            <div className="flex justify-between">
              <label
                htmlFor=""
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Created
              </label>
              <p>
                {createdAt
                  ? new Date(createdAt).toDateString()
                  : "-- / -- / --"}
              </p>
            </div>
            <div className="flex justify-between">
              <label
                htmlFor=""
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Last Updated
              </label>
              <p>
                {updatedAt
                  ? new Date(updatedAt).toDateString()
                  : "-- / -- / --"}
              </p>
            </div>
          </div>
          <Button
            className="flex w-full items-center border text-red-700"
            onClick={() => mutateDelete(productData._id!)}
            type="button"
            variant="outline"
          >
            <Trash size={20} className="mr-2" />
            Delete this entry
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
