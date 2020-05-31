import React, { useState } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import { Product, sortData, Order } from "../../util";
import { deleteProduct } from "../../api";
import useSort from "../../../../hooks/useSort";
import usePagination from "../../../../hooks/usePagination";
import useSearch from "../../../../hooks/useSearch";
import useDeleteDialog from "../../../../hooks/useDeleteDialog";
import { CustomizedTableHeader } from "./CustomizedTableHeader";
import { CustomizedTableBody } from "./CustomizedTableBody";
import DeleteDialog from "../../../../Components/DeleteDialog/DeleteDialog";
interface Props {
  searchText: string;
  productsData: Product[];
  onFetchProducts: () => void;
}
export const SortTableContext = React.createContext<{
  order: Order;
  orderBy: keyof Product;
  handleSort: (
    event: React.MouseEvent<unknown, MouseEvent>,
    property: keyof Product
  ) => void;
}>({ order: "asc", orderBy: "code", handleSort: () => {} });
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
  type dialogTypes = "delete" | "details";
  const [openDialog, setOpenDialog] = useState<dialogTypes | null>(null);
  const handleOpenDialog = (
    type: dialogTypes | null,
    name: string,
    id: string
  ) => {
    if (type === "delete") handleOpenDeleteDialog(name, id);
    setOpenDialog(type);
  };
  const handleCloseDialog = () => {
    setOpenDialog(null);
  };
  const {
    name,
    id,
    handleOpenDeleteDialog,
    handleDeleteSubmit,
  } = useDeleteDialog<Product>(
    deleteProduct,
    onFetchProducts,
    handleCloseDialog
  );
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
