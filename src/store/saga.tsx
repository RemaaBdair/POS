import { call, put, takeEvery } from "redux-saga/effects";
import { Product } from "../pages/Products/util";
import { Category } from "../pages/Category/util";
export const api = (url: string) =>
  fetch(url).then((response) => response.json());
export function* fetchProducts() {
  try {
    const products: Product[] = yield call(
      api,
      "http://localhost:3001/products"
    );
    yield put({
      type: "FETCH_ALL_PRODUCTS_ON_SUCCESS",
      payload: products,
    });
  } catch (e) {
    console.log(e);
  }
}
export function* fetchCategories() {
  try {
    const categories: Category[] = yield call(
      api,
      "http://localhost:3001/categories"
    );
    yield put({
      type: "FETCH_ALL_CATEGORIES_ON_SUCCESS",
      payload: categories,
    });
  } catch (e) {
    console.log(e);
  }
}
export function* rootSaga() {
  yield takeEvery("FETCH_ALL_PRODUCTS_REQUEST", fetchProducts);
  yield takeEvery("FETCH_ALL_CATEGORIES_REQUEST", fetchCategories);
}
