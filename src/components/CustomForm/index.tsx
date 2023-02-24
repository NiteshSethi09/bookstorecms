import { FC, useCallback } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import FormTextArea from "../form/FormTextArea";
import Button from "../ui/Button";
import { Product } from "../../types/products";

const categoryOptions = [
  "Career Development",
  "Personal Development",
  "Lifestyle",
  "Health & Wellbeing",
];

interface CustomFormProps {
  data: Omit<Product, "_id">;
  setter: {
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    setOriginalPrice: React.Dispatch<React.SetStateAction<number>>;
    setOfferPrice: React.Dispatch<React.SetStateAction<number>>;
    setIsOnSale: React.Dispatch<React.SetStateAction<boolean>>;
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  };
  className?: string;
}
const CustomForm: FC<CustomFormProps> = ({ data, className, setter }) => {
  const fun = async (file: Blob) => {
    const fReader = new FileReader();
    fReader.readAsDataURL(file);

    fReader.onload = function (e) {
      setter?.setImageUrl(e.target?.result as string);
    };
  };

  const handleDescription = useCallback(
    (e: any) => setter?.setDescription(e.target.value),
    []
  );
  const handleCategory = useCallback(
    (e: any) => setter?.setCategory(e.target.value),
    []
  );
  const handleTitle = useCallback(
    (e: any) => setter?.setTitle(e.target.value),
    []
  );

  return (
    <>
      <form
        className={`mb-4 w-full border p-4 sm:mx-4 sm:mb-0 ${className ?? ""}`}
      >
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <FormInput
              type="text"
              id="title"
              value={data?.title}
              onChange={handleTitle}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Description
            </label>

            <FormTextArea
              id="desc"
              value={data?.description}
              onChange={handleDescription}
              required
            />
          </div>
        </div>

        <div className="mb-6 flex w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            {data?.imageUrl === "" ? (
              <>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="mb-3 h-10 w-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeDashoffset="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
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
                <img src={data?.imageUrl} alt="" className="h-5/6" />
                <div className="bg- absolute bottom-0 flex text-6xl">
                  <div className="m-2 border bg-gray-300 p-1">
                    <AiOutlineEdit size={25} />
                  </div>
                  <div className="m-2 border bg-gray-300 p-1">
                    <AiOutlineDelete
                      size={25}
                      onClick={() => setter?.setImageUrl("")}
                    />
                  </div>
                </div>
              </>
            )}
          </label>
        </div>

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div className="mb-6">
            <label
              htmlFor="countries"
              className="mb-2 block text-sm font-medium text-gray-900 "
            >
              Category
            </label>
            <FormSelect
              id="category-select"
              optionList={categoryOptions}
              value={data?.category}
              onChange={handleCategory}
            />
          </div>
        </div>

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Original Price
            </label>
            <FormInput
              id="originalPrice"
              pattern="[0-9]*"
              value={data?.price?.originalPrice}
              onChange={(e) =>
                setter?.setOriginalPrice((v) =>
                  e.target.validity.valid ? +e.target.value : v
                )
              }
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Offer Price
            </label>
            <FormInput
              id="offerPrice"
              type="text"
              pattern="[0-9]*"
              value={data?.price?.offerPrice}
              disabled={!data?.onSale}
              readOnly={!data?.onSale}
              className={`${
                !data?.onSale
                  ? "cursor-not-allowed disabled:border-slate-200  disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
                  : null
              }`}
              onChange={(e) =>
                setter?.setOfferPrice((v) =>
                  e.target.validity.valid ? +e.target.value : v
                )
              }
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-900">
            On Sale
          </label>
          <div className="w-fit border-2">
            <Button
              onClick={() => setter?.setIsOnSale(false)}
              className={`m-1 text-white hover:bg-red-700 focus:ring-red-300
              ${data?.onSale ? "bg-red-200" : "bg-red-600"}`}
            >
              No
            </Button>
            <Button
              onClick={() => setter?.setIsOnSale(true)}
              className={`m-1 text-white hover:bg-green-700 focus:ring-green-300
              ${data?.onSale ? "bg-green-600" : "bg-green-200"}`}
            >
              Yes
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CustomForm;
