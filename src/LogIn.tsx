import React, { useEffect } from "react";
import LogInForm from "./components/LogInForm/LogInForm";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import Background from "./login.jpg";
import { navigate } from "@reach/router";
import { RouteComponentProps } from "@reach/router";
const styles = createStyles({
  "@global body": {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center center",
    display: "flex",
    fontFamily: "lato",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
  },
  "@global html": {
    height: "100%",
  },
});

const LogInComponent = (
  props: WithStyles<typeof styles> & RouteComponentProps
) => {
  const token = localStorage.getItem("LoggedIn");
  useEffect(() => {
    if (token === "true") navigate("/Main/");
  }, [token]);

  return <LogInForm />;
};

export default withStyles(styles)(LogInComponent);
