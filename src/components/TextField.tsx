import React from "react";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, WithStyles } from "@material-ui/core/styles";
import {
  withStyles,
  createStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
interface Props {
  type: string;
  labelName: string;
}
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1861ab",
    },
  },
});
const styles = createStyles({
  root: {
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: "#1861ab",
      borderWidth: 2,
    },
    margin: "5px 0px",
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
  const { classes, labelName, type } = props;
  return (
    <ThemeProvider theme={theme}>
      <TextField
        id="outlined-basic"
        type={type}
        label={labelName}
        color="primary"
        variant="outlined"
        fullWidth
        InputProps={{
          classes: {
            root: classes.root,
            notchedOutline: classes.notchedOutline,
          },
        }}
      />
    </ThemeProvider>
  );
};
export const MyTextField = withStyles(styles)(HigherOrderComponent);
