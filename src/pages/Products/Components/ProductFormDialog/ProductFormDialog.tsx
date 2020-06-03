import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ProductForm from "../ProductForm/ProductForm";
import { RouteComponentProps } from "@reach/router";
import { styles } from "./styles";
interface Props {
  openDialog: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
const ProductFormDialog: React.FunctionComponent<
  Props & RouteComponentProps & WithStyles<typeof styles>
> = (props) => {
  const { classes, openDialog, onClose, onSubmit } = props;
  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>
        Create new Product
      </DialogTitle>
      <DialogContent classes={{ root: classes.content }}>
        <ProductForm onClose={onClose} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(ProductFormDialog);
