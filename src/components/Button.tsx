import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
interface Props {
  color: string;
  bgColor: string;
  children: string;
}

const styles = createStyles({
  root: {
    background: (props: Props) => props.bgColor,
    color: (props: Props) => props.color,
    height: 50,
    borderRadius: 0,
    textTransform: "none",
  },
});

const HigherOrderComponent: React.FunctionComponent<
  Props & WithStyles<typeof styles>
> = (props) => {
  return (
    <Button variant="contained" size="large" className={props.classes.root}>
      {props.children}
    </Button>
  );
};
export const MyButton = withStyles(styles)(HigherOrderComponent);
