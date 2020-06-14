import { call, put } from "redux-saga/effects";
import { Category } from "../pages/Category/util";
import { fetchCategories } from "../pages/Category/api";
import { fetchCategoriesResult } from "../actions";

export function* fetchCategoryList() {
  try {
    const categories: Category[] = yield call(fetchCategories);
    yield put(fetchCategoriesResult(categories));
  } catch (e) {
    console.log(e);
  }
}
