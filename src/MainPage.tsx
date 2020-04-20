import React from "react";
import { WithStyles } from "@material-ui/core/styles";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "@reach/router";
import Header from "./components/Header/Header";
import Background from "./whiteBackground.png";

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
const MainPage = (props: WithStyles<typeof styles> & RouteComponentProps) => {
  return <Header />;
};
export default withStyles(styles)(MainPage);
