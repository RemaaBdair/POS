import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { State } from "../../../../store/state";
import { connect, ConnectedProps } from "react-redux";
import { deleteCart, pay } from "../../../../actions";
import ItemsList from "./ItemsList";
import CalculationsArea from "./CalculationsArea";
import ConfirmationDialog from "../../../../Components/ConfirmationDialog/ConfirmationDialog";
import { styles } from "./styles";
import { selectCartProducts, selectCart } from "../../../../selectors";
type PropsFromRedux = ConnectedProps<typeof connector>;
const Cart: React.FunctionComponent<
  WithStyles<typeof styles> & PropsFromRedux
> = (props) => {
  const { classes, pay, deleteCart } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSubmitDialog = () => {
    deleteCart();
    setOpenDialog(false);
  };
  const handleCancel = () => {
    setOpenDialog(true);
  };
  const handlePayment = () => {
    pay();
  };
  return (
    <Grid container className={classes.cart}>
      <Grid item xs={12} container>
        <ItemsList />
      </Grid>

      <Grid item xs={12} container>
        <CalculationsArea />
      </Grid>
      <Grid item xs={12} container className={classes.buttons}>
        <Grid item xs={6}>
          <Button
            onClick={handleCancel}
            type="button"
            variant="outlined"
            className={classes.cancelButton}
            fullWidth={true}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={handlePayment}
            type="submit"
            variant="outlined"
            className={classes.paymentButton}
            fullWidth={true}
          >
            Payment
          </Button>
        </Grid>
      </Grid>
      <ConfirmationDialog
        openDialog={openDialog}
        message="Your data will be lost, Are you sure you want to cancel?"
        onSubmit={handleSubmitDialog}
        onClose={handleCloseDialog}
      />
    </Grid>
  );
};
const mapStateToProps = (state: State) => ({
  cartProducts: selectCartProducts(state),
  cart: selectCart(state),
});
const mapDispatchToProps = { deleteCart, pay };

const connector = connect(mapStateToProps, mapDispatchToProps);
const WrappedComponent = connector(Cart);
export default withStyles(styles)(WrappedComponent);
