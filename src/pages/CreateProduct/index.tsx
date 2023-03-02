import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CustomForm from "../../components/CustomForm";
import TopNav from "../../components/ui/TopNav";
import useDebounce from "../../hooks/useDebounce";
import { createProduct } from "../../api/products";

const categoryOptions = [
  "Career Development",
  "Personal Development",
  "Lifestyle",
  "Health & Wellbeing",
];

const CreateProduct = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>(categoryOptions?.[0]);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [offerPrice, setOfferPrice] = useState<number>(0);
  const [isOnSale, setIsOnSale] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const debouncedTitle = useDebounce<string>(title);
  const debouncedDesc = useDebounce<string>(description);
  const debouncedOriginalPrice = useDebounce<number>(originalPrice);
  const debouncedOfferPrice = useDebounce<number>(offerPrice);

  const { mutate } = useMutation(createProduct);

  const handleSubmit = () => {
    mutate({
      category,
      description: debouncedDesc,
      imageUrl,
      onSale: isOnSale,
      price: {
        offerPrice: debouncedOfferPrice,
        originalPrice: debouncedOriginalPrice,
      },
      title: debouncedTitle,
    });
  };
  return (
    <>
      <TopNav onClickHandler={handleSubmit} />
      <div className="mr-0 sm:mr-4">
        <CustomForm
          data={{
            category,
            description,
            imageUrl,
            onSale: isOnSale,
            price: { offerPrice, originalPrice },
            title,
          }}
          setter={{
            setCategory,
            setDescription,
            setImageUrl,
            setIsOnSale,
            setOfferPrice,
            setOriginalPrice,
            setTitle,
          }}
        />
      </div>
    </>
  );
};

export default CreateProduct;
