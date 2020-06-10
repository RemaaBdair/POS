import { useState } from "react";
import { Product } from "../util";
const useDetailsDialog = () => {
  const [product, setproduct] = useState<Product>({} as any);
  const handleOpenDetailsDialog = (product: Product) => {
    setproduct(product);
  };
  return {
    product,
    handleOpenDetailsDialog,
  };
};
export default useDetailsDialog;
