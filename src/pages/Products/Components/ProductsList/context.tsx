import React from "react";
import { Product, Order } from "../../util";

export const SortTableContext = React.createContext<{
  order: Order;
  orderBy: keyof Product;
  handleSort: (
    event: React.MouseEvent<unknown, MouseEvent>,
    property: keyof Product
  ) => void;
}>({ order: "asc", orderBy: "code", handleSort: () => {} });
