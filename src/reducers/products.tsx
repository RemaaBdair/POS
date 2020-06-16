import { createReducer } from "redux-act";
import { fetchAllProducts } from "../actions";
import { Product } from "../pages/Products/util";

const reducer = createReducer<Product[]>({}, []);
reducer.on(fetchAllProducts, (state, payload: Product[]) => {
  return payload;
});

export default reducer;
