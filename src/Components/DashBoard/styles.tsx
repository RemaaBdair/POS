import { createStyles } from "@material-ui/core/styles";
import Background from "../../images/whiteBackground.png";
export const styles = createStyles({
  "@global": {
    body: {
      fontFamily: "lato",
      backgroundColor: "white",
      backgroundImage: `url(${Background})`,
      height: "100%",
    },
  },
});
