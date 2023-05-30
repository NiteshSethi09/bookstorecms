export interface Product {
  category: string;
  description: string;
  imageUrl: string;
  onSale: boolean;
  price: {
    originalPrice: number;
    offerPrice: number;
  };
  title: string;
  _id?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}
