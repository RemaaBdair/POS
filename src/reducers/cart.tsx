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
  let isFound: boolean = false;
  const filteredProducts = state.products.filter((elem) => {
    if (elem.id === payload.id) {
      elem.quantity += 1;
      isFound = true;
    }
    return elem;
  });

  if (!isFound) {
    return {
      ...state,
      products: [...state.products, { id: payload.id, quantity: 1 }],
    };
  } else
    return {
      ...state,

      products: filteredProducts,
    };
});

reducer.on(incQuantity, (state, payload: string) => {
  const filteredProducts = state.products.filter((elem) => {
    if (elem.id === payload) {
      elem.quantity += 1;
    }
    return elem;
  });

  return {
    ...state,

    products: filteredProducts,
  };
});

reducer.on(decQuantity, (state, payload: string) => {
  const filteredProducts = state.products.filter((elem) => {
    if (elem.id === payload && elem.quantity > 1) {
      elem.quantity -= 1;
    }
    return elem;
  });

  return {
    ...state,

    products: filteredProducts,
  };
});
reducer.on(deleteProduct, (state, payload: string) => {
  const filteredProducts = state.products.filter((elem) => elem.id !== payload);
  return {
    ...state,

    products: filteredProducts,
  };
});
reducer.on(deleteCart, (state) => {
  return {
    products: [],
  };
});
export default reducer;
