import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MyButton } from "../../../../Components/Button/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { styles } from "./styles";
import { Product } from "../../util";
interface Props {
  openDialog: boolean;
  onClose: () => void;
  product: Product;
}
const DetailsDialog: React.FunctionComponent<
  WithStyles<typeof styles> & Props
> = (props) => {
  const { classes } = props;
  const { openDialog, onClose, product } = props;
  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="details-dialog-title" classes={{ root: classes.title }}>
        ProductDetails
      </DialogTitle>
      <DialogContent classes={{ root: classes.content }}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="product" src={product.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="subtitle1" className={classes.name}>
                  {product.name}
                </Typography>
                <Typography variant="body2">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2">
                  Raw Price: {product.rawPrice}
                </Typography>
                <Typography variant="body2">Price: {product.price}</Typography>
                <Typography variant="body2">
                  Product Description: {product.description}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs>
              <TableContainer>
                <Table aria-label="first table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Code</TableCell>
                      <TableCell>Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow classes={{ root: classes.tableRow }}>
                      <TableCell> {product.code}</TableCell>
                      <TableCell> {product.quantity}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Table
                  aria-label="second table"
                  className={classes.secondTable}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Expiration Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow classes={{ root: classes.tableRow }}>
                      <TableCell> {product.expirationDate}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions classes={{ root: classes.actions }}>
        <MyButton
          onClick={onClose}
          type="submit"
          variant="text"
          fullWidth={false}
          classes={{ root: classes.button }}
        >
          Cancel
        </MyButton>
      </DialogActions>
    </Dialog>
  );
};
export default withStyles(styles)(DetailsDialog);
