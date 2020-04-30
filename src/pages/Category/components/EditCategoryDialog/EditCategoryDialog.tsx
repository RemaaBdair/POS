import React, { useState } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import RootRef from "@material-ui/core/RootRef";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { MyTextField } from "../../../../Components/TextField/TextField";
import { MyButton } from "../../../../Components/Button/Button";
import { editCategory, createCategory } from "../CategoriesList/util";
import { styles } from "./styles";
interface Props {
  openDialog: boolean;
  handleClose: () => void;
  name?: string;
  id?: string;
  date?: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}
const EditCategoryDialog: React.FunctionComponent<
  WithStyles<typeof styles> & Props
> = (props) => {
  const { classes } = props;
  const { openDialog, handleClose, name, id, date, setName } = props;
  const [disableButton, setDisableButton] = useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const handleSubmit = async () => {
    let result: string = "";
    setDisableButton(true);
    if (id && name && date) {
      result = await editCategory(id, name, date);
    } else if (name) {
      result = await createCategory(name);
    }
    if (result === "failed") setOpenSnackBar(true);

    setDisableButton(false);
    handleClose();
  };
  const nodeRef = React.useRef();
  return (
    <RootRef rootRef={nodeRef}>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>
          Add Category
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent classes={{ root: classes.content }}>
            <MyTextField
              value={name}
              labelName="CategoryName"
              type="text"
              OnChangehandle={setName}
            />
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
              OnClickHandle={handleSubmit}
              type="submit"
              variant="contained"
              fullWidth={false}
              classes={{ root: classes.button }}
              disable={disableButton}
            >
              Submit
            </MyButton>
            {disableButton ? (
              <CircularProgress
                color="secondary"
                size={68}
                classes={{ root: classes.propgress }}
              />
            ) : null}
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
        message="An error occured. Please try again!"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpenSnackBar(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </RootRef>
  );
};
export default withStyles(styles)(EditCategoryDialog);
