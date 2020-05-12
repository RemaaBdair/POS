import { addDecorator } from "@storybook/react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#777",
    },
    secondary: {
      main: "#1861ab",
    },
  },
});
addDecorator((story) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>{story()}</ThemeProvider>
    </MuiPickersUtilsProvider>
  );
});
