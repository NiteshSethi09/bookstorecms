import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import CustomForm from "../../components/CustomForm";
import Button from "../../components/ui/Button";
import TopNav from "../../components/ui/TopNav";
import { deleteProduct, fetchProductById } from "../../api/products";
import useDebounce from "../../hooks/useDebounce";

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

  const { error, data, isLoading, isFetching } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId!),
  });

  const { mutate } = useMutation(deleteProduct, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const [title, setTitle] = useState<string>(data?.data?.title ?? "");
  const [description, setDescription] = useState<string>(
    data?.data?.description ?? ""
  );
  const [category, setCategory] = useState<string>(
    data?.data?.category ?? categoryOptions?.[0]
  );
  const [originalPrice, setOriginalPrice] = useState<number>(
    data?.data?.price?.originalPrice ?? 0
  );
  const [offerPrice, setOfferPrice] = useState<number>(
    data?.data?.price?.offerPrice ?? 0
  );
  const [isOnSale, setIsOnSale] = useState<boolean>(
    data?.data?.onSale ?? false
  );
  const [imageUrl, setImageUrl] = useState<string>(data?.data?.imageUrl ?? "");

  useEffect(() => {
    if (data) {
      setTitle(data?.data?.title);
      setDescription(data?.data?.description);
      setCategory(data?.data?.category);
      setOriginalPrice(data?.data?.price?.originalPrice);
      setOfferPrice(data?.data?.price?.offerPrice);
      setIsOnSale(data?.data?.onSale);
      setImageUrl(data?.data?.imageUrl);
    }
  }, [data]);

  const debouncedTitle = useDebounce<string>(title);
  const debouncedDesc = useDebounce<string>(description);
  const debouncedOriginalPrice = useDebounce<number>(originalPrice);
  const debouncedOfferPrice = useDebounce<number>(offerPrice);

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
      <TopNav title={data?.data?.title} />
      <div className="sm:flex">
        <CustomForm
          data={{
            title,
            description,
            category,
            price: { offerPrice, originalPrice },
            onSale: isOnSale,
            imageUrl,
          }}
          setter={{
            setImageUrl,
            setDescription,
            setCategory,
            setIsOnSale,
            setOfferPrice,
            setOriginalPrice,
            setTitle,
          }}
        />
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
            onClick={() => {
              mutate(data.data._id);
              navigate(-1);
            }}
          >
            <AiOutlineDelete size={20} style={{ marginRight: "8px" }} />
            Delete this entry
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
