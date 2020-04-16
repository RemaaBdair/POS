import React from "react";
import { createMuiTheme, WithStyles } from "@material-ui/core/styles";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import {
  withStyles,
  ThemeProvider,
  createStyles,
} from "@material-ui/core/styles";
import { RouteComponentProps } from "@reach/router";
import Header from "./Components/Header";
import Background from "./whiteBackground.png";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#777",
    },
  },
});
const styles = createStyles({
  "@global": {
    body: {
      fontFamily: "lato",
      backgroundColor: "white",
      backgroundImage: `url(${Background})`,
      height: "100%",
    },
  },
});
const HigherOrderComponent = (
  props: WithStyles<typeof styles> & RouteComponentProps & SvgIconProps
) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
};
export default withStyles(styles)(HigherOrderComponent);
