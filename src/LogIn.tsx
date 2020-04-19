import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { MyButton } from "./components/Button/Button";
import { MyTextField } from "./components/TextField/TextField";
import Typography from "@material-ui/core/Typography";
import {
  withStyles,
  createStyles,
  WithStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Background from "./login.jpg";
import Logo from "./logo.png";
import { navigate } from "@reach/router";
import { RouteComponentProps } from "@reach/router";
type Inputs={
  email: string;
  password:string;
}
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1861ab",
    },
  },
});
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
  card: {
    backgroundColor: "white",
    padding: "30px 15px",
    alignSelf: "center",
    textAlign: "center",
  },
  content: {
    color: "#34495e",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0px 30px",
  },
  controls: {
    padding: "0px 30px",
  },
  logo: {
    height: 45,
    width: 149,
    display: "inline-flex",
  },
  errorText: {
    color: "red",
    margin: 10,
    fontSize: 18,
  },
});
const fetchLogin = async (
  email: string,
  password: string
): Promise<boolean | void> => {
  let loggedIn: boolean = false;
  return await fetch("http://localhost:3001/users")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((elem: { id: string; password: string; email: string }) => {
        if (elem.email === email && elem.password === password) {
          loggedIn = true;
        }
      });
      if (loggedIn) return true;
      else return false;
    })
    .catch((error) => {
      console.log(error);
    });
};
const LogInComponent = (
  props: WithStyles<typeof styles> & RouteComponentProps
) => {
  const { classes } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const token = localStorage.getItem("LoggedIn");
  useEffect(() => {
    if (token === "true") navigate("/Main/");
  }, [token]);
  const validateEmail = (email: string): string => {
    if (!email) return "Email can't be empy!";
    return "";
  };
  const validatePassword = (password: string): string => {
    if (!password) return "Password can't be empy!";
    else if (password.length < 4) return "Password must be at least 4 chars";
    else if (!password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/))
      return "Password must contains chars and numbers";
    return "";
  };
  const validateInputs = (inputs: Inputs): Inputs=> {
    return {
      email: validateEmail(inputs.email),
      password: validatePassword(inputs.password),
    };
  };

  const onClickHandle = async () => {
    setError(false);
    setPasswordErrorText("");
    setEmailErrorText("");
    const errors = validateInputs({ email, password });
    if (errors.email) {
      setEmailErrorText(errors.email);
      return;
    }
    if (errors.password) {
      setEmailErrorText(errors.password);
      return;
    } else {
      const loginRes = await fetchLogin(email, password);
      if (!loginRes)
        setError(true);
    else {
      setError(false);
      localStorage.setItem("LoggedIn", "true");
      navigate("/Main/");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Card classes={{ root: classes.card }}>
        <CardMedia className={classes.logo} image={Logo} title="Logo" />
        <CardContent className={classes.content}>
          <Typography variant="h5" component="h5">
            Login To Your Account
          </Typography>
          {error ? (
            <Typography component="span" className={classes.errorText}>
              Your email or password is incorrect
            </Typography>
          ) : (
            ""
          )}
          <MyTextField
            labelName="Email"
            type="text"
            errorText={emailErrorText}
            OnChangehandle={(email) => setEmail(email)}
          >
            Email
          </MyTextField>
          <MyTextField
            labelName="Password"
            type="password"
            errorText={passwordErrorText}
            OnChangehandle={(password) => setPassword(password)}
          >
            Password
          </MyTextField>
        </CardContent>
        <CardActions className={classes.controls}>
          <MyButton
            color="white"
            bgColor="#1861ab"
            OnClickHandle={onClickHandle}
          >
            LogIn
          </MyButton>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default withStyles(styles)(LogInComponent);
