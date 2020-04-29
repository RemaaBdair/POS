import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MyButton } from "../../../../components/Button/Button";
import { deleteCategory } from "./util";
interface Props {
  openDialog: boolean;
  handleClose: () => void;
  name: string;
  id: string;
}
export const DeleteCategoryDialog: React.FunctionComponent<Props> = (props) => {
  const { openDialog, handleClose, name, id } = props;
  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Delete Category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to deltete {name} category?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <MyButton OnClickHandle={handleClose} type="submit" variant="text">
          Cancel
        </MyButton>
        <MyButton
          OnClickHandle={async () => {
            await deleteCategory(id);
            handleClose();
          }}
          type="submit"
          variant="contained"
        >
          Yes
        </MyButton>
      </DialogActions>
    </Dialog>
  );
};
