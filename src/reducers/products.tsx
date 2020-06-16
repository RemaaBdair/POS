import { createReducer } from "redux-act";
import { fetchProductsResult } from "../actions";
import { State, defaultState } from "../store/state";
import { Product } from "../pages/Products/util";

const reducer = createReducer<Product[]>({}, []);
reducer.on(fetchProductsResult, (state, payload: Product[]) => {
  return payload;
});

export default reducer;
