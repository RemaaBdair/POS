import { isBefore, isAfter } from "date-fns/esm";

export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  price: string;
  tax: string;
  expirationDate: string;
  image: string;
  quantity: string;
  rawPrice: string;
}
export type Order = "asc" | "desc";
export const sortData = (
  productData: Product[],
  orderBy: keyof Product,
  ascOrder: boolean = true
): Product[] => {
  return productData.sort((a: Product, b: Product) => {
    let operand = a[orderBy].split(orderBy === "price" ? "$" : "%");
    let operand2 = b[orderBy].split(orderBy === "price" ? "$" : "%");
    if (ascOrder)
      return (/\d/.test(operand[0])
        ? +operand[0].toLocaleLowerCase()
        : operand[0].toLocaleLowerCase()) >
        (/\d/.test(operand2[0])
          ? +operand2[0].toLocaleLowerCase()
          : operand2[0].toLocaleLowerCase())
        ? 1
        : -1;
    else
      return (/\d/.test(operand[0])
        ? +operand[0].toLocaleLowerCase()
        : operand[0].toLocaleLowerCase()) <
        (/\d/.test(operand2[0])
          ? +operand2[0].toLocaleLowerCase()
          : operand2[0].toLocaleLowerCase())
        ? 1
        : -1;
  });
};
type FilterOptions = "less than or equal" | "more than or equal";
interface Filter {
  option: FilterOptions;
  value: string | Date | null;
  key: keyof Product;
}
const evaluate = (
  option: FilterOptions,
  value: string | Date | null,
  key: keyof Product,
  row: Product
): boolean => {
  let results = {
    "less than or equal": function () {
      return value instanceof Date
        ? isBefore(new Date(row[key]), value)
        : value
        ? row[key].toLowerCase() <= value.toLowerCase()
        : true;
    },
    "more than or equal": function () {
      return value instanceof Date
        ? isAfter(new Date(row[key]), value)
        : value
        ? row[key].toLowerCase() >= value.toLowerCase()
        : true;
    },
  };
  if (row[key]) return results[option]();
  else return false;
};
export const filterData = (
  filterValues: Filter[],
  rows: Product[]
): Product[] => {
  const operand1 = rows.filter((row: Product) =>
    evaluate(
      filterValues[0].option,
      filterValues[0].value,
      filterValues[0].key,
      row
    )
  );
  const operand2 = rows.filter((row: Product) =>
    evaluate(
      filterValues[1].option,
      filterValues[1].value,
      filterValues[1].key,
      row
    )
  );
  return operand1.filter((value) => operand2.includes(value));
};
