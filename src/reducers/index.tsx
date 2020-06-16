import { combineReducers } from "redux";
import products from "./products";
import categories from "./categories";
import cart from "./cart";
import items from "./items";
export const rootReducer = combineReducers({
  allProducts: products,
  categories: categories,
  cart: cart,
  products: items,
});
