import { createStyles } from "@material-ui/core/styles";
export const styles = createStyles({
  root: {
    // flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
