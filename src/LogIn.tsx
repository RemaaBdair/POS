import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { MyButton } from "./components/Button";
import { MyTextField } from "./components/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import Background from "./login.jpg";
import Logo from "./logo.png";
import MainPage from "./MainPage";
import { navigate } from "@reach/router";
import { RouteComponentProps } from "@reach/router";
const styles = createStyles({
  "@global body": {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center center",
    display: "flex",
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
});
const HOC = (props: WithStyles<typeof styles> & RouteComponentProps) => {
  const { classes } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const onClickHandle = () => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((e: { id: string; password: string; email: string }) => {
          if (e.email === email && e.password === password) {
            console.log(`${e.id}, ${e.password}, ${e.email}`);
            setError(false);
            navigate("/Main/");
          } else setError(true);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Card classes={{ root: classes.card }}>
      <CardMedia className={classes.logo} image={Logo} title="Logo" />
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h5">
          Login To Your Account
        </Typography>
        {error ? (
          <Typography
            component="span"
            style={{ color: "red", margin: 10, fontSize: 18 }}
          >
            Your email or password is incorrect
          </Typography>
        ) : (
          ""
        )}
        <MyTextField
          labelName="Email"
          type="text"
          handle={(email) => setEmail(email)}
        >
          Email
        </MyTextField>
        <MyTextField
          labelName="Password"
          type="password"
          handle={(password) => setPassword(password)}
        >
          Password
        </MyTextField>
      </CardContent>
      <CardActions className={classes.controls}>
        <MyButton color="white" bgColor="#1861ab" handle={onClickHandle}>
          LogIn
        </MyButton>
      </CardActions>
    </Card>
  );
};

const LogIn = withStyles(styles)(HOC);
export default LogIn;
