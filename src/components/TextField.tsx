import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles, createStyles } from "@material-ui/core/styles";
interface Props {
  type: string;
  labelName: string;
  classes: {
    root: string;
    cssLabel: string;
    cssFocused: string;
    notchedOutline: string;
  };
}
const styles = createStyles({
  root: {
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: "#1861ab",
      borderWidth: 2,
    },
  },
  cssLabel: {
    "&$cssFocused": {
      color: "#1861ab",
    },
  },
  cssFocused: {
    "&$cssFocused $notchedOutline": {
      borderColor: "#1861ab",
      borderWidth: 2,
    },
  },
  notchedOutline: {},
  disabled: {},
  focused: {},
  error: {},
});
function HigherOrderComponent(props: Props) {
  const { classes, labelName, type } = props;
  return (
    <TextField
      id="outlined-basic"
      type={type}
      label={labelName}
      variant="outlined"
      InputProps={{
        classes: {
          root: classes.root,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
        },
      }}
      InputLabelProps={{
        classes: {
          root: classes.cssLabel,
          focused: classes.cssFocused,
        },
      }}
    />
  );
}
export const MyTextField = withStyles(styles)(HigherOrderComponent);
