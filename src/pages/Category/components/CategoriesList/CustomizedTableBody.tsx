import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Category } from "./util";
import { WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
interface BodyProps {
  categoryData: Category[];
  page: number;
  rowsPerPage: number;
  openEditDialog: (name: string, id: string, date: string) => void;
  openDeleteDialog: (name: string, id: string) => void;
  searchText?: string;
  setRowsLength: React.Dispatch<React.SetStateAction<number>>;
}

export const CustomizedTableBody: React.FunctionComponent<
  WithStyles<typeof styles> & BodyProps
> = (props) => {
  const {
    classes,
    rowsPerPage,
    page,
    categoryData,
    openEditDialog,
    openDeleteDialog,
    searchText = "",
    setRowsLength,
  } = props;
  let rows = categoryData.filter((category: Category) =>
    category.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  );
  setRowsLength(rows.length);
  if (rows.length !== 0) {
    return (
      <>
        {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((category: Category) => {
            const { id, name, date } = category;
            return (
              <TableRow key={id}>
                <TableCell align="left">{name}</TableCell>
                <TableCell align="left">{date}</TableCell>
                <TableCell align="left">
                  <IconButton
                    edge={false}
                    classes={{ root: classes.iconButton }}
                    aria-label="Edit Category"
                    aria-haspopup="true"
                    color="primary"
                    onClick={() => openEditDialog(name, id, date)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    classes={{ root: classes.iconButton }}
                    edge={false}
                    aria-label="Delete Category"
                    aria-haspopup="true"
                    color="primary"
                    onClick={() => openDeleteDialog(name, id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
      </>
    );
  } else
    return (
      <TableRow key="noMatch">
        <TableCell colSpan={3}>No Matching</TableCell>
      </TableRow>
    );
};
