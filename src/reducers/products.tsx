import { createReducer } from "redux-act";
import { fetchProductsResult } from "../actions";
import { State, defaultState } from "../store";
import { Product } from "../pages/Products/util";

const reducer = createReducer<State>({}, defaultState);
reducer.on(fetchProductsResult, (state: State, payload: Product[]) => {
  return {
    ...state,

    products: payload,
  };
});
export default reducer;
