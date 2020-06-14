import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "../reducers/";
import { rootSaga } from "../sagas";
import { Product } from "../pages/Products/util";
import { Category } from "../pages/Category/util";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
export interface State {
  items: Product[];
  products: Product[];
  categories: Category[];
}
export const defaultState = {
  items: [],
  products: [],
  categories: [],
};
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
store.dispatch({ type: "FETCH_ALL_PRODUCTS_REQUEST" });
store.dispatch({ type: "FETCH_ALL_CATEGORIES_REQUEST" });
export default store;
