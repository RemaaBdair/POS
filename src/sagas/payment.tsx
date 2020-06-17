import { call, put } from "redux-saga/effects";
import { doPayment } from "../pages/POS/api";

export function* doPaymentFn() {
  try {
    yield call(doPayment);
  } catch (e) {
    console.log(e);
  }
}
