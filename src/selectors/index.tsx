import { State } from "../store";

export const selectProducts = (state: State) => state.products;
export const selectCategories = (state: State) => state.categories;
export const selectItems = (state: State) => state.items;
