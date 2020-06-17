import { createSelector } from "reselect";
import { State, CartProduct, Cart } from "../store/state";
import { Product } from "../pages/Products/util";
import { Category } from "../pages/Category/util";
export const selectProducts = (state: State) => state.products;
export const selectCartProducts = (state: State): CartProduct[] => {
  return state.cart.products;
};
export const selectAllProducts = (state: State): Product[] => {
  return state.allProducts;
};
export const selectCategories = (state: State): Category[] => {
  return state.categories;
};
export const selectCart = (state: State): Cart => state.cart;
export const selectSubTotal = createSelector(
  selectProducts,
  selectCartProducts,
  (products, cart) =>
    cart
      .map(({ id, quantity }) => products[id].price * quantity)
      .reduce((acc, x) => x + acc, 0)
);
