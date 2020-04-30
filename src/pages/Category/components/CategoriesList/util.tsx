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
export const editCategory = async (
  id: string,
  newName: string,
  date: string
): Promise<string> => {
  return await fetch(`http://localhost:3001/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: `${newName}`, date: `${date}` }),
  })
    .then(() => "success")
    .catch(() => "failed");
};
export const createCategory = async (name: string): Promise<string> => {
  const currentdate = new Date();
  const date = [
    currentdate.getFullYear(),
    ("0" + (currentdate.getMonth() + 1)).slice(-2),
    ("0" + currentdate.getDate()).slice(-2),
  ].join("-");
  const time = [
    ("0" + currentdate.getHours()).slice(-2),
    ("0" + currentdate.getMinutes()).slice(-2),
    ("0" + currentdate.getSeconds()).slice(-2),
  ].join(":");
  const formatedDate = date + " " + time;
  return await fetch(`http://localhost:3001/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: `${name}`, date: `${formatedDate}` }),
  })
    .then(() => "success")
    .catch(() => "failed");
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
