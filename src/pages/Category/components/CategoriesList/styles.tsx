import { createStyles } from "@material-ui/core/styles";
export const styles = createStyles({
  table: {
    borderCollapse: "collapse",
    border: "3px solid #ddd",
    width: "100%",
    padding: 30,
  },
  data: {
    border: "1px solid #ddd",
    padding: "0px 20px",
  },
  "@global": {
    "tbody > tr:nth-of-type(odd)": {
      backgroundColor: "#f7f7f7",
    },
  },
  header: {
    border: "1px solid #ddd",
    padding: "10px 20px",
    textAlign: "center",
  },
});
