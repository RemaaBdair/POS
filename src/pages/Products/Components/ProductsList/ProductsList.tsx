import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import { Product, sortData, deleteProduct } from "./util";
import useSort from "../../../../utils/useSort";
import usePagination from "../../../../utils/usePagination";
import useSearch from "../../../../utils/useSearch";
import useDialog from "../../../../utils/useDialog";
import { CustomizedTableHeader } from "./CustomizedTableHeader";
import { CustomizedTableBody } from "./CustomizedTableBody";
import DeleteDialog from "../../../../Components/DeleteDialog/DeleteDialog";
interface Props {
  searchText: string;
  productsData: Product[];
  onFetchProducts: () => void;
}
const ProductsList: React.FunctionComponent<
  WithStyles<typeof styles> & Props
> = (props) => {
  let { classes, searchText, productsData, onFetchProducts } = props;
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
  type dialogTypes = "edit" | "delete" | "details";
  const {
    name,
    id,
    element,
    openDialog,
    setName,
    handleOpenDialog,
    handleCloseDialog,
    handleDeleteSubmit,
  } = useDialog<Product, dialogTypes>(deleteProduct, onFetchProducts);
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
              onOpenDialog={handleOpenDialog}
            />
            <DeleteDialog
              openDialog={openDialog === "delete" ? true : false}
              onClose={handleCloseDialog}
              onSubmit={handleDeleteSubmit}
              name={name}
              id={id}
              label="Product"
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

export default withStyles(styles)(ProductsList);
