export interface Product {
  code: string;
  name: string;
  category: string;
  description: string;
  price: string;
  tax: string;
  expirationDate: string;
}
export type Order = "asc" | "desc";
export const fetchProducts = async (): Promise<Product[]> => {
  return await fetch("http://localhost:3001/products")
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
};
export const sortData = (
  productData: Product[],
  orderBy: keyof Product,
  ascOrder: boolean = true
): Product[] => {
  return productData.sort((a: Product, b: Product) => {
    if (ascOrder)
      return a[orderBy].toLocaleLowerCase() > b[orderBy].toLocaleLowerCase()
        ? 1
        : -1;
    else
      return a[orderBy].toLocaleLowerCase() < b[orderBy].toLocaleLowerCase()
        ? 1
        : -1;
  });
};
