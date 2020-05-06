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
  onOpenDialog: (
    type: "create" | "edit" | "delete" | null,
    name: string,
    id: string,
    date?: string
  ) => void;
}

export const CustomizedTableBody: React.FunctionComponent<
  WithStyles<typeof styles> & BodyProps
> = (props) => {
  const { classes, rowsPerPage, page, categoryData, onOpenDialog } = props;
  if (categoryData.length === 0) {
    return (
      <TableRow key="noMatch">
        <TableCell colSpan={3}>No Matching</TableCell>
      </TableRow>
    );
  } else {
    return (
      <>
        {categoryData
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
                    onClick={() => onOpenDialog("edit", name, id, date)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    classes={{ root: classes.iconButton }}
                    edge={false}
                    aria-label="Delete Category"
                    aria-haspopup="true"
                    color="primary"
                    onClick={() => onOpenDialog("delete", name, id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
      </>
    );
  }
};
