import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import { fetchProductsAPI } from "@/api/products";
import ContentTable from "@/components/ContentTable";
import { Button } from "@/components/ui/button";
import { columns } from "@/components/ui/columns";

const Products = () => {
  const { data, error, status, isFetching, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProductsAPI(),
    keepPreviousData: true,
  });

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
          variant="secondary"
          onClick={() => navigate("/admin/product/create")}
        >
          <Plus size={20} className="mr-2" />
          Create new entry
        </Button>
      </div>
      <ContentTable data={data?.data} columns={columns} />
    </>
  );
};

export default Products;
