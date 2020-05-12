export interface Product {
  id: string;
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
type FilterOptions = "less than or equal" | "more than or equal";

type FilterValues = {
  filterOption1: FilterOptions;
  filterValue1: string | null;
  filter1By: keyof Product;
  filterOption2: FilterOptions;
  filterValue2: string | null;
  filter2By: keyof Product;
};
const evaluate = (
  filterOption: FilterOptions,
  filterValue: string,
  filterBy: keyof Product,
  row: Product
): boolean => {
  let results = {
    "less than or equal": function () {
      return row[filterBy].toLowerCase() <= filterValue.toLowerCase();
    },
    "more than or equal": function () {
      return row[filterBy].toLowerCase() >= filterValue.toLowerCase();
    },
  };
  if (row[filterBy]) return results[filterOption]();
  else return false;
};
export const filterData = (
  filterValues: FilterValues,
  rows: Product[]
): Product[] => {
  const {
    filterOption1,
    filter1By,
    filterValue1,
    filter2By,
    filterValue2,
    filterOption2,
  } = filterValues;
  if (!filterValue1 && !filterValue2) return rows;
  else if (filterValue1 && filterValue2)
    return rows.filter(
      (row: Product) =>
        evaluate(filterOption1, filterValue1, filter1By, row) &&
        evaluate(filterOption2, filterValue2, filter2By, row)
    );
  else if (filterValue1 && !filterValue2)
    return rows.filter((row: Product) =>
      evaluate(filterOption1, filterValue1, filter1By, row)
    );
  else if (!filterValue1 && filterValue2)
    return rows.filter((row: Product) =>
      evaluate(filterOption2, filterValue2, filter2By, row)
    );
  else return rows;
};
export const deleteProduct = async (id: string) => {
  await fetch(`http://localhost:3001/products/${id}`, {
    method: "DELETE",
  }).catch((error) => {
    console.error("Error:", error);
  });
};
