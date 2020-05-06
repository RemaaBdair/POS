import { createStyles } from "@material-ui/core/styles";
import Background from "../../images/login.jpg";
export const styles = createStyles({
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
