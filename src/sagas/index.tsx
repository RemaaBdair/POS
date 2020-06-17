import { takeLatest } from "redux-saga/effects";
import { fetchProductList } from "./products";
import { fetchCategoryList } from "./categories";
import { doPaymentFn } from "./payment";
import { requestAllProducts, requestAllCategories, pay } from "../actions";
export function* rootSaga() {
  yield takeLatest(requestAllProducts, fetchProductList);
  yield takeLatest(requestAllCategories, fetchCategoryList);
  yield takeLatest(pay, doPaymentFn);
}
