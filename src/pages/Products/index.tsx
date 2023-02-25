import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import ContentTable from "../../components/ContentTable";
import Button from "../../components/ui/Button";
import FormSelect from "../../components/form/FormSelect";
import SearchBar from "../../components/ui/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import { fetchProducts } from "../../api/products";
import { PageLimit } from "../../types/products";

const Products = () => {
  const [pageLimit, setPageLimit] = useState<PageLimit>("10");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce<string>(search);

  const { data, error, status, isFetching, isLoading } = useQuery({
    queryKey: ["products", debouncedSearch],
    queryFn: () => fetchProducts(pageLimit, pageNumber, debouncedSearch),
    keepPreviousData: true,
  });

  // useEffect(() => {
  //   setPageNumber(1);
  // }, [pageLimit, search]);

  const navigate = useNavigate();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error while loading...</h1>;
  }
  return (
    <>
      <div className="mb-4 flex justify-end sm:ml-4">
        <Button
          className="flex items-center bg-blue-600 text-white"
          onClick={() => navigate("/admin/product/create")}
        >
          <AiOutlinePlus size={20} style={{ marginRight: "8px" }} />
          Create new entry
        </Button>
      </div>
      <SearchBar value={search} setValue={setSearch} />
      <ContentTable data={data?.data} search={search} setSearch={setSearch} />
      {/* <div className="mt-6 flex justify-between">
        <div className="flex items-center justify-center sm:ml-4">
          <FormSelect
            optionList={["10", "20", "50"]}
            className="w-auto"
            value={pageLimit}
            onChange={(e) => setPageLimit(e.target.value as PageLimit)}
          />
          &nbsp;Entries per page
        </div>
        <div className="flex">
          <Button
            className="mr-4 flex items-center"
            disabled={pageNumber === 1}
            onClick={() => setPageNumber((prev) => prev - 1)}
          >
            <BsArrowLeft size={20} style={{ marginRight: "8px" }} />
            Previous
          </Button>

          <Button
            className="flex items-center"
            disabled={Math.ceil(data?.pageCount / +pageLimit) === pageNumber}
            onClick={() => setPageNumber((prev) => prev + 1)}
          >
            Next
            <BsArrowRight size={20} style={{ marginLeft: "8px" }} />
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default Products;
