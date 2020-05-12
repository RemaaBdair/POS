import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MyButton } from "../Button/Button";
import { styles } from "./styles";
interface Props {
  openDialog: boolean;
  handleClose: () => void;
  handleSubmit: (id: string) => void;
  name: string;
  id: string;
  label: string;
}
const DeleteDialog: React.FunctionComponent<
  WithStyles<typeof styles> & Props
> = (props) => {
  const { classes } = props;
  const { openDialog, handleClose, handleSubmit, name, id, label } = props;
  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>
        Delete {label}
      </DialogTitle>
      <DialogContent classes={{ root: classes.content }}>
        <DialogContentText>
          Are you sure you want to deltete {name} {label}?
        </DialogContentText>
      </DialogContent>
      <DialogActions classes={{ root: classes.actions }}>
        <MyButton
          OnClickHandle={handleClose}
          type="submit"
          variant="text"
          fullWidth={false}
          classes={{ root: classes.button }}
        >
          Cancel
        </MyButton>
        <MyButton
          OnClickHandle={() => handleSubmit(id)}
          type="submit"
          variant="contained"
          fullWidth={false}
          classes={{ root: classes.button }}
        >
          Yes
        </MyButton>
      </DialogActions>
    </Dialog>
  );
};
export default withStyles(styles)(DeleteDialog);
