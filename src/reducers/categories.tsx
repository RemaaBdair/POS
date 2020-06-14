import { createReducer } from "redux-act";
import { fetchCategoriesResult } from "../actions";
import { State, defaultState } from "../store";
import { Category } from "../pages/Category/util";
const reducer = createReducer<State>({}, defaultState);
reducer.on(fetchCategoriesResult, (state: State, payload: Category[]) => {
  return {
    ...state,

    categories: payload,
  };
});
export default reducer;
