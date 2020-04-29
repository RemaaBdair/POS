import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { MyButton } from "../../../../components/Button/Button";
import { MyTextField } from "../../../../components/TextField/TextField";
import Typography from "@material-ui/core/Typography";
import Logo from "../../../../images/logo.png";
import { navigate, RouteComponentProps } from "@reach/router";
import { WithStyles, withStyles } from "@material-ui/core";
import { validateEmail, validatePassword, fetchLogin } from "./utils";
import { styles } from "./styles";
type Inputs = {
  email: string;
  password: string;
};
const LogInForm: React.FunctionComponent<
  RouteComponentProps & WithStyles<typeof styles>
> = (props) => {
  const { classes } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const validateInputs = (inputs: Inputs): Inputs => {
    return {
      email: validateEmail(inputs.email),
      password: validatePassword(inputs.password),
    };
  };
  const onClickHandle = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(false);
    setPasswordErrorText("");
    setEmailErrorText("");
    const errors = validateInputs({ email, password });
    if (errors.email) {
      setEmailErrorText(errors.email);
      return;
    }
    if (errors.password) {
      setPasswordErrorText(errors.password);
      return;
    } else {
      const loginRes = await fetchLogin(email, password);
      if (!loginRes) setError(true);
      else {
        setError(false);
        localStorage.setItem("LoggedIn", "true");
        navigate("/Main/");
      }
    }
  };
  return (
    <form onSubmit={onClickHandle}>
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
            required={true}
            type="text"
            errorText={emailErrorText}
            value={email}
            OnChangehandle={(email) => setEmail(email)}
          >
            Email
          </MyTextField>
          <MyTextField
            labelName="Password"
            required={true}
            type="password"
            value={password}
            errorText={passwordErrorText}
            OnChangehandle={(password) => setPassword(password)}
          >
            Password
          </MyTextField>
        </CardContent>
        <CardActions className={classes.controls}>
          <MyButton
            // classes={{ root: classes.submitButton }}
            OnClickHandle={onClickHandle}
            size="large"
            variant="contained"
            type="submit"
          >
            LogIn
          </MyButton>
        </CardActions>
      </Card>
    </form>
  );
};
export default withStyles(styles)(LogInForm);
