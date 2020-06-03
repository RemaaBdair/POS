import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { SortableTableCell } from "./SortableTableCell";
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
