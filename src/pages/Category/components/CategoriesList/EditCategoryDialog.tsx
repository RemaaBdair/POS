import React from "react";
import RootRef from "@material-ui/core/RootRef";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MyTextField } from "../../../../components/TextField/TextField";
import { MyButton } from "../../../../components/Button/Button";
interface Props {
  openDialog: boolean;
  handleClose: () => void;
  name: string;
}
export const EditCategoryDialog: React.FunctionComponent<Props> = (props) => {
  const { openDialog, handleClose, name } = props;
  const nodeRef = React.useRef();
  return (
    <RootRef rootRef={nodeRef}>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Category Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To modify the current category Name, please enter the new name here.
          </DialogContentText>
          <MyTextField value={name} labelName="CategoryName" type="text" />
        </DialogContent>
        <DialogActions>
          <MyButton OnClickHandle={handleClose} type="submit" variant="text">
            Cancel
          </MyButton>
          <MyButton OnClickHandle={handleClose} type="submit" variant="text">
            Submit
          </MyButton>
        </DialogActions>
      </Dialog>
    </RootRef>
  );
};
