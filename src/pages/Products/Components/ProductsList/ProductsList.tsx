import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import { Product, sortData } from "./util";
import useSort from "./useSort";
import usePagination from "./usePagination";
import useSearch from "./useSearch";
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
  const [result] = useSearch(productsData, searchText);
  const { order, orderBy, sortedData, handleSort } = useSort<Product>(
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
