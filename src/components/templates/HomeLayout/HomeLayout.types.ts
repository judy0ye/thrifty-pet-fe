import { PetProduct } from "@/pages/types";
import { ReactNode } from "react";

export interface HomeLayoutTypes {
  children: ReactNode;
  addProduct: (newProduct: PetProduct) => void;
}