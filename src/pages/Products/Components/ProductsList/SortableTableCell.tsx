import React from "react";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";
import { Product } from "../../util";
import { SortTableContext } from "./context";
export const SortableTableCell: React.FunctionComponent<{
  id: keyof Product;
  label: string;
}> = ({ id, label }) => {
  const { order, orderBy, handleSort } = React.useContext(SortTableContext);
  const createSortHandler = (property: keyof Product) => (
    event: React.MouseEvent<unknown>
  ) => {
    handleSort(event, property);
  };
  return (
    <TableCell align="left" key={id}>
      <TableSortLabel
        active={orderBy === id}
        direction={orderBy === id ? order : "asc"}
        onClick={createSortHandler(id)}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );
};
