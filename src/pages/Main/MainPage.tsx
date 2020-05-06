import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import { WithStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "@reach/router";
import Header from "../../Components/Header/Header";
import { styles } from "./styles";
const MainPage: React.FunctionComponent<
  WithStyles<typeof styles> & RouteComponentProps
> = (props) => {
  const token = localStorage.getItem("LoggedIn");
  useEffect(() => {
    if (token !== "true") navigate("/");
  });
  return <Header />;
};
export default withStyles(styles)(MainPage);
