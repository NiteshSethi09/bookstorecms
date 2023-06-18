import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

import { Checkbox } from "./checkbox";
import { Badge } from "./badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Button } from "./button";
import { Label } from "./label";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { AspectRatio } from "./aspect-ratio";
import type { Product } from "@/types/products";
import type { Order } from "@/types/orders";
import { deleteProductAPI } from "@/api/products";

export const productTableColumns: ColumnDef<Product>[] = [
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
    cell: ({ row }) => {
      const queryClient = useQueryClient();

      const { mutate } = useMutation(deleteProductAPI, {
        onSuccess: async () => {
          await queryClient.invalidateQueries(["products"]);
        },
      });
      return (
        <>
          <Link
            to={`/admin/product/${row.original._id}`}
            className="mr-4 font-medium text-blue-600 hover:underline"
          >
            Edit
          </Link>
          <span
            className="cursor-pointer font-medium text-red-600 hover:underline"
            onClick={() => mutate(row.original._id!)}
          >
            Delete
          </span>
        </>
      );
    },
  },
];

export const orderTableColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => <>{row.original.user.name}</>,
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => (
      <>
        {row.original.items.map((item) => (
          <p key={item._id}>{item.product.title}</p>
        ))}
      </>
    ),
  },
  {
    accessorKey: "orderDetails",
    header: "OrderDetails",
    cell: ({ row }) => <>{row.original.orderDetails.currency}</>,
  },
  {
    accessorKey: "orderPlacedDate",
    header: "Date",
    cell: ({ row }) => (
      <>{moment(row.original.orderPlacedDate).format("LLL")}</>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">See Details</Button>
          </SheetTrigger>
          <SheetContent position="right" size="default">
            <SheetHeader>
              <SheetTitle>Order Details</SheetTitle>
              <SheetDescription>
                Customer ordered these products. See below the order details.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label>Name</Label>
                <p>{row.original.user.name}</p>
              </div>
              <div>
                <Label htmlFor="username">Items</Label>
                <div>
                  {row.original.items.map((item) => (
                    <Card key={item._id} className="mb-4 last:mb-0">
                      <CardHeader>
                        <CardTitle>{item.product.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-1 h-auto w-[120px]">
                            <AspectRatio ratio={1}>
                              <img
                                src={item.product.imageUrl}
                                alt=""
                                className="h-full w-full"
                              />
                            </AspectRatio>
                          </div>
                          <div className="col-span-2 grid grid-cols-4">
                            <Label className="col-start-1">Category</Label>
                            <p className="col-span-3">
                              {item.product.category}
                            </p>
                            <Label className="col-start-1">Sale</Label>
                            <Badge
                              variant={
                                item.product.onSale
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              Sale
                            </Badge>
                            <Label className="col-start-1">Amount</Label>
                            <p className="col-span-2">
                              Rs.{" "}
                              {item.product.onSale
                                ? item.product.price.offerPrice
                                : item.product.price.originalPrice}
                            </p>
                            <Label className="col-start-1">Quantity</Label>
                            <p className="col-span-2">{item.quantity}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <Label>Currency</Label>
                <p className="col-span-2">
                  {row.original.orderDetails.currency}
                </p>
                <Label>Order Id</Label>
                <p className="col-span-2">
                  {row.original.orderDetails.order_id}
                </p>
                <Label>Total Amount</Label>
                <p className="col-span-2">
                  {row.original.orderDetails.totalAmount}
                </p>
                {row.original.orderDetails.email ? (
                  <>
                    <Label>Email</Label>
                    <p className="col-span-2">
                      {row.original.orderDetails.email}
                    </p>
                  </>
                ) : null}
                {row.original.orderDetails.method ? (
                  <>
                    <Label>Payment Method</Label>
                    <p className="col-span-2">
                      {row.original.orderDetails.method}
                    </p>
                  </>
                ) : null}
                {row.original.orderDetails.upi_transaction_id ? (
                  <>
                    <Label>Transaction Id</Label>
                    <p className="col-span-2">
                      {row.original.orderDetails.upi_transaction_id}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </>
    ),
  },
];
