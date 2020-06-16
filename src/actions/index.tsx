import { createAction } from "redux-act";
import { Product } from "../pages/Products/util";
import { Category } from "../pages/Category/util";

export const addProduct = createAction<Product>("add product to cart");
export const requestAllProducts = createAction("request products");
export const requestAllCategories = createAction("request categories");
export const fetchAllProducts = createAction<Product[]>(
  "fetch products success"
);
export const fetchAllCategories = createAction<Category[]>(
  "fetch categories success"
);
export const incQuantity = createAction<string>("increment product count");
export const decQuantity = createAction<string>("decrement product count");
export const deleteProduct = createAction<string>("delete product from cart");
export const deleteCart = createAction("delete cart");
export const pay = createAction("pay");
