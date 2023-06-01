import { fetchOrders } from "@/api/orders";
import ContentTable from "@/components/ContentTable";
import { orderTableColumns } from "@/components/ui/columns";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { error, data, isLoading, isFetching } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <ContentTable
        data={data}
        columns={orderTableColumns}
        searchColumn="_id"
      />
    </>
  );
};

export default Dashboard;
