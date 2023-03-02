import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Indicator from "../ui/Indicator";
import type { Product } from "../../types/products";
import { deleteProduct } from "../../api/products";

interface ContentTableProps {
  data: Product[];
  search?: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const ContentTable = ({ data, search, setSearch }: ContentTableProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteProduct, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["products"]);
    },
  });
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:ml-4 sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-200 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                OnSale
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: Product) => (
              <tr
                key={item._id}
                className="border-b bg-white hover:bg-gray-100"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="truncate whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {item.title}
                </th>
                <td className="px-6 py-4 text-gray-900">{item.category}</td>
                <th
                  scope="row"
                  className="flex items-center whitespace-nowrap px-6 py-4 text-gray-900"
                >
                  <img
                    className="h-10 w-10 rounded-full"
                    src={item.imageUrl}
                    alt="Jese image"
                  />
                </th>
                <td className="px-6 py-4 text-gray-900">
                  Rs.
                  {item.onSale
                    ? item.price.offerPrice
                    : item.price.originalPrice}
                </td>
                <td className="px-6 py-4">
                  <Indicator onSale={item.onSale} />
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/product/${item._id}`}
                    state={item}
                    className="pr-4 font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <span
                    className="cursor-pointer font-medium text-red-600 hover:underline"
                    onClick={() => mutate(item._id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ContentTable;
