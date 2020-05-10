import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import { MyButton } from "../../../../Components/Button/Button";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
interface Props {
  initDate: Date | null;
  endDate: Date | null;
  onInitDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}
export const FilterGrid: React.FunctionComponent<
  WithStyles<typeof styles> & Props
> = (props) => {
  const {
    classes,
    initDate,
    endDate,
    onInitDateChange,
    onEndDateChange,
  } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container alignItems="center" justify="flex-end">
        <Typography color="primary" component="span">
          Expiration Date
        </Typography>

        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="from-date"
          label="From"
          color="secondary"
          className={classes.datePicker}
          value={initDate}
          onChange={onInitDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />

        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="to-date"
          label="To"
          color="secondary"
          className={classes.datePicker}
          value={endDate}
          onChange={onEndDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <MyButton
          OnClickHandle={() => {}}
          type="submit"
          variant="outlined"
          classes={{ root: classes.submitButton }}
          fullWidth={false}
        >
          Apply Filter
        </MyButton>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};
export default withStyles(styles)(FilterGrid);
