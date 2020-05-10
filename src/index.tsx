import React from "react";
import ReactDOM from "react-dom";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "./index.css";
import LogInPage from "./pages/LogIn/LogInPage";
import { Router } from "@reach/router";
import MainPage from "./pages/Main/MainPage";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CategoryPage from "./pages/Category/CategoryPage";
import ProductPage from "./pages/Products/ProductPage";
const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#777",
    },
    primary: {
      main: "#777",
    },
    secondary: {
      main: "#1861ab",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <Router>
          <LogInPage path="/" />
          <MainPage path="/Main/" />
          <CategoryPage path="/CategoriesList/" />
          <ProductPage path="/ProductsList/" />
        </Router>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
