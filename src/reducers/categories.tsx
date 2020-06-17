import { createReducer } from "redux-act";
import { fetchAllCategories } from "../actions";
import { Category } from "../pages/Category/util";
const reducer = createReducer<Category[]>({}, []);
reducer.on(fetchAllCategories, (state, payload: Category[]) => {
  return payload;
});
export default reducer;
