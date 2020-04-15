import React from "react";
import TextField from "@material-ui/core/TextField";
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles";
interface Props {
  type: string;
  labelName: string;
  OnChangehandle: (arg: string) => void;
  errorText: string;
}
const styles = createStyles({
  root: {
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: "#1861ab",
      borderWidth: 2,
    },
    margin: "7px 0px",
    minWidth: 300,
    borderRadius: 0,
  },
  notchedOutline: {},
  disabled: {},
  focused: {},
  error: {},
});
const HigherOrderComponent: React.FunctionComponent<
  Props & WithStyles<typeof styles>
> = (props) => {
  const { classes, labelName, type, OnChangehandle, errorText } = props;
  return (
    <TextField
      id="outlined-basic"
      type={type}
      label={labelName}
      color="primary"
      variant="outlined"
      fullWidth
      onChange={(event) => OnChangehandle(event.target.value)}
      required
      helperText={errorText}
      error={errorText ? true : false}
      InputProps={{
        classes: {
          root: classes.root,
          notchedOutline: classes.notchedOutline,
        },
      }}
    />
  );
};
export const MyTextField = withStyles(styles)(HigherOrderComponent);
