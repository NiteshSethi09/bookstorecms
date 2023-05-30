import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "./checkbox";
import { Badge } from "./badge";
import type { Product } from "@/types/products";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <img
        className="h-10 w-10 rounded-full"
        src={row.original.imageUrl}
        alt=""
      />
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <>
        Rs.
        {row.original.onSale
          ? row.original.price.offerPrice
          : row.original.price.originalPrice}
      </>
    ),
  },
  {
    accessorKey: "onSale",
    header: "Sale",
    cell: ({ row }) => (
      <Badge variant={row.original.onSale ? "secondary" : "destructive"}>
        Sale
      </Badge>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <>
        <Link
          to={`/admin/product/${row.original._id}`}
          className="mr-4 font-medium text-blue-600 hover:underline"
        >
          Edit
        </Link>
        <span
          className="cursor-pointer font-medium text-red-600 hover:underline"
          // onClick={() => mutate(item._id)}
        >
          Delete
        </span>
      </>
    ),
  },
];
