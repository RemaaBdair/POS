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
interface Filter {
  option: FilterOptions;
  value: string | null;
  key: keyof Product;
}
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
  filterValues: Filter[],
  rows: Product[]
): Product[] => {
  if (!filterValues[0].value && !filterValues[1].value) return rows;
  else if (filterValues[0].value && filterValues[1].value)
    return rows.filter(
      (row: Product) =>
        evaluate(
          filterValues[0].option,
          filterValues[0].value,
          filterValues[0].key,
          row
        ) &&
        evaluate(
          filterValues[1].option,
          filterValues[1].value,
          filterValues[1].key,
          row
        )
    );
  else if (filterValues[0].value && !filterValues[1].value)
    return rows.filter((row: Product) =>
      evaluate(
        filterValues[0].option,
        filterValues[0].value,
        filterValues[0].key,
        row
      )
    );
  else if (!filterValues[0].value && !filterValues[1].value)
    return rows.filter((row: Product) =>
      evaluate(
        filterValues[1].option,
        filterValues[1].value,
        filterValues[1].key,
        row
      )
    );
  else return rows;
};