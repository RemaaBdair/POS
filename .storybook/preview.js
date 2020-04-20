import { addDecorator } from "@storybook/react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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
  return <ThemeProvider theme={theme}>{story()}</ThemeProvider>;
});
