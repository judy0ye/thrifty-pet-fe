import { PetProduct } from "../../../types";
import { ReactNode } from "react";

export interface HomeLayoutTypes {
  children: ReactNode;
  addProduct: (newProduct: PetProduct) => void;
}