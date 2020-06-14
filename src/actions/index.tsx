import { createAction } from "redux-act";
import { Product } from "../pages/Products/util";
export const addItem = createAction<Product>("add item to the cart");
export const fetchProductsResult = createAction(
  "FETCH_ALL_PRODUCTS_ON_SUCCESS"
);
export const fetchCategoriesResult = createAction(
  "FETCH_ALL_CATEGORIES_ON_SUCCESS"
);
