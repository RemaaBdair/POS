import { createReducer } from "redux-act";
import { fetchCategoriesResult } from "../actions";
import { Category } from "../pages/Category/util";
const reducer = createReducer<Category[]>({}, []);
reducer.on(fetchCategoriesResult, (state, payload: Category[]) => {
  return payload;
});
export default reducer;
