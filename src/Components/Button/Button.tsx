import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
export interface Props {
  type: "submit" | "button";
  children: string;
  size?: "large" | "medium" | "small";
  disable?: boolean;
  fullWidth?: boolean;
  variant: "contained" | "text" | "outlined";
  OnClickHandle: (e: React.SyntheticEvent) => void;
}
const button: React.FunctionComponent<Props & WithStyles<typeof styles>> = (
  props
) => {
  const {
    children,
    classes,
    OnClickHandle,
    size = "large",
    disable = false,
    fullWidth = true,
  } = props;
  return (
    <Button
      fullWidth={fullWidth}
      disabled={disable}
      variant={props.variant}
      size={size}
      type={props.type}
      className={classes.root}
      onClick={OnClickHandle}
      color="secondary"
    >
      {children}
    </Button>
  );
};
export const MyButton = withStyles(styles)(button);
