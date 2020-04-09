import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, createStyles } from "@material-ui/core/styles";
interface Props {
  color: string;
  bgColor: string;
  children: React.ReactElement;
  classes: {
    root: string;
  };
}

const styles = createStyles({
  root: {
    background: (props: Props) => props.bgColor,
    color: (props: Props) => props.color,
    height: 50,
    padding: "0 120px",
    margin: 16,
    borderRadius: 0,
    textTransform: "none",
  },
});

function HigherOrderComponent(props: Props) {
  const { children, classes } = props;
  return (
    <Button variant="contained" size="large" className={classes.root}>
      {children}
    </Button>
  );
}
export const MyButton = withStyles(styles)(HigherOrderComponent);
