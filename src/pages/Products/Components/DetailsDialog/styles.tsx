import { createStyles } from "@material-ui/core/styles";
export const styles = createStyles({
  title: {
    backgroundColor: "#1861ab",
    color: "white",
  },
  content: {
    margin: "10px 0px 0px",
  },
  actions: {
    padding: "0px 24px ",
  },
  button: {
    padding: "8px",
  },
  image: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 36,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    border: "solid black 1px",
  },
  tableRow: {
    "&:last-child th, &:last-child td": {
      borderBottom: 0,
    },
  },
  secondTable: {
    marginTop: 10,
  },
});
