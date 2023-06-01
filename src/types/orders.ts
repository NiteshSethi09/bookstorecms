export interface Order {
  _id: string;
  user: {
    name: string;
    userId: string;
  };
  orderDetails: {
    order_id: string;
    totalAmount: number;
    currency: string;
    email?: string;
    method?: string;
    upi_transaction_id?: string;
  };
  items: {
    product: {
      price: {
        originalPrice: number;
        offerPrice: number;
      };
      role: string;
      _id: string;
      title: string;
      imageUrl: string;
      description: string;
      onSale: boolean;
      category: string;
    };
    quantity: number;
    _id: string;
  }[];
  orderPlacedDate: string;
}
