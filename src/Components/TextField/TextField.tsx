import React from "react";
import TextField from "@material-ui/core/TextField";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
interface Props {
  type: string;
  labelName: string;
  onChange?: (arg: string) => void;
  errorText?: string;
  value?: string;
  required?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
}
const textField: React.FunctionComponent<Props & WithStyles<typeof styles>> = (
  props
) => {
  const {
    classes,
    labelName,
    type,
    onChange = () => {},
    errorText,
    fullWidth = true,
    required = false,
    value,
    multiline = false,
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
      onChange={(event) => onChange(event.target.value)}
      required={required}
      helperText={errorText}
      multiline={multiline}
      rows={7}
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
