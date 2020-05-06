import React, { useState } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import { Category, sortData, Order, deleteCategory } from "./util";
import EditCategoryDialog from "../EditCategoryDialog/EditCategoryDialog";
import DeleteCategoryDialog from "../DeleteCategoryDialog/DeleteCategoryDialog";
import { CustomizedTableHeader } from "./CustomizedTableHeader";
import { CustomizedTableBody } from "./CustomizedTableBody";
interface Props {
  searchText: string;
  categoryData: Category[];
  onFetchCategories: () => void;
}
const CategoriesList: React.FunctionComponent<
  WithStyles<typeof styles> & Props
> = (props) => {
  let { classes, searchText, categoryData, onFetchCategories } = props;
  const [categoryName, setCategoryName] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [categoryDate, setCategoryDate] = React.useState("");
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Category>("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = React.useState<
    "create" | "edit" | "delete" | null
  >(null);
  const handleOpenDialog = (
    type: "create" | "edit" | "delete" | null,
    name: string,
    id: string,
    date?: string
  ) => {
    setCategoryName(name);
    setCategoryId(id);
    if (date) setCategoryDate(date);
    setOpenDialog(type);
  };
  const handleCloseDialog = () => {
    setOpenDialog(null);
    onFetchCategories();
  };
  const handleDeleteDialogSubmit = (id: string) => {
    deleteCategory(id).then(() => handleCloseDialog());
  };
  const handleSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Category
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const filteredData = React.useMemo(
    () =>
      categoryData.filter((category: Category) =>
        category.name
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase())
      ),
    [searchText, categoryData]
  );
  const sortedData = React.useMemo(
    () => sortData(filteredData, orderBy, order === "asc" ? true : false),
    [order, filteredData, orderBy]
  );
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
              handleClose={handleCloseDialog}
              name={categoryName}
              id={categoryId}
              setName={setCategoryName}
              date={categoryDate}
            />
            <DeleteCategoryDialog
              openDialog={openDialog === "delete" ? true : false}
              handleClose={handleCloseDialog}
              handleSubmit={handleDeleteDialogSubmit}
              name={categoryName}
              id={categoryId}
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
