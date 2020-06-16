import { addDecorator } from "@storybook/react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Provider } from "react-redux";
import store from "../src/store";
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
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>{story()}</ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
});
