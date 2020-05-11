import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import { WithStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "@reach/router";
import Header from "../Header/Header";
import { styles } from "./styles";
const DashBoard: React.FunctionComponent<
  WithStyles<typeof styles> & RouteComponentProps
> = ({ children }) => {
  const token = localStorage.getItem("LoggedIn");
  useEffect(() => {
    if (token !== "true") navigate("/");
  });
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
export default withStyles(styles)(DashBoard);
