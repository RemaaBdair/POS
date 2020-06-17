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
    return {
      ...state,
      [payload.id]: {
        name: payload.name,
        price: +payload.price.slice(0, -1),
      },
    };
  }
  return state;
});
reducer.on(deleteProduct, (state, payload: string) => {
  const array = Object.keys(state);
  return array
    .filter((elem) => elem !== payload)
    .reduce((newObj, item) => {
      return { ...newObj, [item]: state[item] };
    }, {});
});
reducer.on(deleteCart, (state) => {
  return {};
});
export default reducer;
