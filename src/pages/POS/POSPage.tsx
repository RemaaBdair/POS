import React from "react";
import Grid from "@material-ui/core/Grid";
import { RouteComponentProps } from "@reach/router";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import StockItems from "./Components/StockItems/StockItems";
import Cart from "./Components/Cart/Cart";
import { connect, ConnectedProps } from "react-redux";
import { requestAllProducts, requestAllCategories } from "../../actions";
import { styles } from "./styles";
type PropsFromRedux = ConnectedProps<typeof connector>;

const POSPage: React.FunctionComponent<
  WithStyles<typeof styles> & RouteComponentProps & PropsFromRedux
> = (props) => {
  const { classes, requestAllProducts, requestAllCategories } = props;
  React.useEffect(() => {
    requestAllProducts();
    requestAllCategories();
  }, []);
  return (
    <Grid container className={classes.container}>
      <Grid item xs={6} justify="flex-start" container>
        <Cart />
      </Grid>
      <Grid item xs={6} justify="flex-end" container>
        <StockItems />
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { requestAllProducts, requestAllCategories };
const connector = connect(null, mapDispatchToProps);
const WrappedComponent = connector(POSPage);
export default withStyles(styles)(WrappedComponent);
