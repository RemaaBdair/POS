import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from "@material-ui/icons/Description";
import { Product } from "./util";
import { WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
interface BodyProps {
  page: number;
  rowsPerPage: number;
  productData: Product[];
  onOpenDialog: (
    type: "details" | "edit" | "delete" | null,
    name: string,
    id: string,
    element: Product
  ) => void;
}

export const CustomizedTableBody: React.FunctionComponent<
  WithStyles<typeof styles> & BodyProps
> = (props) => {
  const { classes, rowsPerPage, page, productData, onOpenDialog } = props;

  if (productData.length === 0) {
    return (
      <TableRow key="noMatch">
        <TableCell colSpan={8}>No Matching</TableCell>
      </TableRow>
    );
  }
  return (
    <>
      {productData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((product: Product) => {
          const {
            id,
            code,
            name,
            category,
            description,
            price,
            tax,
            expirationDate,
          } = product;
          return (
            <TableRow key={id}>
              <TableCell align="left">{code}</TableCell>
              <TableCell align="left">{name}</TableCell>
              <TableCell align="left">{category}</TableCell>
              <TableCell align="left">{description}</TableCell>
              <TableCell align="left">{price}</TableCell>
              <TableCell align="left">{tax}</TableCell>
              <TableCell align="left">{expirationDate}</TableCell>
              <TableCell align="left">
                <IconButton
                  edge={false}
                  classes={{ root: classes.iconButton }}
                  aria-label="Edit Product"
                  aria-haspopup="true"
                  color="primary"
                  onClick={() => onOpenDialog("edit", name, id, product)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  classes={{ root: classes.iconButton }}
                  edge={false}
                  aria-label="Delete Product"
                  aria-haspopup="true"
                  color="primary"
                  onClick={() => onOpenDialog("delete", name, id, product)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton
                  classes={{ root: classes.iconButton }}
                  edge={false}
                  aria-label="View Details"
                  aria-haspopup="true"
                  color="primary"
                  onClick={() => {}}
                >
                  <DescriptionIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
    </>
  );
};
