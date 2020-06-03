export interface Category {
  id: string;
  name: string;
  date: string;
}
export type Order = "asc" | "desc";
export const sortData = (
  categoryData: Category[],
  orderBy: keyof Category,
  ascOrder: boolean = true
): Category[] => {
  return categoryData.sort((a: Category, b: Category) => {
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
