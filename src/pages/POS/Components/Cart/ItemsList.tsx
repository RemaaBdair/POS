import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { incQuantity, decQuantity, deleteProduct } from "../../../../actions";
import { State } from "../../../../store/state";
import {
  selectCartProducts,
  selectProducts,
  selectCart,
} from "../../../../selectors";
import { connect, ConnectedProps } from "react-redux";
import { styles } from "./styles";
type PropsFromRedux = ConnectedProps<typeof connector>;

const ItemsList: React.FunctionComponent<
  WithStyles<typeof styles> & PropsFromRedux
> = (props) => {
  const {
    classes,
    products,
    cartProducts,
    incQuantity,
    decQuantity,
    deleteProduct,
  } = props;

  const handleInc = (id: string) => {
    incQuantity(id);
  };
  const handleDec = (id: string) => {
    decQuantity(id);
  };
  const handleDelete = (id: string) => {
    deleteProduct(id);
  };
  return (
    <Paper classes={{ root: classes.paper }}>
      <Table
        classes={{ root: classes.table }}
        stickyHeader
        aria-labelledby="Cart Table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="left" key="name">
              Name
            </TableCell>
            <TableCell align="left" key="price">
              Price
            </TableCell>
            <TableCell align="left" key="quantity">
              Quantity
            </TableCell>
            <TableCell align="left" key="total">
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartProducts.map(({ id, quantity }) => {
            const name = products[id]?.name;
            const price = products[id]?.price;

            return (
              <TableRow>
                <TableCell align="left">
                  <IconButton
                    edge={false}
                    classes={{ root: classes.cancelIconButton }}
                    aria-label="delete product"
                    aria-haspopup="true"
                    onClick={() => handleDelete(id)}
                  >
                    <HighlightOffIcon fontSize="small" />
                  </IconButton>
                  {name}
                </TableCell>
                <TableCell align="left">{price}</TableCell>
                <TableCell align="left">
                  <IconButton
                    edge={false}
                    classes={{ root: classes.iconButton }}
                    aria-label="dec quantity"
                    aria-haspopup="true"
                    color="secondary"
                    onClick={() => handleDec(id)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  {quantity}
                  <IconButton
                    classes={{ root: classes.iconButton }}
                    edge={false}
                    aria-label="dec quantity"
                    aria-haspopup="true"
                    color="secondary"
                    onClick={() => handleInc(id)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </TableCell>

                <TableCell align="left">{quantity * price}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

const mapStateToProps = (state: State) => ({
  cartProducts: selectCartProducts(state),
  products: selectProducts(state),
  cart: selectCart(state),
});
const mapDispatchToProps = { incQuantity, decQuantity, deleteProduct };

const connector = connect(mapStateToProps, mapDispatchToProps);
const WrappedComponent = connector(ItemsList);
export default withStyles(styles)(WrappedComponent);
