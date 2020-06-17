import { createReducer } from "redux-act";
import {
  addProduct,
  incQuantity,
  decQuantity,
  deleteProduct,
  deleteCart,
} from "../actions";
import { Cart } from "../store/state";
import { Product } from "../pages/Products/util";

const defualtState = {
  products: [],
};
const reducer = createReducer<Cart>({}, defualtState as any);
reducer.on(addProduct, (state, payload: Product) => {
  let found: boolean = false;
  const newArray = state.products.map((item) => {
    if (item.id === payload.id) {
      found = true;
      return {
        ...item,
        quantity: item.quantity + 1,
      };
    } else return item;
  });
  return {
    products: found
      ? [...newArray]
      : [...newArray, { id: payload.id, quantity: 1 }],
  };
});

reducer.on(incQuantity, (state, payload: string) => {
  const newArray = state.products.map((item) => {
    if (item.id === payload) {
      return {
        ...item,
        quantity: item.quantity + 1,
      };
    } else return item;
  });
  return { products: newArray };
});

reducer.on(decQuantity, (state, payload: string) => {
  const newArray = state.products.map((item) => {
    if (item.id === payload && item.quantity > 1) {
      return {
        ...item,
        quantity: item.quantity - 1,
      };
    } else return item;
  });
  return { products: newArray };
});
reducer.on(deleteProduct, (state, payload: string) => {
  const filteredProducts = state.products.filter((elem) => elem.id !== payload);
  return {
    ...state,

    products: filteredProducts,
  };
});
reducer.on(deleteCart, () => {
  return {
    products: [],
  };
});
export default reducer;
