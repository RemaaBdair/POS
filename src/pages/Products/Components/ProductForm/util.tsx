import { fetchProducts } from "../../api";
export const validateName = (name: string): string => {
  if (!name) return "Name can't be empy!";
  return "";
};
export const validatePrice = (price: string, rawPrice: string): string => {
  price = price.slice(0, -1);
  if (!price) return "Price can't be empy!";
  else if (isNaN(+price)) return "Price must be a number!";
  else if (+price <= 0) return "Price must be more than 0!";
  else if (+price <= +rawPrice) return "Price must be more than the raw price!";
  return "";
};
export const validateRawPrice = (rawPrice: string): string => {
  if (!rawPrice) return "Raw price can't be empy!";
  else if (isNaN(+rawPrice.slice(0, -1))) return "Raw Price must be a number!";
  return "";
};
const validateUniqueCode = async (
  code: string,
  id: string
): Promise<boolean> => {
  return fetchProducts().then((products) => {
    for (let elem of products) {
      if (elem.code === code && elem.id !== id) return true;
    }
    return false;
  });
};
export const validateCode = async (code: string, id: string) => {
  let result: boolean = false;
  if (!code) return "Code can't be empy!";
  result = await validateUniqueCode(code, id);
  if (result) return "This code is already used. Try another one!";
  if (!code.match(/^([a-zA-Z0-9]+)$/))
    return "Code contains alphabets and numbers only.";
  return "";
};
export const validateCategory = (category: string): string => {
  if (!category) return "Category can't be empy!";
  return "";
};
export const validateQuantity = (quantity: string): string => {
  if (!quantity) return "Stock count can't be empy!";
  else if (!/^\d+$/.test(quantity)) return "Stock count must be a number";
  return "";
};
export const validateExpirationDate = (expirationDate: string): string => {
  if (!expirationDate) return "";
  const todaysDate = new Date();
  if (expirationDate < todaysDate.toJSON().slice(0, 10))
    return "Expiration date can't be less than todays date";
  return "";
};
