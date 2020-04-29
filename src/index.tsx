import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LogInPage from "./pages/LogIn/LogInPage";
import { Router } from "@reach/router";
import MainPage from "./pages/Main/MainPage";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CategoryPage from "./pages/Category/CategoryPage";

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

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <LogInPage path="/" />
        <MainPage path="/Main/" />
        <CategoryPage path="/CategoriesList/" />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
