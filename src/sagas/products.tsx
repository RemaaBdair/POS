import { call, put } from "redux-saga/effects";
import { Product } from "../pages/Products/util";
import { fetchProductsResult } from "../actions";
import { fetchProducts } from "../pages/Products/api";
export const api = (url: string) =>
  fetch(url).then((response) => response.json());
export function* fetchProductList() {
  try {
    const products: Product[] = yield call(fetchProducts);
    yield put(fetchProductsResult(products));
  } catch (e) {
    console.log(e);
  }
}
