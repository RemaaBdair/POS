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
  onClose: () => void;
  onSubmit: () => void;
  message: string;
}
const ConfirmationDialog: React.FunctionComponent<
  WithStyles<typeof styles> & Props
> = (props) => {
  const { classes } = props;
  const { openDialog, onClose, onSubmit, message } = props;
  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        Alert
      </DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <MyButton
          onClick={onClose}
          type="submit"
          variant="text"
          fullWidth={false}
          classes={{ root: classes.button }}
        >
          No
        </MyButton>
        <MyButton
          onClick={onSubmit}
          type="submit"
          variant="text"
          fullWidth={false}
          classes={{ root: classes.button }}
        >
          Yes
        </MyButton>
      </DialogActions>
    </Dialog>
  );
};
export default withStyles(styles)(ConfirmationDialog);
