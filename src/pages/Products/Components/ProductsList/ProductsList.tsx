import React, { useState } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import { Product, sortData, Order } from "./util";
import { CustomizedTableHeader } from "./CustomizedTableHeader";
import { CustomizedTableBody } from "./CustomizedTableBody";
interface Props {
  searchText: string;
  productsData: Product[];
  onFetchProducts: () => void;
}
const CategoriesList: React.FunctionComponent<
  WithStyles<typeof styles> & Props
> = (props) => {
  let { classes, searchText, productsData } = props;
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Product>("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Product
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const filteredData = React.useMemo(() => {
    return productsData.filter((product: Product) => {
      const values = Object.values(product);
      values.forEach((elem) => {
        if (elem.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
          return true;
      });
      return false;
    });
  }, [productsData, searchText]);
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
          aria-labelledby="Products Table"
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
              productData={sortedData}
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
