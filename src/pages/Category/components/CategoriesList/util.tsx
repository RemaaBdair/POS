import React from "react";
export interface Category {
  id: string;
  name: string;
  date: string;
}
export const fetchCategories = async (): Promise<Category[]> => {
  return await fetch("http://localhost:3001/categories")
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
};

export const deleteCategory = async (id: string) => {
  await fetch(`http://localhost:3001/categories/${id}`, {
    method: "DELETE",
  }).catch((error) => {
    console.error("Error:", error);
  });
};
export const sortTable = async (
  orderBy: keyof Category,
  ascOrder: boolean = true
) => {
  const categoriesData = await fetchCategories();
  return categoriesData.sort((a: Category, b: Category) => {
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
export const asyncSetCategoryData = async (
  setCategoryData: React.Dispatch<React.SetStateAction<Category[]>>,
  orderBy?: keyof Category,
  ascendingOrder?: boolean
) => {
  let categoryData = [];
  if (orderBy) categoryData = await sortTable(orderBy, ascendingOrder);
  else categoryData = await fetchCategories();
  setCategoryData(categoryData);
};
export const sliceEntries = (
  entries: JSX.Element[],
  entriesPerPage: number,
  currentPageNumber: number
): JSX.Element[] => {
  return entries.slice(
    currentPageNumber * entriesPerPage,
    currentPageNumber * entriesPerPage + entriesPerPage
  );
};
