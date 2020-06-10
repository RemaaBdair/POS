import { createStyles } from "@material-ui/core/styles";
export const styles = createStyles({
  root: {
    marginTop: "60px",
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
  button: {
    padding: "7px 10px",
  },
  media: {
    height: 100,
    width: 100,
    marginTop: 0,
    alignSelf: "center",
  },
  controls: {
    justifyContent: "center",
    padding: "0px 30px",
  },
  input: {
    display: "none",
  },
  errorText: {
    color: "red",
    margin: 10,
    fontSize: 18,
  },
  propgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    margin: 0,
  },
});
