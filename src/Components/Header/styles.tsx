import { createStyles } from "@material-ui/core/styles";
import Background from "../../whiteBackground.png";
export const styles = createStyles({
  "@global": {
    body: {
      fontFamily: "lato",
      backgroundColor: "white",
      backgroundImage: `url(${Background})`,
      height: "100%",
    },
  },
  root: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  toolBar: { justifyContent: "center" },
  logoImg: {
    height: 35,
    width: 135,
  },
  logoContainer: {
    alignSelf: "center",
  },
  appBar: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  listItem: {
    margin: 5,
    display: "flex",
    alignItems: "center",
  },
});
