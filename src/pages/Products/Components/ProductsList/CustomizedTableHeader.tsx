import React from "react";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Product, Order } from "./util";

interface HeaderProps {
  order: Order;
  orderBy: keyof Product;
  onSort: (event: React.MouseEvent<unknown>, property: keyof Product) => void;
}
const headerLabels: { label: string; id: keyof Product }[] = [
  { label: "Code", id: "code" },
  { label: "Name", id: "name" },
  { label: "Category", id: "category" },
  { label: "Product Description", id: "description" },
  { label: "Price", id: "price" },
  { label: "Tax", id: "tax" },
  { label: "Expiration Date", id: "expirationDate" },
];
export const CustomizedTableHeader: React.FunctionComponent<HeaderProps> = (
  props
) => {
  const { order, orderBy, onSort } = props;
  const createSortHandler = (property: keyof Product) => (
    event: React.MouseEvent<unknown>
  ) => {
    onSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headerLabels.map((elem) => {
          const { id, label } = elem;
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
        })}
        <TableCell align="left" key="action">
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
