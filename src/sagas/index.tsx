import { takeLatest } from "redux-saga/effects";
import { fetchProductList } from "./products";
import { fetchCategoryList } from "./categories";
import { doPaymentFn } from "./payment";
export function* rootSaga() {
  yield takeLatest("FETCH_ALL_PRODUCTS_REQUEST", fetchProductList);
  yield takeLatest("FETCH_ALL_CATEGORIES_REQUEST", fetchCategoryList);
  yield takeLatest("PAY", doPaymentFn);
}
