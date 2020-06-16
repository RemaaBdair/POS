import { createAction } from "redux-act";
import { Product } from "../pages/Products/util";
import { Category } from "../pages/Category/util";

export const addProduct = createAction<Product>("ADD_PRODUCT_TO_THE_CART");
export const fetchProductsResult = createAction<Product[]>(
  "FETCH_ALL_PRODUCTS_ON_SUCCESS"
);
export const fetchCategoriesResult = createAction<Category[]>(
  "FETCH_ALL_CATEGORIES_ON_SUCCESS"
);
export const incQuantity = createAction<string>("INCREMENT_PRODUCT_COUNT");
export const decQuantity = createAction<string>("DECCREMENT_PRODUCT_COUNT");
export const deleteProduct = createAction<string>("DELETE_PRODUCT_FROM_CART");
export const deleteCart = createAction("DELETE_CART");
export const pay = createAction("PAY");
