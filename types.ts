import { ReactNode } from "react";

interface PriceHistoryItem {
  price: number;
  date: Date;
};

export interface PetProduct {
  _id: string;
  url: string;
  image: string;
  title: string;
  currentPrice: number;
  originalPrice?: number | null;
  miscInfo: string[];
  priceHistory: PriceHistoryItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  averagePrice?: number;
  highestPrice?: number;
  lowestPrice?: number;
}

export interface LayoutSwitcherType {
  children: ReactNode;
  addProduct: (newProduct: PetProduct) => void;
}
