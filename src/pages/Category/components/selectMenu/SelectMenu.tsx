import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
interface Props {
  entriesPerPage: string;
  onSelectChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}
const SelectMenu: React.FunctionComponent<WithStyles<typeof styles> & Props> = (
  props
) => {
  const { onSelectChange, classes, entriesPerPage } = props;
  return (
    <>
      <label className={classes.label}>Show</label>
      <Select value={entriesPerPage} onChange={onSelectChange}>
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="3">3</MenuItem>
        <MenuItem value="10">10</MenuItem>
      </Select>

      <label className={classes.label}>entries</label>
    </>
  );
};
export default withStyles(styles)(SelectMenu);
