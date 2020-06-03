import { Product } from "./util";
export const fetchProducts = async (): Promise<Product[]> => {
  return await fetch("http://localhost:3001/products")
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
};
export const deleteProduct = async (id: string) => {
  await fetch(`http://localhost:3001/products/${id}`, {
    method: "DELETE",
  }).catch((error) => {
    console.error("Error:", error);
  });
};
export const editProduct = async (product: Product): Promise<string> => {
  const { id } = product;
  return await fetch(`http://localhost:3001/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...product,
      expirationDate: product.expirationDate.slice(0, 10),
    }),
  })
    .then(() => "success")
    .catch(() => "failed");
};
