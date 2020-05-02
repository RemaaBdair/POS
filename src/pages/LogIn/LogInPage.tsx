import React, { useEffect } from "react";
import LogInForm from "./Components/LogInForm/LogInForm";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { navigate } from "@reach/router";
import { RouteComponentProps } from "@reach/router";
import { styles } from "./styles";
const LogInComponent = (
  props: WithStyles<typeof styles> & RouteComponentProps
) => {
  const token = localStorage.getItem("LoggedIn");
  useEffect(() => {
    if (token === "true") navigate("/Main/");
  });

  return <LogInForm />;
};

export default withStyles(styles)(LogInComponent);
