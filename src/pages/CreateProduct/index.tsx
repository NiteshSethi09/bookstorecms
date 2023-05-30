import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Edit, Trash, UploadCloud } from "lucide-react";

import { createProductAPI } from "@/api/products";
import TopNav from "@/components/TopNav";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from "@/types/products";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const categoryOptions = [
  "Career Development",
  "Personal Development",
  "Lifestyle",
  "Health & Wellbeing",
];

const CreateProduct = () => {
  const [productData, setProductData] = useState<Product>({
    title: "",
    description: "",
    category: categoryOptions[0],
    price: {
      offerPrice: 0,
      originalPrice: 0,
    },
    onSale: false,
    imageUrl: "",
  });

  const { mutate } = useMutation(createProductAPI, {
    onSuccess(data, variables, context) {
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
  const handleTitle = useCallback(
    (e: any) => setProductData((prev) => ({ ...prev, title: e.target.value })),
    []
  );

  const handleSubmit = () => mutate(productData);

  return (
    <>
      <TopNav
        buttonComponent={
          <Button onClick={handleSubmit} variant="secondary">
            Create
          </Button>
        }
      />
      <div className="mr-0 sm:mr-4">
        <form className={`mb-4 w-full rounded-md border p-4 sm:mx-4 sm:mb-0`}>
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div className="mb-6">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={productData?.title}
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
                value={productData?.price?.originalPrice}
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
                value={productData?.price?.offerPrice}
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
      </div>
    </>
  );
};

export default CreateProduct;
