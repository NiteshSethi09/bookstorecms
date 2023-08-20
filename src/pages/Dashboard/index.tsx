import { fetchOrders } from "@/api/orders";
import ContentTable from "@/components/ContentTable";
import { orderTableColumns } from "@/components/ui/columns";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { error, data, isLoading, isFetching } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="p-4 sm:ml-64">
        <ContentTable
          data={data}
          columns={orderTableColumns}
          searchColumn="_id"
        />
      </div>
    </>
  );
};

export default Dashboard;
