import { createReducer } from "redux-act";
import {
  addItem,
  fetchProductsResult,
  fetchCategoriesResult,
} from "../actions";
import { Product } from "../pages/Products/util";
import { Category } from "../pages/Category/util";

export interface State {
  items: Product[];
  products: Product[];
  categories: Category[];
}
const defaultState = {
  items: [],
  products: [],
  categories: [],
};

const reducer = createReducer<State>({}, defaultState);

reducer.on(addItem, (state, payload) => ({
  ...state,

  items: [...state.items, payload],
}));
reducer.on(fetchProductsResult, (state: State, payload: Product[]) => {
  return {
    ...state,

    products: payload,
  };
});
reducer.on(fetchCategoriesResult, (state: State, payload: Category[]) => {
  return {
    ...state,

    categories: payload,
  };
});
export default reducer;
