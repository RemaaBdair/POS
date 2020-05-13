import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import { Category, sortData } from "../../util";
import { deleteCategory } from "../../api";
import EditCategoryDialog from "../EditCategoryDialog/EditCategoryDialog";
import DeleteDialog from "../../../../Components/DeleteDialog/DeleteDialog";
import { CustomizedTableHeader } from "./CustomizedTableHeader";
import { CustomizedTableBody } from "./CustomizedTableBody";
import useSort from "../../../../hooks/useSort";
import usePagination from "../../../../hooks/usePagination";
import useSearch from "../../../../hooks/useSearch";
import useDialog from "../../../../hooks/useDialog";
interface Props {
  searchText: string;
  categoryData: Category[];
  onFetchCategories: () => void;
}
const CategoriesList: React.FunctionComponent<
  WithStyles<typeof styles> & Props
> = (props) => {
  let { classes, searchText, categoryData, onFetchCategories } = props;
  const [result] = useSearch(categoryData, searchText);
  const { order, orderBy, sortedData, handleSort } = useSort<Category>(
    "name",
    result,
    sortData
  );
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(5);
  type dialogTypes = "edit" | "delete";
  const {
    name,
    id,
    element,
    openDialog,
    setName,
    handleOpenDialog,
    handleCloseDialog,
    handleDeleteSubmit,
  } = useDialog<Category, dialogTypes>(deleteCategory, onFetchCategories);
  return (
    <div className={classes.root}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="Category Table"
          size="small"
        >
          <CustomizedTableHeader
            order={order}
            orderBy={orderBy}
            onSort={handleSort}
          />

          <TableBody>
            <CustomizedTableBody
              classes={classes}
              page={page}
              rowsPerPage={rowsPerPage}
              onOpenDialog={handleOpenDialog}
              categoryData={sortedData}
            />

            <EditCategoryDialog
              openDialog={openDialog === "edit" ? true : false}
              onClose={handleCloseDialog}
              name={name}
              setName={setName}
              category={element}
            />
            <DeleteDialog
              openDialog={openDialog === "delete" ? true : false}
              onClose={handleCloseDialog}
              onSubmit={handleDeleteSubmit}
              name={name}
              id={id}
              label="Category"
            />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 25, 50, 100]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default withStyles(styles)(CategoriesList);
