import { combineReducers } from "redux";
import products from "./products";
import categories from "./categories";
import items from "./items";

export const rootReducer = combineReducers({ products, categories, items });
