import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
export interface Props {
  color: string;
  bgColor: string;
  children: string;
  OnClickHandle: () => void;
}
const button: React.FunctionComponent<Props & WithStyles<typeof styles>> = (
  props
) => {
  return (
    <Button
      variant="contained"
      size="large"
      className={props.classes.root}
      onClick={props.OnClickHandle}
    >
      {props.children}
    </Button>
  );
};
export const MyButton = withStyles(styles)(button);
