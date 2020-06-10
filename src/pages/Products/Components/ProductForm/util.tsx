import { Product } from "../../util";
export const validateUniqueCode = (
  code: string,
  id: string,
  products: Product[]
): boolean => {
  for (let elem of products) {
    if (elem.code === code && elem.id !== id) return true;
  }
  return false;
};
