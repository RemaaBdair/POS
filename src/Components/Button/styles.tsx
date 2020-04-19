import { createStyles } from "@material-ui/core/styles";
import { Props } from "./Button";
export const styles = createStyles({
  root: {
    background: (props: Props) => props.bgColor,
    color: (props: Props) => props.color,
    borderRadius: 0,
    textTransform: "none",
    width: "100%",
    margin: "7px 0px",
    padding: "16px",
  },
});
