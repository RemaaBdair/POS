import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
interface Props {
  color: string;
  bgColor: string;
  children: string;
  OnClickHandle: () => void;
}

const styles = createStyles({
  root: {
    background: (props: Props) => props.bgColor,
    color: (props: Props) => props.color,
    borderRadius: 0,
    textTransform: "none",
    width: "100%",
    margin: "7px 0px",
    padding: "16px",
  },
});

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
