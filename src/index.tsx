import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "./index.css";
import LogInPage from "./pages/LogIn/LogInPage";
import { Router } from "@reach/router";
import DashBoard from "./Components/DashBoard/DashBoard";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CategoryPage from "./pages/Category/CategoryPage";
import ProductPage from "./pages/Products/ProductPage";
import ProductFormPage from "./pages/Products/Components/ProductFormPage/ProductFormPage";
import POSPage from "./pages/POS/POSPage";
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
  overrides: {
    MuiTableBody: {
      root: {
        "& tr:nth-of-type(odd)": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    MuiFormControl: {
      root: {
        marginBottom: 10,
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <Router>
            <LogInPage path="/" />
            <DashBoard path="/dashboard">
              <CategoryPage path="CategoriesList" />
              <ProductPage path="ProductsList" />
              <ProductFormPage path="ProductsList/:id/edit/" />
              <POSPage path="POS" />
            </DashBoard>
          </Router>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
