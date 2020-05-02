import { createStyles } from "@material-ui/core/styles";
export const styles = createStyles({
  root: {
    width: "100%",
  },
  table: {
    borderCollapse: "collapse",
    border: "1px solid #ddd",
    width: "100%",
  },
  iconButton: {
    padding: "10px 0px ",
  },
  "@global": {
    "tbody > tr:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5",
    },
    " tr>td ,tr>th": {
      border: "1px solid #ddd",
    },
  },
});
