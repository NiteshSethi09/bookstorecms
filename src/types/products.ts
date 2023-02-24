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
  _id: string;
}

export type PageLimit = "10" | "20" | "50";
