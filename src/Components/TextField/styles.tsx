import { createStyles } from "@material-ui/core/styles";
export const styles = createStyles({
  root: {
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: "#1861ab",
      borderWidth: 2,
    },
    margin: "7px 0px",
    minWidth: 300,
    borderRadius: 0,
  },
  notchedOutline: {},
  disabled: {},
  focused: {},
  error: {},
});
