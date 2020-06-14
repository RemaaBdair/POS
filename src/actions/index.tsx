import { createAction } from "redux-act";
import { Product } from "../pages/Products/util";
import { Category } from "../pages/Category/util";

export const addItem = createAction<Product>("add item to the cart");
export const fetchProductsResult = createAction<Product[]>(
  "FETCH_ALL_PRODUCTS_ON_SUCCESS"
);
export const fetchCategoriesResult = createAction<Category[]>(
  "FETCH_ALL_CATEGORIES_ON_SUCCESS"
);
