import { createStyles } from "@material-ui/core/styles";
export const styles = createStyles({
  "@global body": {
    margin: 0,
    padding: 0,
  },
  root: {
    height: "100%",
    justifyContent: "center",
  },

  button: {
    marginLeft: 5,
  },
  activeFilter: {
    borderBottom: "3px solid #6EC89B",
  },
  inActiveFilter: {
    borderBottom: "3px solid #f65e48",
  },
  card: {
    position: "relative",
    margin: 10,
  },
  overlay: {
    position: "absolute",
    top: "50%",
    left: "40%",
    color: "white",
    backgroundColor: "#6EC89B",
  },
  image: {
    width: 200,
    height: 200,
  },
  searchText: {
    marginTop: 10,
  },
});
