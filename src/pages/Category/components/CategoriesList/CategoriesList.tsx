import React, { useEffect, useState } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import { Category, asyncSetCategoryData, Order } from "./util";
import EditCategoryDialog from "../EditCategoryDialog/EditCategoryDialog";
import DeleteCategoryDialog from "../DeleteCategoryDialog/DeleteCategoryDialog";
import { CustomizedTableHeader } from "./CustomizedTableHeader";
import { CustomizedTableBody } from "./CustomizedTableBody";
interface Props {
  searchText: string;
  refresh: boolean;
}
const CategoriesList: React.FunctionComponent<
  WithStyles<typeof styles> & Props
> = (props) => {
  let { classes, searchText, refresh } = props;
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [categoryDate, setCategoryDate] = React.useState("");
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Category>("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [rowsLength, setRowsLength] = useState(categoryData.length);
  const handleOpenEditDialog = (name: string, id: string, date: string) => {
    setCategoryName(name);
    setCategoryId(id);
    setCategoryDate(date);
    setOpenEditDialog(true);
  };
  const handleOpenDeleteDialog = (name: string, id: string) => {
    setCategoryName(name);
    setCategoryId(id);
    setOpenDeleteDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    asyncSetCategoryData(
      setCategoryData,
      orderBy,
      order === "asc" ? true : false
    );
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    asyncSetCategoryData(
      setCategoryData,
      orderBy,
      order === "asc" ? true : false
    );
  };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Category
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    asyncSetCategoryData(setCategoryData);
  }, []);
  useEffect(() => {
    asyncSetCategoryData(
      setCategoryData,
      orderBy,
      order === "asc" ? true : false
    );
  }, [order, orderBy, refresh]);
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
            onRequestSort={handleRequestSort}
          />

          <TableBody>
            <CustomizedTableBody
              classes={classes}
              page={page}
              rowsPerPage={rowsPerPage}
              openDeleteDialog={handleOpenDeleteDialog}
              openEditDialog={handleOpenEditDialog}
              categoryData={categoryData}
              searchText={searchText}
              setRowsLength={setRowsLength}
            />

            <EditCategoryDialog
              openDialog={openEditDialog}
              handleClose={handleCloseEditDialog}
              name={categoryName}
              id={categoryId}
              setName={setCategoryName}
              date={categoryDate}
            />
            <DeleteCategoryDialog
              openDialog={openDeleteDialog}
              handleClose={handleCloseDeleteDialog}
              name={categoryName}
              id={categoryId}
            />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 25, 50, 100]}
        component="div"
        count={rowsLength}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default withStyles(styles)(CategoriesList);
