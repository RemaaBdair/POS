import React from "react";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Product } from "../../util";
import { SortTableContext } from "./ProductsList";
const SortableTableCell: React.FunctionComponent<{
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
export const CustomizedTableHeader: React.FunctionComponent = () => {
  return (
    <TableHead>
      <TableRow>
        <SortableTableCell id="code" label="Code" />
        <SortableTableCell id="name" label="Name" />
        <SortableTableCell id="category" label="Category" />
        <SortableTableCell id="description" label="Product Description" />
        <SortableTableCell id="price" label="Price" />
        <SortableTableCell id="tax" label="Tax" />
        <SortableTableCell id="expirationDate" label="Expiration Date" />
        <TableCell align="left" key="action">
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
