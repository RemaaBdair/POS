import { createReducer } from "redux-act";
import { addItem } from "../actions";
import { State, defaultState } from "../store";

const reducer = createReducer<State>({}, defaultState);
reducer.on(addItem, (state, payload) => ({
  ...state,

  items: [...state.items, payload],
}));

export default reducer;
