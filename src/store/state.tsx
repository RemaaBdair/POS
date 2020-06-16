import { Product } from "../pages/Products/util";
import { Category } from "../pages/Category/util";
export interface CartProduct {
  id: string;
  quantity: number;
}

export interface Cart {
  products: CartProduct[];
}

export interface State {
  cart: Cart;
  products: { [id: string]: { price: number; name: string } };
  allProducts: Product[];
  categories: Category[];
}
export const defaultState = {
  cart: { products: [] },
  products: {},
  allProducts: [],
  categories: [],
};
