import React from "react";
import TextField from "@material-ui/core/TextField";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
interface Props {
  type: string;
  labelName: string;
  OnChangehandle?: (arg: string) => void;
  errorText?: string;
  value?: string;
  required?: boolean;
  fullWidth?: boolean;
}
const textField: React.FunctionComponent<Props & WithStyles<typeof styles>> = (
  props
) => {
  const {
    classes,
    labelName,
    type,
    OnChangehandle = () => {},
    errorText,
    fullWidth = true,
    required = false,
    value,
  } = props;
  return (
    <TextField
      id="outlined-basic"
      type={type}
      value={value}
      label={labelName}
      color="secondary"
      variant="outlined"
      fullWidth={fullWidth}
      onChange={(event) => OnChangehandle(event.target.value)}
      required={required}
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
export const MyTextField = withStyles(styles)(textField);
