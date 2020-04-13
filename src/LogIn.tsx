import React from "react";
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
const styles = createStyles({
  "@global body": {
    backgroundImage: `url(${Background})`,
    fontFamily: "Lato",
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
function HOC(props: WithStyles<typeof styles>) {
  const { classes } = props;
  return (
    <Card classes={{ root: classes.card }}>
      <CardMedia className={classes.logo} image={Logo} title="Logo" />
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h5">
          Login To Your Account
        </Typography>
        <MyTextField labelName="Email" type="text">
          Email
        </MyTextField>
        <MyTextField labelName="Password" type="password">
          Password
        </MyTextField>
      </CardContent>
      <CardActions className={classes.controls}>
        <MyButton color="white" bgColor="#1861ab">
          LogIn
        </MyButton>
      </CardActions>
    </Card>
  );
}

const LogIn = withStyles(styles)(HOC);
export default LogIn;
