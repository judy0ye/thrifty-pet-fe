interface PriceHistoryItem {
  price: number;
  date: Date;
};

interface Product {
  _id: string;
  url: string;
  image: string;
  title: string;
  currentPrice: number;
  originalPrice: number | null;
  miscInfo: string[] | [];
  default: any[]; 
  priceHistory: PriceHistoryItem[]; 
  users: any[]; 
  createdAt: string; 
  updatedAt: string;
  __v: number;
};

export interface ProductType {
  products: Product[];
};
