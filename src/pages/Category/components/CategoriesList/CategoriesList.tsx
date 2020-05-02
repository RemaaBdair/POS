import React, { useEffect, useState } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { styles } from "./styles";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Category, asyncSetCategoryData } from "./util";
import EditCategoryDialog from "../EditCategoryDialog/EditCategoryDialog";
import DeleteCategoryDialog from "../DeleteCategoryDialog/DeleteCategoryDialog";
interface Props {
  searchText: string;
  refresh: boolean;
}
type Order = "asc" | "desc";
interface HeaderProps {
  order: Order;
  orderBy: keyof Category;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Category
  ) => void;
}
interface BodyProps {
  categoryData: Category[];
  page: number;
  rowsPerPage: number;
  openEditDialog: (name: string, id: string, date: string) => void;
  openDeleteDialog: (name: string, id: string) => void;
  searchText?: string;
  setRowsLength: React.Dispatch<React.SetStateAction<number>>;
}
const TableHeader: React.FunctionComponent<HeaderProps> = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Category) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" key="name">
          <TableSortLabel
            active={orderBy === "name"}
            direction={orderBy === "name" ? order : "asc"}
            onClick={createSortHandler("name")}
          ></TableSortLabel>
          Category Name
        </TableCell>

        <TableCell align="left" key="date">
          <TableSortLabel
            active={orderBy === "date"}
            direction={orderBy === "date" ? order : "asc"}
            onClick={createSortHandler("date")}
          >
            Created At
          </TableSortLabel>
        </TableCell>

        <TableCell align="left" key="action">
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const CustomizedTableBody: React.FunctionComponent<
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
          <TableHeader
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
