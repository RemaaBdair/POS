import React, { useState } from "react";
import { Order } from "../pages/Products/Components/ProductsList/util";
const useSort = <T,>(
  defaultOrderBy: keyof T,
  data: T[],
  sortData: (productData: T[], orderBy: keyof T, ascOrder: boolean) => T[]
) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof T>(defaultOrderBy);
  const handleSort = (event: React.MouseEvent<unknown>, property: keyof T) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const sortedData = React.useMemo(
    () => sortData(data, orderBy, order === "asc" ? true : false),
    [sortData, data, orderBy, order]
  );

  return { order, orderBy, sortedData, handleSort };
};
export default useSort;
