import { createReducer } from "redux-act";
import { addProduct, deleteProduct, deleteCart } from "../actions";
import { Product } from "../pages/Products/util";

interface state {
  [id: string]: { price: number; name: string };
}
const reducer = createReducer<state>({}, {} as any);
reducer.on(addProduct, (state, payload: Product) => {
  let isFound: boolean = false;
  for (let x in state) {
    if (x === payload.id) {
      isFound = true;
    }
  }
  if (!isFound) {
    state[payload.id] = {
      name: payload.name,
      price: +payload.price.slice(0, -1),
    };
  }

  return state;
});
reducer.on(deleteProduct, (state, payload: string) => {
  const products = state;
  for (let x in products) {
    if (x === payload) delete products[x];
  }
  return products;
});
reducer.on(deleteCart, (state) => {
  return [] as any;
});
export default reducer;
