import React, { useState } from "react";
import { Product } from "../../util";
export const useEditProduct = () => {
  const [edittedProduct, setProduct] = useState<Product>({
    id: "",
    code: "",
    name: "",
    category: "",
    description: "",
    price: "",
    tax: "2%",
    expirationDate: new Date().toJSON().slice(0, 10),
    image: "",
    quantity: "",
    rawPrice: "",
  });
  const [isChanged, setIsChanged] = useState(false);
  const setEdittedProduct = (product: Product) => {
    setProduct(product);
    setIsChanged(true);
  };
  return { edittedProduct, isChanged, setEdittedProduct };
};
